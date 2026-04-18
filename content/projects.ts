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
      ko: '`@apps-in-toss/web-framework` SDK의 mock 라이브러리, 번들러 플러그인, floating DevTools 패널. **토스 앱 없이 웹 브라우저에서 미니앱을 구동·테스트**할 수 있습니다.',
      en: 'A mock library for `@apps-in-toss/web-framework` with a bundler plugin and a floating DevTools panel. **Run and test your mini-app in any web browser** without the Toss app.',
    },
  },
  {
    id: 'sdk-example',
    name: 'sdk-example',
    repo: 'sdk-example',
    status: 'available',
    demoUrl: 'https://apps-in-toss-community.github.io/sdk-example/',
    description: {
      ko: '모든 SDK API를 직접 실행해보면서 해당 코드를 **나란히 확인할 수 있는 인터랙티브 레퍼런스 앱**.',
      en: 'An **interactive reference app** — run any SDK API and read the matching code side by side.',
    },
  },
  {
    id: 'polyfill',
    name: '@ait-co/polyfill',
    repo: 'polyfill',
    status: 'coming-soon',
    description: {
      ko: '독점 SDK 대신 **웹 표준 API**(`navigator.clipboard`, `navigator.geolocation`, ...)를 그대로 사용해 미니앱을 만들 수 있는 polyfill.',
      en: 'A polyfill so you can build mini-apps with **standard Web APIs** (`navigator.clipboard`, `navigator.geolocation`, ...) instead of the proprietary SDK.',
    },
  },
  {
    id: 'docs',
    name: 'docs',
    repo: 'docs',
    status: 'coming-soon',
    description: {
      ko: '앱인토스 공식 문서를 기반으로 더 **세련되고 친절하게** 재구성한 커뮤니티 가이드/레퍼런스.',
      en: 'A **cleaner, friendlier** community-maintained set of guides and references, built on top of the Apps in Toss official documentation.',
    },
  },
  {
    id: 'oidc-bridge',
    name: 'oidc-bridge',
    repo: 'oidc-bridge',
    status: 'coming-soon',
    description: {
      ko: '토스 로그인을 **표준 OIDC**와 **Firebase Custom Token**으로 중계하는 오픈소스 서버. Supabase Auth, Firebase Auth, Auth0 등 어디든 바로 연결할 수 있어요. (공용 인스턴스, rate-limited, best-effort)',
      en: 'An open-source server that bridges Toss login into **standard OIDC** and **Firebase Custom Tokens** — plug straight into Supabase Auth, Firebase Auth, Auth0, or any OIDC-compatible IdP. Public instance available (rate-limited, best-effort).',
    },
  },
  {
    id: 'console-cli',
    name: 'console-cli',
    repo: 'console-cli',
    status: 'coming-soon',
    description: {
      ko: '앱인토스 콘솔을 **CLI**와 **MCP**로 자동화. 최초 로그인만 브라우저로 하고, 이후엔 headless 브라우저로 빌드·배포·릴리스를 커맨드 한 줄 또는 Claude 명령으로 처리할 수 있어요.',
      en: 'CLI and MCP server for the Apps in Toss console — log in once in a browser, then drive builds, deploys, and releases from your shell or from Claude via headless automation.',
    },
  },
  {
    id: 'agent-plugin',
    name: 'agent-plugin',
    repo: 'agent-plugin',
    status: 'coming-soon',
    description: {
      ko: '위 도구들을 엮어 **Claude Code와 OpenAI Codex 안에서 미니앱을 생성·개발·테스트·배포**할 수 있게 해주는 커뮤니티 플러그인. 단일 repo에서 양쪽 marketplace로 듀얼 배포됩니다.',
      en: 'A community plugin that ties everything together — **scaffold, develop, test, and publish mini-apps from inside Claude Code and OpenAI Codex**. Dual-distributed to both marketplaces from a single repo.',
    },
  },
];

export function repoUrl(repo: string): string {
  return `https://github.com/apps-in-toss-community/${repo}`;
}
