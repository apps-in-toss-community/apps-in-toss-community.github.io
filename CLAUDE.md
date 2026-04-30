# CLAUDE.md

## 프로젝트 성격 (요약)

`apps-in-toss-community`는 **비공식(unofficial) 오픈소스 커뮤니티**다. "공식/official/토스가 제공하는/powered by Toss" 등 제휴·후원 암시 표현 금지, "커뮤니티/오픈소스/비공식" 사용. 상세는 umbrella `../CLAUDE.md`의 '프로젝트 성격' 참조.

**landing page와 org profile README는 조직의 얼굴**이라 특히 주의. 이 규칙은 `content/`(MDX/TS), `scripts/sync-readme.ts`로 생성되는 org profile README, 모든 UI 카피에 동일 적용.

## 프로젝트 개요

`apps-in-toss-community` GitHub organization의 landing page. `https://aitc.dev/`에 GitHub Pages custom domain으로 배포되어 모든 오픈소스 프로젝트로 연결하는 허브. 또한 `content/`가 org profile README의 **single source of truth**이며, `scripts/sync-readme.ts`가 `.github/profile/README.md`와 `README.en.md`를 생성해 main push 시 `.github` 레포에 자동 커밋한다.

## 짝 repo

- **`.github`** — `content/`가 org profile README의 source of truth. main push 시 `sync-org-readme.yml`이 `.github/profile/README.md`로 자동 동기화. **`.github`에는 직접 PR 금지** — 여기 source만 고친다.

전체 짝 관계는 umbrella `../CLAUDE.md`의 '짝(pair) 관계' 참조.

## 기술 스택

Vite + React 19 + TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), MDX (`@mdx-js/rollup`) for content, **vite-react-ssg**로 정적 사전 렌더링, **react-router-dom v6 고정** (vite-react-ssg가 v6 API 의존, v7 업그레이드 시 vite-react-ssg를 v7 호환 버전으로 함께 올려야 함). 공통 스택(Node 24, pnpm 10.33.0, Biome 등)은 umbrella `../CLAUDE.md` 참조. 기존 코드 맥락상 Biome `noArrayIndexKey`, `useButtonType`은 우선 off, 후속 PR에서 개선.

## 명령어

```bash
pnpm dev            # 로컬 dev 서버
pnpm build          # dist/ 사전 렌더링 (index.html, ko/index.html, en/index.html)
pnpm typecheck      # tsc --noEmit
pnpm sync:readme    # out/profile/README.md + README.en.md 생성
```

전체 스크립트는 `package.json` 참조.

## 파일 구조

```
.
├── content/
│   ├── projects.ts             # 프로젝트 메타데이터 (id, name, repo, status, description{ko,en})
│   ├── values.{ko,en}.mdx      # "이런 것들을 할 수 있어요" 불릿 리스트
│   └── quickstart.{ko,en}.mdx  # devtools 설치/설정 코드 스니펫
├── scripts/sync-readme.ts      # org profile README 생성기
├── src/
│   ├── components/             # Layout, Header, Footer, Hero, LangBanner, ValueList,
│   │                           #   ProjectCard, ProjectGrid, QuickStart, Resources
│   ├── pages/                  # HomeKo, HomeEn
│   ├── routes.tsx              # vite-react-ssg 라우트 정의
│   └── main.tsx
└── .github/workflows/          # deploy-pages.yml, sync-org-readme.yml
```

## Content 규칙

- **`content/projects.ts`**: 프로젝트 메타데이터, `status: 'available' | 'coming-soon'`으로 구분. 새 항목 추가 시 `ko`/`en` 설명 모두 작성하고 `pnpm build`, `pnpm sync:readme`로 검증.
- **MDX 파일**: `values.*.mdx`(불릿 리스트), `quickstart.*.mdx`(설명 + 코드 블록) 모두 순수 Markdown. Frontmatter는 `sync-readme.ts`가 자동 제거.

## i18n / 라우팅

`/` (LangBanner로 `/ko/`, `/en/` 안내), `/ko/`, `/en/` 세 경로. LangBanner는 `navigator.language`로 추천 경로를 안내하고, 닫으면 `localStorage` 키 `ait-homepage-lang-banner-dismissed=true` 저장.

## 배포 플로우

- **사이트**: main push → `deploy-pages.yml`이 `pnpm install && pnpm build` 후 `dist/`를 GitHub Pages에 배포.
- **Org README**: main push에서 `content/**` 또는 `scripts/sync-readme.ts`가 변경되면 `sync-org-readme.yml`이 이 레포와 `.github` 레포를 함께 체크아웃, `pnpm sync:readme --out ../dotgithub/profile` 실행, 변경 있으면 `.github` 레포에 커밋·push.
- **인증**: GitHub App installation token (`actions/create-github-app-token@v1`로 런타임 교환). 시크릿 `SYNC_APP_ID`, `SYNC_APP_PRIVATE_KEY` (`ait-community-sync-bot` App). `.github` repo의 branch ruleset은 이 App만 bypass actor — 사람 직접 push/merge 불가. (`SYNC_PAT` 방식은 2026-04에 App으로 마이그레이션됨.)

## 카피 / 새 프로젝트 추가

프로젝트 설명·메타는 `content/projects.ts`, "이런 것들을 할 수 있어요"·"What we offer" 불릿은 `content/values.{ko,en}.mdx`, devtools 시작하기는 `content/quickstart.{ko,en}.mdx`. tagline·섹션 제목·Resources 링크는 `scripts/sync-readme.ts`의 `STRINGS` 상수와 각 컴포넌트에 분산. 추가/수정 후 `pnpm typecheck && pnpm build && pnpm sync:readme`로 검증.

## UI 변경 시 Playwright MCP로 검증

시각적 산출물 변경 후에는 **반드시 Playwright MCP로 브라우저에서 동작 확인**한다 (단순 prop 변경이라도 렌더 깨짐 가능). `pnpm dev` 띄우고 navigate → snapshot(DOM 회귀) → screenshot(시각) → console messages(런타임 에러) 순. 타입 체크와 테스트 통과만으로 UI 회귀는 못 잡는다 — 시각 검증 없이 "완료" 보고 금지. tool schema는 시스템에서 자동 제공.

## 운영 / TODO

- 도메인 정책 (`aitc.dev` apex, sub-repo 매핑)은 umbrella `../CLAUDE.md`의 '운영 도메인 정책' 참조.
- 조직 TODO는 umbrella `../TODO.md`가 single source of truth, 이 repo의 `TODO.md`는 stub. react-router-dom v7 마이그레이션 같은 repo-specific 항목도 거기 모아둔다.
