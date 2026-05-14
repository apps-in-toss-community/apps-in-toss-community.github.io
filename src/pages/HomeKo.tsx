import { Head } from 'vite-react-ssg';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ProjectGrid } from '../components/ProjectGrid';
import { QuickStart } from '../components/QuickStart';
import { Resources } from '../components/Resources';
import { ValueList } from '../components/ValueList';

const LANG = 'ko' as const;
const TITLE = 'Apps In Toss Community — 앱인토스 미니앱 개발 커뮤니티 오픈소스';
const DESCRIPTION =
  '앱인토스 미니앱 개발을 편하게 도와주는 커뮤니티 오픈소스 프로젝트. DevTools, SDK 레퍼런스, polyfill, docs 등 개발 흐름 전반을 지원합니다.';
const CANONICAL = 'https://aitc.dev/ko/';

const JSON_LD = JSON.stringify([
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Apps In Toss Community',
    url: 'https://aitc.dev',
    logo: 'https://aitc.dev/og/homepage.png',
    sameAs: ['https://github.com/apps-in-toss-community'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Apps In Toss Community',
    url: 'https://aitc.dev/ko/',
    inLanguage: 'ko',
  },
]);

export function HomeKo() {
  return (
    <>
      {/* `<Head>` bakes metadata into SSG output so first-paint SEO is correct,
          and the language switcher uses full-page reloads so the baked metadata
          always matches the visible route. */}
      <Head>
        <html lang={LANG} />
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:image" content="https://aitc.dev/og/homepage.png" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Apps In Toss Community" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content="https://aitc.dev/og/homepage.png" />
        <link rel="alternate" hrefLang="ko" href="https://aitc.dev/ko/" />
        <link rel="alternate" hrefLang="en" href="https://aitc.dev/en/" />
        <link rel="alternate" hrefLang="x-default" href="https://aitc.dev/" />
        <script type="application/ld+json">{JSON_LD}</script>
      </Head>
      <Header lang={LANG} />
      <main id="main">
        <Hero lang={LANG} />
        <ValueList lang={LANG} />
        <ProjectGrid lang={LANG} />
        <QuickStart lang={LANG} />
        <Resources lang={LANG} />
      </main>
      <Footer />
    </>
  );
}
