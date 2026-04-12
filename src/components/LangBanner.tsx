import { useEffect, useState } from 'react';

type Lang = 'ko' | 'en';

const DISMISSED_KEY = 'ait-homepage-lang-banner-dismissed';

function detectPageLang(pathname: string): Lang {
  if (pathname.startsWith('/en')) return 'en';
  return 'ko';
}

function detectBrowserLang(): Lang {
  const lang = (typeof navigator !== 'undefined' ? navigator.language : '') ?? '';
  return lang.toLowerCase().startsWith('ko') ? 'ko' : 'en';
}

function isDismissed(): boolean {
  try {
    return localStorage.getItem(DISMISSED_KEY) === 'true';
  } catch {
    return false;
  }
}

function setDismissed(): void {
  try {
    localStorage.setItem(DISMISSED_KEY, 'true');
  } catch {
    // ignore
  }
}

export function LangBanner() {
  const [visible, setVisible] = useState(false);
  const [pageLang, setPageLang] = useState<Lang>('ko');
  const [browserLang, setBrowserLang] = useState<Lang>('ko');

  useEffect(() => {
    const pl = detectPageLang(window.location.pathname);
    const bl = detectBrowserLang();
    setPageLang(pl);
    setBrowserLang(bl);

    if (pl !== bl && !isDismissed()) {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    setDismissed();
    setVisible(false);
  }

  if (!visible) return null;

  const switchTo: Lang = browserLang;
  const switchHref = switchTo === 'en' ? '/en/' : '/ko/';
  const switchLabel = switchTo === 'en' ? 'Switch to English' : '한국어로 전환';
  const message =
    pageLang === 'ko'
      ? 'This page is in Korean.'
      : '이 페이지는 영어로 제공됩니다.';

  return (
    <div
      role="banner"
      style={{
        background: 'var(--card)',
        borderBottom: '1px solid var(--border)',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        fontSize: '13px',
        color: 'var(--fg-soft)',
        flexWrap: 'wrap',
      }}
    >
      <span>{message}</span>
      <a
        href={switchHref}
        style={{
          color: 'var(--accent)',
          fontWeight: 600,
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        {switchLabel} →
      </a>
      <button
        onClick={dismiss}
        aria-label="Dismiss language banner"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--muted)',
          fontSize: '16px',
          lineHeight: 1,
          padding: '2px 4px',
          marginLeft: 'auto',
        }}
      >
        ×
      </button>
    </div>
  );
}
