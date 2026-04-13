import type { RouteRecord } from 'vite-react-ssg';
import { Layout } from './components/Layout';
import { HomeKo } from './pages/HomeKo';
import { HomeEn } from './pages/HomeEn';

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
