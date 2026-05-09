# apps-in-toss-community.github.io

Source for the [apps-in-toss-community](https://github.com/apps-in-toss-community) organization landing page, deployed at **https://aitc.dev/**.

This repo also serves as the **single source of truth** for the org profile READMEs in [`.github/profile/`](https://github.com/apps-in-toss-community/.github/tree/main/profile). A GitHub Action automatically regenerates and pushes them whenever `content/` changes on `main`.

## Stack

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS v4**
- **MDX** (via `@mdx-js/rollup`) for content sections
- **vite-react-ssg** for pre-rendering (produces `dist/index.html`, `dist/ko/index.html`, `dist/en/index.html`)
- **react-router-dom v6** (pinned — vite-react-ssg requires v6)

## Commands

```bash
pnpm dev          # local dev server
pnpm build        # pre-render to dist/
pnpm typecheck    # tsc --noEmit
pnpm sync:readme  # generate out/profile/README.md + README.en.md
```

## Pre-commit hook

Optional but recommended. After cloning, activate the standard pre-commit hook (runs `biome check` on staged files):

```sh
git config core.hooksPath .githooks
```

This is a developer convenience for fast feedback before push. CI runs the same checks as the enforcement layer, so contributors who don't activate the hook will still see lint failures in their PR.

## ProjectCard metadata

Each project card on the landing page shows last-updated time, star count, and primary language. The data is fetched from the GitHub REST API at **build time** by `scripts/fetch-repo-metadata.ts` (run via `prebuild`) and committed to `src/generated/repo-metadata.json` so dev runs and offline builds work without network access.

If a fetch fails (rate limit, transient network error), the previously committed cache entry is kept and a warning is logged — the build never fails because of metadata. Set `GITHUB_TOKEN` in the environment to lift the unauthenticated 60 req/hr quota; no scopes are needed for public repos.

To refresh the cache manually:

```bash
pnpm fetch:metadata
```

## How org README sync works

`scripts/sync-readme.ts` reads `content/projects.ts`, `content/values.{ko,en}.mdx`, and `content/quickstart.{ko,en}.mdx` to produce both READMEs.

The `.github/workflows/sync-org-readme.yml` workflow triggers on pushes to `main` that touch `content/` (or the script itself), checks out the `.github` repo via `SYNC_PAT`, runs `pnpm sync:readme --out ../dotgithub/profile`, and commits any diff.

To run locally and inspect the output:

```bash
pnpm sync:readme
# writes to ./out/profile/README.md and ./out/profile/README.en.md
```
