type Lang = 'ko' | 'en';

interface ResourcesProps {
  lang: Lang;
}

const headings = {
  ko: '리소스',
  en: 'Resources',
};

const resources = [
  {
    href: 'https://github.com/apps-in-toss-community',
    label: { ko: 'GitHub organization', en: 'GitHub organization' },
    icon: '🔗',
  },
  {
    href: 'https://www.npmjs.com/package/@apps-in-toss/web-framework',
    label: {
      ko: '@apps-in-toss/web-framework (npm)',
      en: '@apps-in-toss/web-framework (npm)',
    },
    icon: '📦',
  },
  {
    href: 'https://apps-in-toss-community.github.io/sdk-example/',
    label: { ko: 'SDK 웹 데모', en: 'SDK Web Demo' },
    icon: '🧪',
  },
];

export function Resources({ lang }: ResourcesProps) {
  const heading = headings[lang];

  return (
    <section
      aria-labelledby="resources-heading"
      style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: '0 24px 32px',
      }}
    >
      <h2
        id="resources-heading"
        style={{
          fontSize: '12px',
          fontWeight: 600,
          color: 'var(--muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          margin: '0 0 16px',
        }}
      >
        {heading}
      </h2>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'grid',
          gap: '8px',
        }}
      >
        {resources.map(r => (
          <li key={r.href}>
            {/* target="_blank" + rel because all resource links are external */}
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="resource-link"
            >
              <span>{r.icon}</span>
              {r.label[lang]}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
