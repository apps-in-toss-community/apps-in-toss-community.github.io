import { Head } from 'vite-react-ssg';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ValueList } from '../components/ValueList';
import { ProjectGrid } from '../components/ProjectGrid';
import { QuickStart } from '../components/QuickStart';
import { Resources } from '../components/Resources';
import { Footer } from '../components/Footer';

const LANG = 'en' as const;
const TITLE = 'apps-in-toss-community — The most convenient way to build Apps in Toss mini-apps';
const DESCRIPTION = 'The most convenient way to build Apps in Toss mini-apps.';
const CANONICAL = 'https://apps-in-toss-community.github.io/en/';

export function HomeEn() {
  return (
    <>
      {/* <Head> bakes metadata into SSG output at build time.
          useEffect mutations are intentionally removed: the language-switcher
          links (<a href="/ko/"> etc.) cause full page reloads, so each
          pre-rendered page already has the correct <title>, <html lang>,
          and <link rel="canonical"> without any client-side patching. */}
      <Head>
        <html lang={LANG} />
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={CANONICAL} />
      </Head>
      <Header lang={LANG} />
      <main>
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
