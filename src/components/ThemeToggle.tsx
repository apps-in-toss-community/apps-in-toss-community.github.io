import { useEffect, useState } from 'react';
import {
  applyTheme,
  getTheme,
  nextMode,
  setTheme,
  subscribeSystemTheme,
  type ThemeMode,
} from '../lib/theme';

type Lang = 'ko' | 'en';

interface ThemeToggleProps {
  lang: Lang;
}

const LABELS: Record<Lang, Record<ThemeMode, { short: string; aria: string }>> = {
  ko: {
    system: { short: '시스템', aria: '테마: 시스템 (클릭하여 라이트로 전환)' },
    light: { short: '라이트', aria: '테마: 라이트 (클릭하여 다크로 전환)' },
    dark: { short: '다크', aria: '테마: 다크 (클릭하여 시스템으로 전환)' },
  },
  en: {
    system: { short: 'System', aria: 'Theme: System (click to switch to Light)' },
    light: { short: 'Light', aria: 'Theme: Light (click to switch to Dark)' },
    dark: { short: 'Dark', aria: 'Theme: Dark (click to switch to System)' },
  },
};

function ModeIcon({ mode }: { mode: ThemeMode }) {
  // 16x16 inline SVG. `currentColor` so we inherit text color from the button.
  if (mode === 'light') {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    );
  }
  if (mode === 'dark') {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    );
  }
  // system: half sun / half moon — a circle split visually.
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18" />
      <path d="M12 8a4 4 0 0 1 0 8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ThemeToggle({ lang }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<ThemeMode>('system');

  useEffect(() => {
    const initial = getTheme();
    setMode(initial);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (mode !== 'system') return;
    return subscribeSystemTheme((resolved) => {
      if (typeof document !== 'undefined') {
        document.documentElement.dataset.theme = resolved;
      }
    });
  }, [mounted, mode]);

  function cycle() {
    const next = nextMode(mode);
    setMode(next);
    setTheme(next);
    applyTheme(next);
  }

  // Render a stable placeholder on SSR / before mount so hydration sees the
  // same DOM. Once mounted we know the real mode and can show the right icon.
  const display: ThemeMode = mounted ? mode : 'system';
  const labels = LABELS[lang][display];

  return (
    <button type="button" onClick={cycle} aria-label={labels.aria} className="theme-toggle">
      <ModeIcon mode={display} />
      <span className="theme-toggle-label">{labels.short}</span>
    </button>
  );
}
