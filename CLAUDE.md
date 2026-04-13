# CLAUDE.md

## 프로젝트 개요

**apps-in-toss-community.github.io** — `apps-in-toss-community` GitHub organization의 landing page.
`https://apps-in-toss-community.github.io/`로 배포되며, 모든 오픈소스 프로젝트를 소개하고 각 프로젝트로 연결하는 허브 역할을 한다.

또한 `content/` 디렉토리가 org profile README의 **단일 진실 공급원(single source of truth)**이다.
`scripts/sync-readme.ts`가 content를 읽어 `.github/profile/README.md`와 `README.en.md`를 생성하고, GitHub Action이 main에 push될 때 자동으로 `.github` 레포에 커밋한다.

## 기술 스택

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite` 플러그인)
- **MDX** (`@mdx-js/rollup`) — content 섹션 (values, quickstart)
- **vite-react-ssg** — 정적 사이트 사전 렌더링 (pre-rendering)
- **react-router-dom v6** — vite-react-ssg가 v6을 요구하므로 고정 (v7로 업그레이드 시 vite-react-ssg 마이그레이션 필요)

## 명령어

```bash
pnpm dev            # 로컬 dev 서버
pnpm build          # dist/ 에 사전 렌더링 (index.html, ko/index.html, en/index.html)
pnpm typecheck      # tsc --noEmit
pnpm sync:readme    # out/profile/README.md + README.en.md 생성
```

## 파일 구조

```
.
├── content/
│   ├── projects.ts             # 프로젝트 메타데이터 (id, name, repo, status, description{ko,en})
│   ├── values.ko.mdx           # "이런 것들을 할 수 있어요" 불릿 리스트
│   ├── values.en.mdx
│   ├── quickstart.ko.mdx       # devtools 설치/설정 코드 스니펫
│   └── quickstart.en.mdx
├── scripts/
│   └── sync-readme.ts          # org profile README 생성기
├── src/
│   ├── components/             # Layout, Header, Footer, Hero, LangBanner, ValueList,
│   │                           #   ProjectCard, ProjectGrid, QuickStart, Resources
│   ├── pages/                  # HomeKo, HomeEn
│   ├── routes.tsx              # vite-react-ssg 라우트 정의
│   ├── main.tsx                # 앱 진입점
│   └── index.css               # Tailwind 기본 임포트
├── .github/
│   └── workflows/
│       ├── deploy-pages.yml    # GitHub Pages 배포 (build → upload → deploy)
│       └── sync-org-readme.yml # org .github 레포에 README 동기화
├── .nvmrc                      # Node 버전 (24)
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Content 규칙

### `content/projects.ts`

프로젝트 메타데이터를 정의한다. `status: 'available' | 'coming-soon'`으로 구분.

새 프로젝트 추가 시:
1. `projects` 배열에 항목 추가 (`ko`/`en` 설명 모두 작성)
2. `pnpm build`로 사이트 빌드 확인
3. `pnpm sync:readme`로 README 생성 확인

### MDX 파일

`content/values.*.mdx`와 `content/quickstart.*.mdx`는 순수 Markdown으로 작성한다.
Frontmatter가 있으면 `sync-readme.ts`가 자동으로 제거한다.

- `values.*.mdx`: 불릿 리스트 (- 🛠️ **...** — ...)
- `quickstart.*.mdx`: 설명 텍스트 + bash/ts 코드 블록

## i18n / 라우팅

| 경로 | 설명 |
|---|---|
| `/` | 기본 랜딩 (LangBanner로 `/ko/` 또는 `/en/` 안내) |
| `/ko/` | 한국어 전용 페이지 |
| `/en/` | 영어 전용 페이지 |

### LangBanner

`/`에 접속하면 `navigator.language`를 감지해 `/ko/` 또는 `/en/`으로 이동하도록 안내하는 배너를 표시한다.
사용자가 배너를 닫으면 `localStorage`의 `ait-homepage-lang-banner-dismissed` 키에 `'true'`로 저장한다.

## Pre-rendering (vite-react-ssg)

`pnpm build`는 `vite-react-ssg build`를 실행한다. 라우트 정의(`src/routes.tsx`)에 따라 아래 파일들을 생성한다:

- `dist/index.html`
- `dist/ko/index.html`
- `dist/en/index.html`

**react-router-dom이 v6에 고정된 이유**: `vite-react-ssg@0.9.x`는 react-router-dom v6 API를 사용한다.
v7로 올리려면 vite-react-ssg를 v7 호환 버전으로 함께 업그레이드해야 한다 (TODO.md 참고).

## 배포 플로우

### 사이트 자동 배포

`main`에 push → `.github/workflows/deploy-pages.yml` 실행:
1. `pnpm install && pnpm build`
2. `dist/`를 GitHub Pages artifact로 업로드
3. GitHub Pages에 배포

### Org profile README 자동 동기화

`main`에 push하고 `content/**` 또는 `scripts/sync-readme.ts`가 변경된 경우
→ `.github/workflows/sync-org-readme.yml` 실행:
1. 이 레포와 `.github` 레포를 함께 체크아웃
2. `pnpm sync:readme --out ../dotgithub/profile`
3. 변경이 있으면 `.github` 레포에 커밋·push

필요한 시크릿: `SYNC_PAT` — fine-grained PAT, `contents: write` on `apps-in-toss-community/.github` only

## 새 프로젝트 추가 방법

1. `content/projects.ts`의 `projects` 배열에 항목 추가
   - `status: 'available'`이면 Available Now 섹션에 표시
   - `status: 'coming-soon'`이면 Coming Soon 섹션에 표시
   - `demoUrl`이 있으면 README 테이블과 ProjectCard에 데모 링크 추가
2. `pnpm typecheck && pnpm build`로 확인
3. `pnpm sync:readme`로 README 생성 확인 후 `out/profile/`과 비교
4. commit & push → 사이트 + org README 자동 반영

## 카피(copy) 수정 방법

| 수정 대상 | 위치 |
|---|---|
| 프로젝트 설명 | `content/projects.ts` |
| "이런 것들을 할 수 있어요" 불릿 | `content/values.ko.mdx` |
| "What we offer" 불릿 | `content/values.en.mdx` |
| devtools 시작하기 섹션 | `content/quickstart.ko.mdx` / `content/quickstart.en.mdx` |
| tagline, 섹션 제목, Resources 링크 | `scripts/sync-readme.ts`의 `STRINGS` 상수 + 각 컴포넌트 |

## 관련 레포

- [`.github`](https://github.com/apps-in-toss-community/.github) — org profile README 보관
- [`devtools`](https://github.com/apps-in-toss-community/devtools) — mock 라이브러리
- [`sdk-example`](https://github.com/apps-in-toss-community/sdk-example) — 인터랙티브 SDK 예제 앱
- [`polyfill`](https://github.com/apps-in-toss-community/polyfill) — WIP, 웹 표준 API polyfill
- [`docs`](https://github.com/apps-in-toss-community/docs) — WIP, 가이드/레퍼런스 문서
- [`claude-code-plugin`](https://github.com/apps-in-toss-community/claude-code-plugin) — WIP, Claude Code 통합
