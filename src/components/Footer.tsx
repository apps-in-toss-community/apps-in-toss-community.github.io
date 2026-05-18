const COPY = {
  ko: {
    label: '커뮤니티 오픈소스 프로젝트입니다.',
    srOnly: ' (새 탭에서 열림)',
  },
  en: {
    label: 'Community open-source project.',
    srOnly: ' (opens in new tab)',
  },
} as const;

interface FooterProps {
  lang: 'ko' | 'en';
}

export function Footer({ lang }: FooterProps) {
  const copy = COPY[lang];
  return (
    <footer
      style={{
        marginTop: '80px',
        borderTop: '1px solid var(--border)',
        padding: '28px 24px',
        textAlign: 'center',
        color: 'var(--muted)',
        fontSize: '13px',
        lineHeight: 1.6,
      }}
    >
      <p style={{ margin: 0 }}>
        © apps-in-toss-community —{' '}
        <a
          href="https://github.com/apps-in-toss-community"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit', textDecoration: 'underline' }}
        >
          {copy.label}
          <span className="sr-only">{copy.srOnly}</span>
        </a>
      </p>
    </footer>
  );
}
