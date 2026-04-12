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
 */
function renderDescription(text: string): React.ReactNode {
  const parts = text.split(/`([^`]+)`/);
  return parts.map((part, i) =>
    i % 2 === 1 ? <code key={i}>{part}</code> : part
  );
}

export function ProjectCard({ project, lang }: ProjectCardProps) {
  const isAvailable = project.status === 'available';
  const description = project.description[lang];

  return (
    <article
      style={{
        background: 'var(--card)',
        border: `1px solid ${isAvailable ? 'var(--border-strong)' : 'var(--border)'}`,
        borderRadius: '14px',
        padding: '20px 22px',
        transition: 'border-color 0.12s ease, box-shadow 0.12s ease, transform 0.12s ease',
        opacity: isAvailable ? 1 : 0.85,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.borderColor = 'var(--accent)';
        el.style.boxShadow = '0 4px 16px rgba(49,130,246,0.12)';
        el.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.borderColor = isAvailable ? 'var(--border-strong)' : 'var(--border)';
        el.style.boxShadow = 'none';
        el.style.transform = 'none';
      }}
    >
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
        <a
          href={repoUrl(project.repo)}
          style={{
            color: 'var(--fg)',
            textDecoration: 'none',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'underline'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'none'; }}
        >
          {project.name}
        </a>
        {!isAvailable && (
          <span
            style={{
              display: 'inline-block',
              fontSize: '10px',
              fontWeight: 600,
              fontFamily: 'inherit',
              letterSpacing: '0.06em',
              padding: '2px 8px',
              borderRadius: '999px',
              background: 'var(--chip-wip-bg)',
              color: 'var(--chip-wip-fg)',
              textTransform: 'uppercase',
            }}
          >
            WIP
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
          <a
            href={project.demoUrl}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--accent)',
              background: 'rgba(49,130,246,0.08)',
              padding: '5px 12px',
              borderRadius: '6px',
              textDecoration: 'none',
              transition: 'background 0.1s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(49,130,246,0.16)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(49,130,246,0.08)'; }}
          >
            {lang === 'ko' ? '웹 데모 열기 →' : 'Open web demo →'}
          </a>
        </div>
      )}
    </article>
  );
}
