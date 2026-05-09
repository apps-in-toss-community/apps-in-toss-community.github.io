/**
 * build-og-images.tsx
 *
 * Generates static Open Graph PNGs (1200x630) for the homepage and every
 * project in content/projects.ts. Output: public/og/<slug>.png.
 *
 * Pipeline: JSX template (src/og/template.tsx) -> satori -> SVG -> sharp -> PNG.
 *
 * Runs as part of `prebuild` so committed PNGs always match the current
 * project list and template. Removing/renaming a project drops/renames its
 * PNG on the next build; reviewing the diff is the consistency check.
 */

import { mkdir, readdir, readFile, unlink, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import sharp from 'sharp';
import { projects } from '../content/projects';
import { OgTemplate } from '../src/og/template';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_DIR = resolve(ROOT, 'public/og');
const FONTS_DIR = resolve(ROOT, 'src/og/fonts');

interface OgEntry {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  footer: string;
}

const HOMEPAGE: OgEntry = {
  slug: 'homepage',
  eyebrow: 'Open Source Community',
  title: 'apps-in-toss-community',
  subtitle: '앱인토스 미니앱 개발을 가장 편하게.',
  footer: 'aitc.dev',
};

/** Strip markdown emphasis/inline code so the OG subtitle renders cleanly. */
function plainText(md: string): string {
  return md
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Truncate to roughly fit the subtitle slot without satori clipping. */
function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen - 1).trimEnd()}…`;
}

function projectEntry(p: (typeof projects)[number]): OgEntry {
  return {
    slug: p.id,
    eyebrow: p.status === 'available' ? 'Available now' : 'Coming soon',
    title: p.name,
    subtitle: truncate(plainText(p.description.ko), 120),
    footer: `aitc.dev · ${p.repo}`,
  };
}

async function loadFonts(): Promise<Parameters<typeof satori>[1]['fonts']> {
  const [bold, semibold, medium] = await Promise.all([
    readFile(resolve(FONTS_DIR, 'Pretendard-Bold.otf')),
    readFile(resolve(FONTS_DIR, 'Pretendard-SemiBold.otf')),
    readFile(resolve(FONTS_DIR, 'Pretendard-Medium.otf')),
  ]);
  return [
    { name: 'Pretendard', data: medium, weight: 500, style: 'normal' },
    { name: 'Pretendard', data: semibold, weight: 600, style: 'normal' },
    { name: 'Pretendard', data: bold, weight: 800, style: 'normal' },
  ];
}

async function renderEntry(
  entry: OgEntry,
  fonts: Awaited<ReturnType<typeof loadFonts>>,
): Promise<void> {
  const svg = await satori(
    <OgTemplate
      eyebrow={entry.eyebrow}
      title={entry.title}
      subtitle={entry.subtitle}
      footer={entry.footer}
    />,
    { width: 1200, height: 630, fonts },
  );
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9, quality: 90 }).toBuffer();
  await writeFile(resolve(OUT_DIR, `${entry.slug}.png`), png);
}

/** Remove any stale PNGs whose slug no longer matches an entry. */
async function pruneStale(validSlugs: Set<string>): Promise<void> {
  let existing: string[];
  try {
    existing = await readdir(OUT_DIR);
  } catch {
    return;
  }
  await Promise.all(
    existing
      .filter((f) => f.endsWith('.png'))
      .filter((f) => !validSlugs.has(f.replace(/\.png$/, '')))
      .map((f) => unlink(resolve(OUT_DIR, f))),
  );
}

async function main(): Promise<void> {
  await mkdir(OUT_DIR, { recursive: true });
  const fonts = await loadFonts();

  const entries: OgEntry[] = [HOMEPAGE, ...projects.map(projectEntry)];

  console.log(`[og] generating ${entries.length} images...`);
  const start = Date.now();
  for (const entry of entries) {
    await renderEntry(entry, fonts);
    console.log(`[og]  -> ${entry.slug}.png`);
  }
  await pruneStale(new Set(entries.map((e) => e.slug)));
  console.log(`[og] done in ${Date.now() - start}ms`);
}

main().catch((err) => {
  console.error('[og] failed:', err);
  process.exit(1);
});
