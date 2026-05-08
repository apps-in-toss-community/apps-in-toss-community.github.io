import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Header } from '../Header';

describe('Header', () => {
  it('renders the Korean language switch link', () => {
    render(<Header lang="ko" />);
    expect(screen.getByRole('link', { name: '한국어' })).toHaveAttribute('href', '/ko/');
  });
});
