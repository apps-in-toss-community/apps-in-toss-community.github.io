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

## Backlog
- [ ] Dark mode manual toggle (currently auto via `prefers-color-scheme`)
