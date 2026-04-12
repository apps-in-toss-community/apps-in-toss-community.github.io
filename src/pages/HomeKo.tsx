import { useEffect } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ValueList } from '../components/ValueList';
import { ProjectGrid } from '../components/ProjectGrid';
import { QuickStart } from '../components/QuickStart';
import { Resources } from '../components/Resources';
import { Footer } from '../components/Footer';

const LANG = 'ko' as const;
const CANONICAL = 'https://apps-in-toss-community.github.io/ko/';

export function HomeKo() {
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
    document.title = 'apps-in-toss-community — 앱인토스 미니앱 개발을 가장 편하게';
    const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', '앱인토스 미니앱 개발을 가장 편하게. 토스 앱 없이 브라우저에서 미니앱을 구동하고 테스트하세요.');
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
