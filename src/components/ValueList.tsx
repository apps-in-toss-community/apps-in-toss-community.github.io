import { MDXProvider } from '@mdx-js/react';
import ValuesKo from '../../content/values.ko.mdx';
import ValuesEn from '../../content/values.en.mdx';

type Lang = 'ko' | 'en';

interface ValueListProps {
  lang: Lang;
}

const headings = {
  ko: '이런 것들을 할 수 있어요',
  en: 'What we offer',
};

const mdxComponents = {
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'grid',
        gap: '12px',
      }}
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      style={{
        fontSize: '15px',
        color: 'var(--fg-soft)',
        lineHeight: 1.55,
        display: 'flex',
        alignItems: 'flex-start',
        gap: '4px',
      }}
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong
      style={{
        fontWeight: 700,
        color: 'var(--fg)',
      }}
      {...props}
    />
  ),
};

export function ValueList({ lang }: ValueListProps) {
  const heading = headings[lang];
  const Content = lang === 'ko' ? ValuesKo : ValuesEn;

  return (
    <section
      aria-labelledby="values-heading"
      style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: '0 24px 64px',
      }}
    >
      <h2
        id="values-heading"
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
