import { ThemeToggle } from './ThemeToggle';

type Lang = 'ko' | 'en';

interface HeaderProps {
  lang: Lang;
}

export function Header({ lang }: HeaderProps) {
  return (
    <header
      style={{
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '0 24px',
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/*
         * Deliberately using <a> instead of react-router's <Link>: a full-page
         * reload is desirable here so each route's SSG-baked <title>,
         * <html lang>, and <link rel="canonical"> take effect immediately.
         */}
        <a
          href={lang === 'en' ? '/en/' : '/ko/'}
          className="lang-switch-link header-brand"
          style={{
            fontWeight: 700,
            color: 'var(--fg)',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
            whiteSpace: 'nowrap',
          }}
        >
          apps-in-toss-community
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ThemeToggle lang={lang} />
          <nav
            aria-label="Language switcher"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              background: 'var(--chip-bg)',
              borderRadius: '8px',
              padding: '3px',
            }}
          >
            {/*
             * Deliberately using <a> instead of react-router's <Link>: a full-page
             * reload is desirable here so each route's SSG-baked <title>,
             * <html lang>, and <link rel="canonical"> take effect immediately.
             */}
            <a
              href="/ko/"
              aria-current={lang === 'ko' ? 'page' : undefined}
              className="lang-switch-link"
              style={{
                fontSize: '12px',
                fontWeight: lang === 'ko' ? 600 : 400,
                color: lang === 'ko' ? 'var(--fg)' : 'var(--muted)',
                textDecoration: 'none',
                padding: '4px 10px',
                borderRadius: '6px',
                background: lang === 'ko' ? 'var(--card)' : 'transparent',
                boxShadow: lang === 'ko' ? 'var(--lang-tab-shadow)' : 'none',
                transition: 'all 0.1s ease',
              }}
            >
              한국어
            </a>
            <a
              href="/en/"
              aria-current={lang === 'en' ? 'page' : undefined}
              className="lang-switch-link"
              style={{
                fontSize: '12px',
                fontWeight: lang === 'en' ? 600 : 400,
                color: lang === 'en' ? 'var(--fg)' : 'var(--muted)',
                textDecoration: 'none',
                padding: '4px 10px',
                borderRadius: '6px',
                background: lang === 'en' ? 'var(--card)' : 'transparent',
                boxShadow: lang === 'en' ? 'var(--lang-tab-shadow)' : 'none',
                transition: 'all 0.1s ease',
              }}
            >
              English
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
