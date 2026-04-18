import type { RouteRecord } from 'vite-react-ssg';
import { Layout } from './components/Layout';
import { HomeEn } from './pages/HomeEn';
import { HomeKo } from './pages/HomeKo';

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomeKo /> },
      { path: 'ko/', element: <HomeKo /> },
      { path: 'en/', element: <HomeEn /> },
    ],
  },
];
