import { Outlet } from 'react-router-dom';
import { LangBanner } from './LangBanner';

export function Layout() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <LangBanner />
      <Outlet />
    </div>
  );
}
