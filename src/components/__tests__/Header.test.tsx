import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Header } from '../Header';

describe('Header', () => {
  it('points the Korean switch link at /ko/ when current lang is en', () => {
    render(<Header lang="en" />);
    expect(screen.getByRole('link', { name: '한국어' })).toHaveAttribute('href', '/ko/');
  });
});
