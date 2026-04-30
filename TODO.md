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
- [ ] Migrate GitHub Pages to `aitc.dev` apex custom domain (cross-repo decision; see umbrella `CLAUDE.md` § 운영 도메인 정책).
  - Add `public/CNAME` containing `aitc.dev` (single line, no `https://`, no trailing slash). Vite copies `public/` verbatim into `dist/`, so the file ends up at the Pages site root as required.
  - No Vite `base` change needed — this site is the apex (already deploys at `/`); `vite.config.ts` has no `base` override and should stay that way.
  - Update README's "deployed at" line and any `content/` copy that hard-codes `apps-in-toss-community.github.io` to point at `https://aitc.dev/` (org GitHub URL stays as-is).
  - Update `scripts/sync-readme.ts` `STRINGS` / link constants that emit the homepage URL into the org profile README.
  - Add Cloudflare DNS records: apex `A` records to GitHub Pages IPs (185.199.108.153 / 109.153 / 110.153 / 111.153) and `AAAA` to the IPv6 set, or a Cloudflare-flattened `CNAME` to `apps-in-toss-community.github.io.`. Do NOT proxy through Cloudflare orange-cloud — Pages handles TLS itself.
  - GitHub Settings → Pages → Custom domain: `aitc.dev`, Enforce HTTPS (wait for cert provisioning, typically <15 min).
  - Verify `https://aitc.dev/`, `https://aitc.dev/ko/`, `https://aitc.dev/en/` all resolve and render the prerendered HTML; old `apps-in-toss-community.github.io` should auto-redirect.
- [ ] Add OpenGraph/Twitter meta tags for social sharing
- [ ] Add favicon
- [ ] Accessibility audit (heading hierarchy, focus rings, contrast)

## Backlog
- [ ] Dark mode manual toggle (currently auto via `prefers-color-scheme`)
