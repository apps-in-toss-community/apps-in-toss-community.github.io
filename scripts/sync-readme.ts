/**
 * sync-readme.ts
 *
 * Generates org profile READMEs from the content source files and writes them
 * to the specified output directory (default: ./out/profile).
 *
 * Usage:
 *   pnpm sync:readme                         # writes to ./out/profile
 *   pnpm sync:readme --out /path/to/profile  # custom output dir
 */

import { readFile, mkdir, writeFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { projects, repoUrl, type Project } from '../content/projects.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// Hardcoded strings (not in content/)
// ---------------------------------------------------------------------------

const STRINGS = {
  ko: {
    tagline: '앱인토스 미니앱 개발을 가장 편하게.',
    offerHeading: '이런 것들을 할 수 있어요',
    gettingStartedHeading: 'devtools로 시작하기',
    langLink: '[English →](./README.en.md)',
    resources: [
      '📦 [`@apps-in-toss/web-framework`](https://www.npmjs.com/package/@apps-in-toss/web-framework) — 원본 SDK',
      '🏠 [Landing page](https://apps-in-toss-community.github.io/) — 프로젝트 허브',
      '🧪 [SDK Web Demo](https://apps-in-toss-community.github.io/sdk-example/) — 브라우저에서 모든 API 실행',
    ],
  },
  en: {
    tagline: 'The most convenient way to build Apps in Toss mini-apps.',
    offerHeading: 'What we offer',
    gettingStartedHeading: 'Getting started with devtools',
    langLink: '[한국어 →](./README.md)',
    resources: [
      '📦 [`@apps-in-toss/web-framework`](https://www.npmjs.com/package/@apps-in-toss/web-framework) — the underlying SDK',
      '🏠 [Landing page](https://apps-in-toss-community.github.io/) — project hub',
      '🧪 [SDK Web Demo](https://apps-in-toss-community.github.io/sdk-example/) — every API in your browser',
    ],
  },
} as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Read an MDX file as plain text, stripping frontmatter if present. */
async function readMdx(relPath: string): Promise<string> {
  const content = await readFile(resolve(ROOT, relPath), 'utf-8');
  // Strip YAML frontmatter (--- ... ---)
  return content.replace(/^---[\s\S]*?---\s*/m, '').trim();
}

/** Format a project row for the markdown table. */
function projectRow(p: Project, lang: 'ko' | 'en'): string {
  const link = `[**\`${p.name}\`**](${repoUrl(p.repo)})`;
  let desc = p.description[lang];

  // For sdk-example, append demo link inline (matching existing README style)
  if (p.demoUrl) {
    desc += ` → [Web Demo](${p.demoUrl})`;
  }

  return `| ${link} | ${desc} |`;
}

/** Build the Projects section (Available Now + Coming Soon tables). */
function buildProjectsSection(lang: 'ko' | 'en'): string {
  const available = projects.filter((p) => p.status === 'available');
  const comingSoon = projects.filter((p) => p.status === 'coming-soon');

  const tableHeader = '| Project | Description |\n|---|---|';

  const availableRows = available.map((p) => projectRow(p, lang)).join('\n');
  const comingSoonRows = comingSoon.map((p) => projectRow(p, lang)).join('\n');

  return [
    '## Projects',
    '',
    '### ✅ Available Now',
    '',
    tableHeader,
    availableRows,
    '',
    '### 🚧 Coming Soon',
    '',
    tableHeader,
    comingSoonRows,
  ].join('\n');
}

/** Build the full README for the given language. */
async function buildReadme(lang: 'ko' | 'en'): Promise<string> {
  const s = STRINGS[lang];

  const valuesContent = await readMdx(`content/values.${lang}.mdx`);
  const quickstartContent = await readMdx(`content/quickstart.${lang}.mdx`);

  const sections: string[] = [
    // Header block
    '<div align="center">',
    '',
    '# apps-in-toss-community',
    '',
    `**${s.tagline}**`,
    '',
    `[Landing](https://apps-in-toss-community.github.io/) · [Web Demo](https://apps-in-toss-community.github.io/sdk-example/) · ${s.langLink}`,
    '',
    '</div>',
    '',
    '---',
    '',
    // Offer / Values
    `## ${s.offerHeading}`,
    '',
    valuesContent,
    '',
    '---',
    '',
    // Projects
    buildProjectsSection(lang),
    '',
    '---',
    '',
    // Getting started
    `## ${s.gettingStartedHeading}`,
    '',
    quickstartContent,
    '',
    '---',
    '',
    // Resources
    '## Resources',
    '',
    s.resources.map((r) => `- ${r}`).join('\n'),
  ];

  return sections.join('\n') + '\n';
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  // Parse --out flag
  const args = process.argv.slice(2);
  const outIdx = args.indexOf('--out');
  const outDir =
    outIdx !== -1 && args[outIdx + 1]
      ? resolve(args[outIdx + 1])
      : resolve(ROOT, 'out', 'profile');

  await mkdir(outDir, { recursive: true });

  const [koReadme, enReadme] = await Promise.all([
    buildReadme('ko'),
    buildReadme('en'),
  ]);

  await Promise.all([
    writeFile(resolve(outDir, 'README.md'), koReadme, 'utf-8'),
    writeFile(resolve(outDir, 'README.en.md'), enReadme, 'utf-8'),
  ]);

  console.log(`✔ README.md    → ${outDir}/README.md`);
  console.log(`✔ README.en.md → ${outDir}/README.en.md`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
