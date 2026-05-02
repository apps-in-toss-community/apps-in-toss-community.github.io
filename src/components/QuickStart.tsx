import { MDXProvider } from '@mdx-js/react';
import { useState } from 'react';
import QuickStartEn from '../../content/quickstart.en.mdx';
import QuickStartKo from '../../content/quickstart.ko.mdx';

type Lang = 'ko' | 'en';

interface QuickStartProps {
  lang: Lang;
}

const headings = {
  ko: 'devtools로 시작하기',
  en: 'Getting started with devtools',
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: silent fail
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
      className="quickstart-copy"
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: copied ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.15)',
        color: copied ? '#a8d8a8' : 'rgba(255,255,255,0.6)',
        fontSize: '11px',
        fontWeight: 600,
        padding: '4px 10px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        fontFamily: 'inherit',
      }}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

function InlineCode({ children }: { children?: React.ReactNode }) {
  return (
    <code
      style={{
        fontFamily: 'ui-monospace, "SF Mono", Menlo, "Fira Code", monospace',
        fontSize: '0.875em',
        background: 'var(--code-bg)',
        color: 'var(--code-fg)',
        padding: '1px 5px',
        borderRadius: '4px',
      }}
    >
      {children}
    </code>
  );
}

function CodeBlock({ children, className }: { children?: React.ReactNode; className?: string }) {
  // Inline code (no className) must not render a block-level <div> inside a <p>,
  // as that produces invalid HTML and causes React hydration mismatches (#418).
  if (!className) {
    return <InlineCode>{children}</InlineCode>;
  }

  if (typeof children !== 'string') {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('CodeBlock received non-string children:', children);
    }
    return null;
  }

  const text = children.trimEnd();
  const lang = className.replace('language-', '');

  return (
    <div style={{ position: 'relative', marginTop: '10px', marginBottom: '10px' }}>
      {lang && (
        <span
          style={{
            position: 'absolute',
            top: '10px',
            left: '16px',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            color: 'var(--code-label-fg)',
            textTransform: 'uppercase',
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
          }}
        >
          {lang}
        </span>
      )}
      <pre
        style={{
          background: 'var(--code-bg)',
          color: 'var(--code-fg)',
          padding: lang ? '34px 18px 16px' : '16px 18px',
          borderRadius: '10px',
          overflowX: 'auto',
          fontSize: '13px',
          lineHeight: 1.65,
          fontFamily: 'ui-monospace, "SF Mono", Menlo, "Fira Code", monospace',
          margin: 0,
        }}
      >
        <code>{text}</code>
      </pre>
      {text && <CopyButton text={text} />}
    </div>
  );
}

const mdxComponents = {
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      style={{
        fontSize: '14px',
        color: 'var(--fg-soft)',
        lineHeight: 1.65,
        margin: '0 0 8px',
      }}
      {...props}
    />
  ),
  pre: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  code: CodeBlock,
};

export function QuickStart({ lang }: QuickStartProps) {
  const heading = headings[lang];
  const Content = lang === 'ko' ? QuickStartKo : QuickStartEn;

  return (
    <section
      aria-labelledby="quickstart-heading"
      style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: '0 24px 64px',
      }}
    >
      <h2
        id="quickstart-heading"
        style={{
          fontSize: '12px',
          fontWeight: 600,
          color: 'var(--muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          margin: '0 0 20px',
        }}
      >
        {heading}
      </h2>
      <MDXProvider components={mdxComponents}>
        <Content />
      </MDXProvider>
    </section>
  );
}
