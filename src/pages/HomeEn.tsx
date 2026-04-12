import { useEffect } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ValueList } from '../components/ValueList';
import { ProjectGrid } from '../components/ProjectGrid';
import { QuickStart } from '../components/QuickStart';
import { Resources } from '../components/Resources';
import { Footer } from '../components/Footer';

const LANG = 'en' as const;
const CANONICAL = 'https://apps-in-toss-community.github.io/en/';

export function HomeEn() {
  useEffect(() => {
    document.documentElement.setAttribute('lang', LANG);

    // Set canonical link
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', CANONICAL);

    // Set page title and description
    document.title = 'apps-in-toss-community — The most convenient way to build Apps in Toss mini-apps';
    const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'The most convenient way to build Apps in Toss mini-apps. Run and test your mini-app in any browser without the Toss app.');
    }
  }, []);

  return (
    <>
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
