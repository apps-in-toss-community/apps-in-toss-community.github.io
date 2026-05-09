import { Head } from 'vite-react-ssg';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ProjectGrid } from '../components/ProjectGrid';
import { QuickStart } from '../components/QuickStart';
import { Resources } from '../components/Resources';
import { ValueList } from '../components/ValueList';

const LANG = 'en' as const;
const TITLE = 'apps-in-toss-community — The most convenient way to build Apps in Toss mini-apps';
const DESCRIPTION = 'The most convenient way to build Apps in Toss mini-apps.';
const CANONICAL = 'https://aitc.dev/en/';

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
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content="https://aitc.dev/og/homepage.png" />
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
