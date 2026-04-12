# CLAUDE.md

## 프로젝트 개요

**apps-in-toss-community.github.io** — `apps-in-toss-community` GitHub organization의 landing page.
`https://apps-in-toss-community.github.io/`로 배포되며, organization의 주요 오픈소스 프로젝트를 소개하고 각 프로젝트로 연결하는 허브 역할을 한다.

## 기술 스택

- **Static HTML** (no framework, no build step)
- **Inline CSS** (별도 CSS 파일 없음)
- **GitHub Pages** (branch source: `main`, path: `/`)

빌드 과정이 없다. `index.html`을 직접 편집하고 push하면 GitHub Pages가 몇 초 내 배포한다.

## 파일 구조

```
.
├── index.html          # Landing 페이지 (유일한 entry)
├── README.md           # 레포 설명 (GitHub)
├── TODO.md             # 후속 작업 목록
└── .gitignore
```

## 디자인 원칙

- **순수 정적 HTML**: 프레임워크/빌드 도구 없이 유지보수 비용 최소화
- **미니멀 디자인**: 중립적 회색 톤, 조건 없이 렌더링되는 깔끔한 카드 기반
- **프로젝트 카드**: 각 공식 레포에 대해 이름(monospace) + 설명 + optional 데모 링크
- **모바일 대응**: `meta viewport` + `max-width` 기반 반응형 (CSS 한 곳)

## 새 프로젝트 추가 절차

1. `index.html`의 `<h2>Projects</h2>` 아래 `.grid` 섹션에 `<a class="card">` 블록 추가
2. 이름은 monospace(`.title`), 설명은 `.desc`
3. 웹 데모가 있으면 `<a class="demo">` 링크 추가
4. commit + push → GitHub Pages 자동 배포

예시:

```html
<a class="card" href="https://github.com/apps-in-toss-community/new-project">
  <div class="title">new-project</div>
  <div class="desc">프로젝트 설명.</div>
  <a class="demo" href="https://apps-in-toss-community.github.io/new-project/">웹 데모 열기 →</a>
</a>
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

## 관계된 레포

- [`devtools`](https://github.com/apps-in-toss-community/devtools) — `@apps-in-toss/web-framework` SDK의 mock 라이브러리
- [`sdk-example`](https://github.com/apps-in-toss-community/sdk-example) — SDK의 모든 API를 인터랙티브하게 테스트하는 레퍼런스 앱 (이 landing에서도 데모 링크 제공)

이 landing이 각 프로젝트로 향하는 허브 역할을 하므로, 새 공식 레포가 추가되면 반드시 `index.html`에 카드를 추가한다.

## TODO

후속 작업은 [TODO.md](./TODO.md) 참고. 주요 항목:
- 프로젝트 카드 확장 (organization audit 후)
- 디자인 시스템 적용
- 프로젝트 메타데이터 (last updated, stars, CI status)
- 매니페스트 기반 카드 자동 생성
