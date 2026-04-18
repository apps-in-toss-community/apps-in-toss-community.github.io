# TODO

## High Priority
(None)

## Medium Priority
- [ ] Upgrade `react-router-dom` to v7 once `vite-react-ssg` supports it
  - Currently pinned at v6 because `vite-react-ssg@0.9.1-beta.1` still imports `react-router-dom/server.js` (removed in v7). Verified by attempting the upgrade on 2026-04-13.
  - Track: https://github.com/Daydreamer-riri/vite-react-ssg (repo owner's TanStack support is also still stubbed out as a runtime `throw`)
  - When upstream ships v7 support, upgrade both homepage and (separately) sdk-example to match.
- [ ] Expand the project list beyond `devtools` and `sdk-example` — audit organization repos and add notable community ones
- [ ] Add project metadata per card — last updated, star count, language, CI status

## Low Priority
- [ ] Consider `@tanstack/react-router` migration (both homepage + sdk-example) once `vite-react-ssg`'s `Experimental_ViteReactSSG` tanstack entry is actually implemented (currently a runtime `throw` stub).
- [ ] Consider a custom domain (CNAME)
- [ ] Add OpenGraph/Twitter meta tags for social sharing
- [ ] Add favicon
- [ ] Accessibility audit (heading hierarchy, focus rings, contrast)
- [ ] Clean up Biome rules currently disabled in `biome.json`
  - Biome is the org-wide standard (see umbrella `../CLAUDE.md`). These are off only because existing code predates adoption.
  - [ ] `suspicious/noArrayIndexKey` — `src/components/ProjectCard.tsx:17` (list render). Derive a stable key from the item.
  - [ ] `a11y/useButtonType` — 2 call sites using `<button>` without explicit `type`:
    - `src/components/LangBanner.tsx:104`
    - `src/components/QuickStart.tsx:31`
    - Fix: add `type="button"` (default is `submit` inside a `<form>`, which is a common footgun).
  - [ ] After both are fixed, remove the two off overrides from `biome.json` and confirm `pnpm lint` passes clean.

## Backlog
- [ ] Dark mode manual toggle (currently auto via `prefers-color-scheme`)
