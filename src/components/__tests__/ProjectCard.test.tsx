import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Project } from '../../../content/projects';
import { ProjectCard } from '../ProjectCard';

const project: Project = {
  id: 'devtools',
  name: '@ait-co/devtools',
  repo: 'devtools',
  status: 'available',
  description: { ko: '테스트 설명', en: 'test description' },
};

describe('ProjectCard', () => {
  it('renders the project name as a link', () => {
    render(<ProjectCard project={project} lang="ko" />);
    const link = screen.getByRole('link', { name: /@ait-co\/devtools/ });
    expect(link).toHaveAttribute('href', 'https://github.com/apps-in-toss-community/devtools');
  });
});
