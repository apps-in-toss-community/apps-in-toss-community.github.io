/// <reference types="@types/mdx" />

declare module '*.mdx' {
  import type { MDXProps } from '@mdx-js/react';
  const MDXContent: (props: MDXProps) => JSX.Element;
  export default MDXContent;
}
