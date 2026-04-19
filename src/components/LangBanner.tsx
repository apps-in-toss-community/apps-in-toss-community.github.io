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
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageLang, setPageLang] = useState<Lang>('ko');
  const [browserLang, setBrowserLang] = useState<Lang>('ko');

  useEffect(() => {
    setMounted(true);

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

  // During SSR and first client render, return null to avoid hydration mismatch.
  // Navigator/localStorage are not available in SSR context.
  if (!mounted || !visible) return null;

  const switchTo: Lang = browserLang;
  const switchHref = switchTo === 'en' ? '/en/' : '/ko/';
  const switchLabel = switchTo === 'en' ? 'Switch to English' : '한국어로 전환';
  // `message` intentionally shows the OPPOSITE language context:
  // e.g. "This page is in Korean." appears on the Korean page when the
  // browser language is English, prompting the user to switch.
  const message = pageLang === 'ko' ? 'This page is in Korean.' : '이 페이지는 영어로 제공됩니다.';

  return (
    // <section> with aria-label avoids conflicting with the implicit
    // role="banner" already carried by the <header> element in Header.tsx.
    <section
      aria-label="Language preference"
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
      {/*
       * Deliberately using <a> instead of react-router's <Link>: a full-page
       * reload is desirable here so the SSG-baked <title>, <html lang>, and
       * <link rel="canonical"> of the target route take effect immediately.
       */}
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
        type="button"
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
    </section>
  );
}
