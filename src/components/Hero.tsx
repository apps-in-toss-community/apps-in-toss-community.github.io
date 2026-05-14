type Lang = 'ko' | 'en';

interface HeroProps {
  lang: Lang;
}

const copy = {
  ko: {
    title: 'apps-in-toss-community',
    tagline: '앱인토스 미니앱 개발을 가장 편하게.',
    intro:
      'DevTools, SDK 레퍼런스 앱, polyfill 등 앱인토스 미니앱 개발 흐름 전반을 지원하는 커뮤니티 오픈소스 프로젝트입니다. 브라우저에서 바로 개발·테스트할 수 있습니다.',
    ctaPrimary: '웹 데모 열기',
    ctaSecondary: 'GitHub →',
    newTab: '새 탭에서 열기',
  },
  en: {
    title: 'apps-in-toss-community',
    tagline: 'The most convenient way to build Apps in Toss mini-apps.',
    intro:
      'A community open-source project providing DevTools, an SDK reference app, polyfill, and more — covering the full Apps in Toss mini-app development workflow. Build and test right in the browser.',
    ctaPrimary: 'Open web demo',
    ctaSecondary: 'GitHub →',
    newTab: 'opens in new tab',
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
        position: 'relative',
      }}
    >
      {/* Subtle brand glow — only visible in dark mode via CSS variable */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--hero-glow)',
          pointerEvents: 'none',
          borderRadius: 'inherit',
        }}
      />
      <div
        style={{
          display: 'inline-block',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          color: 'var(--link-fg)',
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
          margin: '0 auto 16px',
          lineHeight: 1.5,
        }}
      >
        {t.tagline}
      </p>

      <p
        style={{
          fontSize: 'clamp(14px, 1.8vw, 16px)',
          color: 'var(--fg-muted, var(--fg-soft))',
          maxWidth: '600px',
          margin: '0 auto 36px',
          lineHeight: 1.6,
        }}
      >
        {t.intro}
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
          href="https://sdk-example.aitc.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-cta-primary"
        >
          {t.ctaPrimary}
          <span className="sr-only"> ({t.newTab})</span>
        </a>
        {/* target="_blank" + rel because this is an external GitHub URL */}
        <a
          href="https://github.com/apps-in-toss-community"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-cta-secondary"
        >
          {t.ctaSecondary}
          <span className="sr-only"> ({t.newTab})</span>
        </a>
      </div>
    </section>
  );
}
