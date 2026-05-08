import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProjectGrid } from '../ProjectGrid';

describe('ProjectGrid', () => {
  it('renders the Available Now section heading', () => {
    render(<ProjectGrid lang="en" />);
    expect(screen.getByRole('heading', { name: 'Available Now' })).toBeInTheDocument();
  });
});
