import type { Project } from '../../content/projects';
import { repoUrl } from '../../content/projects';
import repoMetadata from '../generated/repo-metadata.json';

type Lang = 'ko' | 'en';

interface ProjectCardProps {
  project: Project;
  lang: Lang;
}

interface RepoMetadata {
  pushed_at: string | null;
  stargazers_count: number | null;
  language: string | null;
}

const META: Record<string, RepoMetadata> = repoMetadata;

const RELATIVE_UNITS: Array<[Intl.RelativeTimeFormatUnit, number]> = [
  ['year', 60 * 60 * 24 * 365],
  ['month', 60 * 60 * 24 * 30],
  ['week', 60 * 60 * 24 * 7],
  ['day', 60 * 60 * 24],
  ['hour', 60 * 60],
  ['minute', 60],
];

function formatRelative(iso: string, lang: Lang, now: number = Date.now()): string {
  const seconds = Math.round((new Date(iso).getTime() - now) / 1000);
  const fmt = new Intl.RelativeTimeFormat(lang === 'ko' ? 'ko' : 'en', { numeric: 'auto' });
  for (const [unit, secondsInUnit] of RELATIVE_UNITS) {
    if (Math.abs(seconds) >= secondsInUnit || unit === 'minute') {
      return fmt.format(Math.round(seconds / secondsInUnit), unit);
    }
  }
  return fmt.format(0, 'minute');
}

/**
 * Renders a description string that may contain backtick-wrapped code
 * (e.g., `navigator.clipboard`) as inline <code> elements.
 *
 * `parts` is derived deterministically from the immutable `text`, so positions
 * never reorder — index-as-key is genuinely safe here. Using the index keeps
 * the key stable even if a description repeats the same backtick span twice.
 */
function renderDescription(text: string): React.ReactNode {
  const parts = text.split(/`([^`]+)`/);
  return parts.map((part, i) =>
    // biome-ignore lint/suspicious/noArrayIndexKey: parts derives deterministically from immutable text; positions never reorder
    i % 2 === 1 ? <code key={i}>{part}</code> : part,
  );
}

const NEW_TAB_LABEL = { ko: '새 탭에서 열기', en: 'opens in new tab' } as const;
const UPDATED_LABEL = { ko: '업데이트', en: 'updated' } as const;
const STARS_LABEL = { ko: '스타', en: 'stars' } as const;

function ProjectMeta({ repo, lang }: { repo: string; lang: Lang }) {
  const meta = META[repo];
  if (!meta) return null;

  const items: React.ReactNode[] = [];

  if (typeof meta.stargazers_count === 'number' && meta.stargazers_count > 0) {
    items.push(
      <span key="stars" className="project-card-meta-item">
        <span aria-hidden="true">★</span>
        <span>{meta.stargazers_count.toLocaleString(lang === 'ko' ? 'ko' : 'en')}</span>
        <span className="sr-only"> {STARS_LABEL[lang]}</span>
      </span>,
    );
  }

  if (meta.language) {
    items.push(
      <span key="language" className="project-card-meta-item">
        {meta.language}
      </span>,
    );
  }

  if (meta.pushed_at) {
    const isoDate = meta.pushed_at;
    const absolute = new Date(isoDate).toISOString().slice(0, 10);
    items.push(
      <span key="pushed" className="project-card-meta-item">
        <span aria-hidden="true">{UPDATED_LABEL[lang]} </span>
        <time dateTime={isoDate} title={absolute}>
          {formatRelative(isoDate, lang)}
        </time>
      </span>,
    );
  }

  if (items.length === 0) return null;

  return <div className="project-card-meta">{items}</div>;
}

export function ProjectCard({ project, lang }: ProjectCardProps) {
  const isAvailable = project.status === 'available';
  const description = project.description[lang];
  const newTab = NEW_TAB_LABEL[lang];

  return (
    <article className={`project-card${isAvailable ? '' : ' project-card--wip'}`}>
      <h3
        style={{
          margin: '0 0 8px',
          fontFamily: 'ui-monospace, "SF Mono", Menlo, "Fira Code", monospace',
          fontWeight: 700,
          fontSize: '15px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
        }}
      >
        {/* target="_blank" + rel because repo links go to github.com */}
        <a
          href={repoUrl(project.repo)}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card-name-link"
          style={{
            color: 'var(--fg)',
            textDecoration: 'none',
          }}
        >
          {project.name}
          <span className="sr-only"> ({newTab})</span>
        </a>
        {!isAvailable && (
          <span
            style={{
              display: 'inline-block',
              fontSize: '10px',
              fontWeight: 700,
              fontFamily: 'inherit',
              letterSpacing: '0.08em',
              padding: '3px 10px',
              borderRadius: '999px',
              background: 'var(--chip-wip-bg)',
              color: 'var(--chip-wip-fg)',
              border: '1.5px solid var(--chip-wip-border)',
              textTransform: 'uppercase',
            }}
          >
            Coming Soon
          </span>
        )}
      </h3>

      <p
        style={{
          fontSize: '14px',
          color: 'var(--fg-soft)',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {renderDescription(description)}
      </p>

      <ProjectMeta repo={project.repo} lang={lang} />

      {project.demoUrl != null && (
        <div style={{ marginTop: '12px' }}>
          {/* target="_blank" + rel because demo links are external */}
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card-demo-link"
          >
            {lang === 'ko' ? '웹 데모 열기 →' : 'Open web demo →'}
            <span className="sr-only"> ({newTab})</span>
          </a>
        </div>
      )}
    </article>
  );
}
