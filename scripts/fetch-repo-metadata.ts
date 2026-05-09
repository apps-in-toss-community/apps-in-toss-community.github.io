/**
 * fetch-repo-metadata.ts
 *
 * Fetches lightweight GitHub metadata (pushed_at, stargazers_count, language)
 * for every repo listed in `content/projects.ts` and writes the result to
 * `src/generated/repo-metadata.json`.
 *
 * Runs as `prebuild`: build never fails on fetch errors. On a per-repo failure
 * the previously-committed cache entry is kept and a warning is printed. If the
 * cache file does not yet exist on first run, missing entries are written as
 * `null`, the card simply hides its metadata strip — graceful degrade.
 *
 * GitHub's unauthenticated REST API allows 60 req/hr per IP, more than enough
 * for ~7 repos. If `GITHUB_TOKEN` is set in the environment it is used for the
 * higher 5000 req/hr authenticated quota (no scopes needed for public repos).
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects } from '../content/projects';

export interface RepoMetadata {
  pushed_at: string | null;
  stargazers_count: number | null;
  language: string | null;
}

export type RepoMetadataMap = Record<string, RepoMetadata>;

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const ORG = 'apps-in-toss-community';
const OUT_PATH = resolve(ROOT, 'src/generated/repo-metadata.json');

async function readCache(): Promise<RepoMetadataMap> {
  try {
    const content = await readFile(OUT_PATH, 'utf-8');
    return JSON.parse(content) as RepoMetadataMap;
  } catch {
    return {};
  }
}

async function fetchOne(repo: string): Promise<RepoMetadata | null> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'apps-in-toss-community-site',
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`https://api.github.com/repos/${ORG}/${repo}`, { headers });
  if (!res.ok) {
    console.warn(`  ⚠ ${repo}: HTTP ${res.status} ${res.statusText}`);
    return null;
  }
  const data = (await res.json()) as {
    pushed_at?: string | null;
    stargazers_count?: number | null;
    language?: string | null;
  };
  return {
    pushed_at: data.pushed_at ?? null,
    stargazers_count: data.stargazers_count ?? null,
    language: data.language ?? null,
  };
}

async function main(): Promise<void> {
  const cache = await readCache();
  const slugs = Array.from(new Set(projects.map((p) => p.repo)));

  console.log(`Fetching metadata for ${slugs.length} repos…`);

  const results = await Promise.all(
    slugs.map(async (slug) => {
      try {
        const meta = await fetchOne(slug);
        return [slug, meta] as const;
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.warn(`  ⚠ ${slug}: ${message}`);
        return [slug, null] as const;
      }
    }),
  );

  const next: RepoMetadataMap = { ...cache };
  let updated = 0;
  let stale = 0;
  for (const [slug, meta] of results) {
    if (meta) {
      next[slug] = meta;
      updated++;
    } else if (cache[slug]) {
      stale++;
    } else {
      next[slug] = { pushed_at: null, stargazers_count: null, language: null };
    }
  }

  await mkdir(dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, `${JSON.stringify(next, null, 2)}\n`, 'utf-8');

  console.log(`✔ ${updated} updated, ${stale} kept stale → ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  // Never fail the build for a metadata fetch problem.
  process.exit(0);
});
