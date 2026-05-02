import { Outlet } from 'react-router-dom';
import { LangBanner } from './LangBanner';

export function Layout() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Keyboard skip link — visually hidden until focused; positions over the
          sticky header to bypass the language switcher and jump to <main>. */}
      <a href="#main" className="skip-to-main">
        Skip to main content
      </a>
      <LangBanner />
      <Outlet />
    </div>
  );
}
