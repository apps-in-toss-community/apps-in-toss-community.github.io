type Lang = 'ko' | 'en';

interface HeroProps {
  lang: Lang;
}

const copy = {
  ko: {
    title: 'apps-in-toss-community',
    tagline: '앱인토스 미니앱 개발을 가장 편하게.',
    ctaPrimary: '웹 데모 열기',
    ctaSecondary: 'GitHub →',
  },
  en: {
    title: 'apps-in-toss-community',
    tagline: 'The most convenient way to build Apps in Toss mini-apps.',
    ctaPrimary: 'Open web demo',
    ctaSecondary: 'GitHub →',
  },
};

export function Hero({ lang }: HeroProps) {
  const t = copy[lang];

  return (
    <section
      style={{
        padding: '72px 24px 64px',
        maxWidth: '960px',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          color: 'var(--accent)',
          background: 'var(--accent-soft)',
          padding: '4px 12px',
          borderRadius: '999px',
          marginBottom: '24px',
          textTransform: 'uppercase',
        }}
      >
        Open Source
      </div>

      <h1
        style={{
          fontSize: 'clamp(32px, 5vw, 54px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          margin: '0 0 20px',
          color: 'var(--fg)',
        }}
      >
        {t.title}
      </h1>

      <p
        style={{
          fontSize: 'clamp(16px, 2.5vw, 20px)',
          color: 'var(--fg-soft)',
          maxWidth: '560px',
          margin: '0 auto 36px',
          lineHeight: 1.5,
        }}
      >
        {t.tagline}
      </p>

      <div
        style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {/* target="_blank" + rel because this is an external URL */}
        <a
          href="https://apps-in-toss-community.github.io/sdk-example/"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-cta-primary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--accent)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '15px',
            padding: '11px 24px',
            borderRadius: '10px',
            textDecoration: 'none',
          }}
        >
          {t.ctaPrimary}
        </a>
        {/* target="_blank" + rel because this is an external GitHub URL */}
        <a
          href="https://github.com/apps-in-toss-community"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-cta-secondary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--card)',
            color: 'var(--fg)',
            fontWeight: 600,
            fontSize: '15px',
            padding: '11px 24px',
            borderRadius: '10px',
            border: '1px solid var(--border-strong)',
            textDecoration: 'none',
          }}
        >
          {t.ctaSecondary}
        </a>
      </div>
    </section>
  );
}
