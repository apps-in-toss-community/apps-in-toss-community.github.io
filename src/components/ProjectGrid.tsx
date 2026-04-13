import { projects } from '../../content/projects';
import { ProjectCard } from './ProjectCard';

type Lang = 'ko' | 'en';

interface ProjectGridProps {
  lang: Lang;
}

const sectionHeadings = {
  ko: { available: '사용 가능', comingSoon: '예정' },
  en: { available: 'Available Now', comingSoon: 'Coming Soon' },
};

export function ProjectGrid({ lang }: ProjectGridProps) {
  const headings = sectionHeadings[lang];
  const available = projects.filter(p => p.status === 'available');
  const comingSoon = projects.filter(p => p.status === 'coming-soon');

  return (
    <div
      style={{
        maxWidth: '960px',
        margin: '0 auto',
        padding: '0 24px 64px',
      }}
    >
      <section aria-labelledby="available-heading" style={{ marginBottom: '48px' }}>
        <h2
          id="available-heading"
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            margin: '0 0 16px',
          }}
        >
          {headings.available}
        </h2>
        <div
          className="project-grid-gap"
          style={{
            display: 'grid',
            gap: '12px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 420px), 1fr))',
          }}
        >
          {available.map(project => (
            <ProjectCard key={project.id} project={project} lang={lang} />
          ))}
        </div>
      </section>

      <section aria-labelledby="coming-heading">
        <h2
          id="coming-heading"
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            margin: '0 0 16px',
          }}
        >
          {headings.comingSoon}
        </h2>
        <div
          className="project-grid-gap"
          style={{
            display: 'grid',
            gap: '12px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 420px), 1fr))',
          }}
        >
          {comingSoon.map(project => (
            <ProjectCard key={project.id} project={project} lang={lang} />
          ))}
        </div>
      </section>
    </div>
  );
}
