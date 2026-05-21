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

  it('renders **bold** and `code` markers without leaking delimiters', () => {
    const marked: Project = {
      ...project,
      description: {
        ko: '`navigator.clipboard`로 **토스 앱 없이** 동작',
        en: 'works **without the Toss app** via `navigator.clipboard`',
      },
    };
    const { container } = render(<ProjectCard project={marked} lang="ko" />);
    expect(container.querySelector('strong')?.textContent).toBe('토스 앱 없이');
    expect(container.querySelector('code')?.textContent).toBe('navigator.clipboard');
    expect(container.textContent).not.toContain('**');
    expect(container.textContent).not.toContain('`');
  });
});
