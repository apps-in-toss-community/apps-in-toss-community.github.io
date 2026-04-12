export interface Project {
  id: string;
  name: string;
  repo: string;
  status: 'available' | 'coming-soon';
  demoUrl?: string;
  description: {
    ko: string;
    en: string;
  };
}

export const projects: Project[] = [
  {
    id: 'devtools',
    name: '@ait-co/devtools',
    repo: 'devtools',
    status: 'available',
    description: {
      ko: '`@apps-in-toss/web-framework` SDK의 mock 라이브러리, 번들러 플러그인, floating DevTools 패널. 토스 앱 없이 웹 브라우저에서 미니앱을 구동·테스트할 수 있어요.',
      en: 'A mock library for `@apps-in-toss/web-framework` with a bundler plugin and a floating DevTools panel. Run and test your mini-app in any web browser without the Toss app.',
    },
  },
  {
    id: 'sdk-example',
    name: 'sdk-example',
    repo: 'sdk-example',
    status: 'available',
    demoUrl: 'https://apps-in-toss-community.github.io/sdk-example/',
    description: {
      ko: '모든 SDK API를 직접 실행해보면서 해당 코드를 나란히 확인할 수 있는 인터랙티브 레퍼런스 앱.',
      en: 'An interactive reference app — run any SDK API and read the matching code side by side.',
    },
  },
  {
    id: 'polyfill',
    name: '@ait-co/polyfill',
    repo: 'polyfill',
    status: 'coming-soon',
    description: {
      ko: '독점 SDK 대신 `navigator.clipboard`, `navigator.geolocation` 같은 웹 표준 API를 그대로 사용해 미니앱을 만들 수 있는 polyfill.',
      en: 'A polyfill so you can build mini-apps with standard Web APIs (`navigator.clipboard`, `navigator.geolocation`, ...) instead of the proprietary SDK.',
    },
  },
  {
    id: 'docs',
    name: 'docs',
    repo: 'docs',
    status: 'coming-soon',
    description: {
      ko: '공식 문서를 기반으로 더 세련되고 친절하게 재구성한 가이드와 레퍼런스 문서 세트.',
      en: 'A cleaner, friendlier set of guides and references, built on top of the official documentation.',
    },
  },
  {
    id: 'claude-code-plugin',
    name: 'claude-code-plugin',
    repo: 'claude-code-plugin',
    status: 'coming-soon',
    description: {
      ko: '위 도구들을 엮어서, Claude Code 안에서 미니앱을 생성·개발·테스트·배포할 수 있는 공식 플러그인.',
      en: 'The official plugin that ties everything together — scaffold, develop, test, and publish mini-apps from inside Claude Code.',
    },
  },
];

export function repoUrl(repo: string): string {
  return `https://github.com/apps-in-toss-community/${repo}`;
}
