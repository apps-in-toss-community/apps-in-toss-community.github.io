# apps-in-toss-community.github.io

**한국어** · [English](./README.en.md)

[apps-in-toss-community](https://github.com/apps-in-toss-community) 조직 랜딩 페이지의 소스 코드입니다. **https://aitc.dev/** 에 배포됩니다.

이 repo는 [`.github/profile/`](https://github.com/apps-in-toss-community/.github/tree/main/profile)의 org profile README에 대한 **단일 소스 of truth** 역할도 합니다. `content/`가 `main`에 변경되면 GitHub Action이 자동으로 재생성 후 push합니다.

## 스택

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS v4**
- **MDX** (`@mdx-js/rollup`) — 콘텐츠 섹션
- **vite-react-ssg** — 정적 사전 렌더링 (`dist/index.html`, `dist/ko/index.html`, `dist/en/index.html` 생성)
- **react-router-dom v6** (고정 — vite-react-ssg가 v6 API에 의존)

## 명령어

```bash
pnpm dev          # 로컬 dev 서버
pnpm build        # dist/ 사전 렌더링
pnpm typecheck    # tsc --noEmit
pnpm sync:readme  # out/profile/README.md + README.en.md 생성
```

## Pre-commit hook

선택 사항이지만 권장합니다. clone 후 표준 pre-commit hook을 활성화하면 staged 파일에 `biome check`가 자동으로 돕니다 (push 전 빠른 피드백):

```sh
git config core.hooksPath .githooks
```

활성화하지 않아도 동일한 검사가 CI에서 강제 계층으로 실행되므로 PR 단계에서 lint 실패를 볼 수 있습니다.

## 테마

헤더에 3단계 테마 토글(시스템 → 라이트 → 다크 → 시스템)이 있습니다. 선택값은 `localStorage`의 `aitc-theme` 키에 저장되며, `index.html`의 인라인 스크립트가 첫 렌더 전에 적용해 리로드 시 FOUC가 발생하지 않습니다. JS가 없으면 `prefers-color-scheme`으로 폴백됩니다.

## ProjectCard 메타데이터

랜딩 페이지의 각 프로젝트 카드에는 마지막 업데이트 시각, 스타 수, 주 언어가 표시됩니다. 이 데이터는 빌드 시 `scripts/fetch-repo-metadata.ts`(`prebuild`로 실행)가 GitHub REST API에서 가져와 `src/generated/repo-metadata.json`에 커밋합니다. 덕분에 dev 서버와 오프라인 빌드가 네트워크 없이도 동작합니다.

fetch가 실패하면(rate limit, 일시적 네트워크 오류) 이전에 커밋된 캐시 엔트리를 유지하고 경고만 기록합니다 — 메타데이터 때문에 빌드가 실패하지 않습니다. 인증되지 않은 60 req/hr 쿼터를 높이려면 환경에 `GITHUB_TOKEN`을 설정하세요 (공개 repo에는 scope 불필요).

캐시를 수동으로 갱신하려면:

```bash
pnpm fetch:metadata
```

## OG 이미지

홈페이지와 각 프로젝트의 정적 Open Graph PNG(1200×630)는 빌드 시 `scripts/build-og-images.tsx`가 생성합니다 — `src/og/template.tsx`의 JSX 템플릿 → satori → SVG → sharp → PNG → `public/og/<slug>.png`. `prebuild`의 일부로 실행되므로, 커밋된 PNG는 항상 현재 `content/projects.ts`와 일치합니다. Pretendard 폰트(SIL OFL)는 `src/og/fonts/`에 포함되어 있습니다.

템플릿이나 프로젝트 목록을 수정한 후 수동으로 재생성하려면:

```bash
pnpm build:og
```

커밋 전에 `public/og/`의 diff를 검토하세요.

## Org README 동기화 방식

`scripts/sync-readme.ts`는 `content/projects.ts`, `content/values.{ko,en}.mdx`, `content/quickstart.{ko,en}.mdx`를 읽어 두 README를 생성합니다.

`.github/workflows/sync-org-readme.yml` 워크플로는 `main`에 `content/`(또는 스크립트 자체)가 변경될 때 트리거됩니다. `SYNC_PAT`로 `.github` repo를 체크아웃한 뒤 `pnpm sync:readme --out ../dotgithub/profile`을 실행하고 변경이 있으면 커밋합니다.

로컬에서 실행해 결과를 확인하려면:

```bash
pnpm sync:readme
# ./out/profile/README.md 와 ./out/profile/README.en.md 에 작성됩니다
```

---

커뮤니티 오픈소스 프로젝트입니다.
