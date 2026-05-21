import { Outlet, useLocation } from 'react-router-dom';
import { LangBanner } from './LangBanner';

const SKIP_LABEL = {
  ko: '본문으로 바로가기',
  en: 'Skip to main content',
} as const;

export function Layout() {
  const { pathname } = useLocation();
  // Korean is the default: only `/en*` is English (matches LangBanner + routes,
  // where `/` and `/ko/` both render the Korean home).
  const lang = pathname.startsWith('/en') ? 'en' : 'ko';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Keyboard skip link — visually hidden until focused; positions over the
          sticky header to bypass the language switcher and jump to <main>. */}
      <a href="#main" className="skip-to-main">
        {SKIP_LABEL[lang]}
      </a>
      <LangBanner />
      <Outlet />
    </div>
  );
}
