export function Footer() {
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
          community-driven
        </a>
        , not affiliated with Toss.
      </p>
    </footer>
  );
}
