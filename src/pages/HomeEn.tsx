import { Head } from 'vite-react-ssg';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ProjectGrid } from '../components/ProjectGrid';
import { QuickStart } from '../components/QuickStart';
import { Resources } from '../components/Resources';
import { ValueList } from '../components/ValueList';

const LANG = 'en' as const;
const TITLE = 'Apps In Toss Community — mini-app dev tools';
const DESCRIPTION =
  'Community open-source tools for Apps in Toss mini-app development — DevTools browser emulator, SDK reference app, polyfill, docs, and more. Build and test without a device.';
const CANONICAL = 'https://aitc.dev/en/';

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
    url: 'https://aitc.dev/en/',
    inLanguage: 'en',
  },
]);

export function HomeEn() {
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
        <meta property="og:locale" content="en_US" />
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
