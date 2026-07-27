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
    demoUrl: 'https://devtools.aitc.dev/',
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
    demoUrl: 'https://sdk-example.aitc.dev/',
    description: {
      ko: '모든 SDK API를 직접 실행해보면서 **JSON 결과와 실행 이력을 실시간으로 확인할 수 있는 인터랙티브 레퍼런스 앱**.',
      en: 'An **interactive reference app** — run any SDK API and inspect the JSON result and execution history in real time.',
    },
  },
  {
    id: 'polyfill',
    name: '@ait-co/polyfill',
    repo: 'polyfill',
    status: 'available',
    description: {
      ko: 'SDK를 직접 import하지 않고도 **웹 표준 API**(`navigator.clipboard`, `navigator.geolocation`, ...)를 그대로 써서 미니앱을 만들 수 있는 polyfill — 런타임에 SDK로 자동 라우팅됩니다.',
      en: 'A polyfill so you can build mini-apps with **standard Web APIs** (`navigator.clipboard`, `navigator.geolocation`, ...) that transparently route through the SDK at runtime.',
    },
  },
  {
    id: 'debugger',
    name: '@ait-co/debugger',
    repo: 'debugger',
    status: 'available',
    description: {
      ko: '실기기 토스 앱 WebView를 **CDP relay로 붙여 에이전트가 직접 디버깅·테스트**하게 해주는 MCP 데몬 + test runner(`debugger`, `debugger-test` bin). devDependency로 설치하거나 `npx`로 바로 실행할 수 있고, 프로덕션 번들에는 절대 들어가지 않아요.',
      en: 'An MCP daemon and test runner that attaches a **real-device Toss app WebView over a CDP relay so agents can debug and test directly** (`debugger`, `debugger-test` bins). Install as a devDependency or run straight from `npx` — it never ships in a production bundle.',
    },
  },
  {
    id: 'debug-console',
    name: '@ait-co/debug-console',
    repo: 'debugger',
    status: 'available',
    description: {
      ko: '실기기 WebView 안에서 도는 **on-device attach 런타임 + eruda 인앱 콘솔**. `@ait-co/debugger`와 짝을 이루는 패키지 중 프로덕션 번들에 들어갈 수 있는 유일한 쪽으로, dependency는 `eruda` 하나뿐이에요.',
      en: 'The **on-device attach runtime and eruda in-app console** that runs inside the WebView. Paired with `@ait-co/debugger`, this is the only one of the two that can enter a production bundle — its sole dependency is `eruda`.',
    },
  },
  {
    id: 'docs',
    name: 'docs',
    repo: 'docs',
    status: 'available',
    demoUrl: 'https://docs.aitc.dev/',
    description: {
      ko: '앱인토스 SDK 문서를 기반으로 더 **세련되고 친절하게** 재구성한 커뮤니티 가이드/레퍼런스.',
      en: 'A **cleaner, friendlier** community-curated reference built around the Apps in Toss SDK.',
    },
  },
  {
    id: 'oidc-bridge',
    name: 'oidc-bridge',
    repo: 'oidc-bridge',
    status: 'available',
    demoUrl: 'https://oidc-bridge.aitc.dev/',
    description: {
      ko: '토스 로그인을 **표준 OIDC**와 **Firebase Custom Token**으로 중계하는 오픈소스 서버. Supabase Auth, Firebase Auth, Auth0 등 어디든 바로 연결할 수 있어요. 공용 인스턴스는 `oidc-bridge.aitc.dev`에서 운영 중.',
      en: 'An open-source server that bridges Toss login into **standard OIDC** and **Firebase Custom Tokens** — plug straight into Supabase Auth, Firebase Auth, Auth0, or any OIDC-compatible IdP. Public instance live at `oidc-bridge.aitc.dev`.',
    },
  },
  {
    id: 'console-cli',
    name: 'console-cli',
    repo: 'console-cli',
    status: 'available',
    description: {
      ko: '앱인토스 콘솔을 **CLI**로 자동화. 최초 로그인만 브라우저로 하고, 이후엔 headless 브라우저로 빌드·배포·릴리스를 커맨드 한 줄로 처리할 수 있어요.',
      en: 'CLI for the Apps in Toss console — log in once in a browser, then drive builds, deploys, and releases from your shell via headless automation.',
    },
  },
  {
    id: 'agent-plugin',
    name: 'agent-plugin',
    repo: 'agent-plugin',
    status: 'available',
    description: {
      ko: '위 도구들을 엮어 **Claude Code 안에서 미니앱을 생성·개발·테스트·배포**할 수 있게 해주는 커뮤니티 플러그인. `/ait:new`로 scaffold부터 배포까지 에이전트 안에서 완주할 수 있어요. OpenAI Codex 배포는 스펙 확정 후 추가될 예정입니다.',
      en: 'A community plugin that ties everything together — **scaffold, develop, test, and publish mini-apps from inside Claude Code** with `/ait:new` and a full agentic workflow. OpenAI Codex distribution is planned once the plugin spec stabilises.',
    },
  },
];

export function repoUrl(repo: string): string {
  return `https://github.com/apps-in-toss-community/${repo}`;
}
