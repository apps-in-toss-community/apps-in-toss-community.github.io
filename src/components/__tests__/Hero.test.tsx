import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Hero } from '../Hero';

describe('Hero', () => {
  it('renders the project title heading', () => {
    render(<Hero lang="ko" />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'apps-in-toss-community' }),
    ).toBeInTheDocument();
  });
});
