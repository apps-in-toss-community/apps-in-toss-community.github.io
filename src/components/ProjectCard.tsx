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
      className="project-card"
      style={{
        background: isAvailable ? 'var(--card)' : 'var(--card-wip)',
        border: `1px solid ${isAvailable ? 'var(--border-strong)' : 'var(--border-wip)'}`,
        borderRadius: '14px',
        transition: 'border-color 0.12s ease, box-shadow 0.12s ease, transform 0.12s ease, opacity 0.12s ease',
        opacity: isAvailable ? 1 : 0.65,
        borderStyle: isAvailable ? 'solid' : 'dashed',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.borderColor = 'var(--accent)';
        el.style.boxShadow = '0 4px 16px rgba(49,130,246,0.12)';
        el.style.transform = 'translateY(-2px)';
        if (!isAvailable) el.style.opacity = '0.9';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.borderColor = isAvailable ? 'var(--border-strong)' : 'var(--border-wip)';
        el.style.boxShadow = 'none';
        el.style.transform = 'none';
        if (!isAvailable) el.style.opacity = '0.65';
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
