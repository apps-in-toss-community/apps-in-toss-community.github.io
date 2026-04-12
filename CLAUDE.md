# CLAUDE.md

## 프로젝트 개요

**apps-in-toss-community.github.io** — `apps-in-toss-community` GitHub organization의 landing page.
`https://apps-in-toss-community.github.io/`로 배포되며, organization의 모든 오픈소스 프로젝트(available + coming soon)를 소개하고 각 프로젝트로 연결하는 허브 역할을 한다.

## 기술 스택

- **Static HTML** (no framework, no build step)
- **Inline CSS** (별도 CSS 파일 없음)
- **Vanilla JS** (언어 토글만 수행)
- **GitHub Pages** (branch source: `main`, path: `/`)

빌드 과정이 없다. `index.html`을 직접 편집하고 push하면 GitHub Pages가 몇 초 내 배포한다.

## 파일 구조

```
.
├── index.html          # Landing 페이지 (유일한 entry)
├── README.md           # 레포 설명
├── CLAUDE.md           # 이 파일
├── TODO.md             # 후속 작업 목록
└── .gitignore
```

## i18n (한국어 / English)

페이지는 **한국어와 영어를 동시에 포함**하고, 우측 상단 토글 버튼으로 전환한다.

- 기본 언어: 브라우저 `navigator.language`가 `ko`로 시작하면 한국어, 아니면 영어
- 사용자가 토글한 뒤의 선택은 `localStorage`의 `ait-landing-lang` 키에 저장됨
- CSS는 `html[data-lang="ko"]` / `html[data-lang="en"]` 선택자로 `.ko` / `.en` 요소의 노출을 제어

### 새 문자열 추가 규칙

모든 텍스트 블록은 **반드시 한국어/영어 둘 다** 작성하고, 각 블록에 `lang` 속성도 붙인다.

```html
<p class="ko" lang="ko">한국어 문장.</p>
<p class="en" lang="en">English sentence.</p>
```

- `lang` 속성은 스크린 리더가 정확한 언어로 발음하는 데 필요하다
- 링크 내부 텍스트도 마찬가지로 분리 (`<span class="ko" lang="ko">...</span><span class="en" lang="en">...</span>`)
- 숫자, 제품명, 코드, 브랜드명 등 언어에 무관한 내용은 공통 래퍼 없이 그대로 사용 (footer의 brand-only 문장이 대표적)
- 한 쪽 언어에만 적는 것은 허용되지 않음 (토글 시 빈 공간이 생김)

## Information Architecture

페이지 섹션 순서 (둘 다 유지):

1. **Hero** — 가치 제안 한 줄 + 5개 핵심 가치 불릿
2. **Available Now** — 현재 사용 가능한 프로젝트 카드
3. **Coming Soon** — 계획 단계 프로젝트 카드 (WIP chip)
4. **Quick start** — 실행 가능한 코드 스니펫
5. **Resources** — 외부 링크
6. **Footer** — 저작권 / disclaimer

## 디자인 원칙

- **순수 정적 HTML**: 프레임워크/빌드 도구 없이 유지보수 비용 최소화
- **미니멀 / 중립**: 회색 톤 + 한 가지 accent, 단 hero는 충분히 크게
- **시맨틱 HTML**: 카드는 `<article>` + `<h3>`. 프로젝트 제목은 문서 아웃라인에 포함되어야 함
- **중첩 `<a>` 금지**: HTML 스펙 위반 + 예측 불가능한 렌더링. 카드 안에 여러 링크가 필요하면 카드 컨테이너는 `<a>`가 아니어야 함 (본 프로젝트는 `<article>`)
- **모바일 대응**: `max-width: 760px` + 여유 있는 패딩
- **토스 색상 언어 존중**: `#3182f6` accent, `#191f28` text 등 앱인토스 미니앱 개발자에게 친숙한 팔레트

## 접근성

- 각 언어 블록에는 `lang="ko"` / `lang="en"` 속성을 반드시 붙인다 (스크린 리더 발음 정확성)
- 언어 토글 버튼은 JS로 `aria-label`을 현재 언어에 맞게 업데이트한다 (예: 한국어일 때 `Switch to English`)
- 카드 제목은 `<h3>`로 작성하여 문서 아웃라인에 포함
- 섹션은 `<section aria-labelledby="...">` + `<h2 id="...">` 연결
- 포커스 가능한 요소에는 `:focus-visible` 스타일

## 새 프로젝트 추가 절차

1. 프로젝트가 "Available"인지 "Coming Soon"인지 결정
2. 해당 섹션의 `.grid` 안에 `<article class="card">` 블록 추가
   - `<h3>` 안에 GitHub 링크 `<a>` 하나
   - Coming Soon은 `<span class="chip wip">WIP</span>` 추가
   - `<p class="desc ko" lang="ko">` + `<p class="desc en" lang="en">` 양쪽 반드시 작성
   - 웹 데모가 있으면 `<a class="demo">` 추가 (한/영 `<span lang="...">` 포함)
3. commit + push → GitHub Pages 자동 배포 (약 30초)

예시:

```html
<article class="card">
  <h3>
    <a href="https://github.com/apps-in-toss-community/new-project">new-project</a>
    <span class="chip wip">WIP</span>
  </h3>
  <p class="desc ko" lang="ko">한국어 설명.</p>
  <p class="desc en" lang="en">English description.</p>
</article>
```

## 배포

GitHub Pages 설정: **Settings → Pages**
- Source: Deploy from a branch
- Branch: `main` / `/` (root)
- 커스텀 도메인: 설정 없음 (기본 `apps-in-toss-community.github.io` 사용)

Push to main → 수 초 내 `https://apps-in-toss-community.github.io/`에 반영.

## 로컬 미리보기

빌드가 없으므로 파일을 그대로 열면 된다:

```bash
open index.html
# 또는 간단한 정적 서버
python3 -m http.server 8000
```

언어 토글은 `localStorage`를 쓰므로 `file://` 스킴에서도 정상 동작한다 (브라우저에 따라 `localStorage`가 막혀 있으면 세션 동안만 유지됨).

## 관계된 레포

- [`.github`](https://github.com/apps-in-toss-community/.github) — organization profile README (`github.com/apps-in-toss-community`에 표시)
- [`devtools`](https://github.com/apps-in-toss-community/devtools) — mock 라이브러리
- [`sdk-example`](https://github.com/apps-in-toss-community/sdk-example) — 인터랙티브 SDK 예제 앱 (이 landing에서 데모 링크)
- [`polyfill`](https://github.com/apps-in-toss-community/polyfill) — WIP, 웹 표준 API polyfill
- [`docs`](https://github.com/apps-in-toss-community/docs) — WIP, 가이드/레퍼런스 문서
- [`claude-code-plugin`](https://github.com/apps-in-toss-community/claude-code-plugin) — WIP, Claude Code 통합

이 landing은 모든 공식 프로젝트로 향하는 허브이므로, 새 레포가 추가되거나 상태가 변하면 반드시 `index.html`에 반영한다.

## TODO

후속 작업은 [TODO.md](./TODO.md) 참고.
