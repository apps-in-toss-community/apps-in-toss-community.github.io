# apps-in-toss-community.github.io

Source for the [apps-in-toss-community](https://github.com/apps-in-toss-community) organization landing page, deployed at **https://apps-in-toss-community.github.io/**.

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

## How org README sync works

`scripts/sync-readme.ts` reads `content/projects.ts`, `content/values.{ko,en}.mdx`, and `content/quickstart.{ko,en}.mdx` to produce both READMEs.

The `.github/workflows/sync-org-readme.yml` workflow triggers on pushes to `main` that touch `content/` (or the script itself), checks out the `.github` repo via `SYNC_PAT`, runs `pnpm sync:readme --out ../dotgithub/profile`, and commits any diff.

To run locally and inspect the output:

```bash
pnpm sync:readme
# writes to ./out/profile/README.md and ./out/profile/README.en.md
```
