import type { Project } from '../../content/projects';
import { repoUrl } from '../../content/projects';

type Lang = 'ko' | 'en';

interface ProjectCardProps {
  project: Project;
  lang: Lang;
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
