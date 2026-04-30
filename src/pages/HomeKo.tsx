import { Head } from 'vite-react-ssg';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ProjectGrid } from '../components/ProjectGrid';
import { QuickStart } from '../components/QuickStart';
import { Resources } from '../components/Resources';
import { ValueList } from '../components/ValueList';

const LANG = 'ko' as const;
const TITLE = 'apps-in-toss-community — 앱인토스 미니앱 개발을 가장 편하게';
const DESCRIPTION = '앱인토스 미니앱 개발을 가장 편하게.';
const CANONICAL = 'https://aitc.dev/ko/';

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
