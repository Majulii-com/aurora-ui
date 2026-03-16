import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Kbd } from './Kbd';

describe('Kbd', () => {
  it('renders children', () => {
    render(<Kbd>Enter</Kbd>);
    expect(screen.getByText('Enter')).toBeInTheDocument();
  });

  it('renders as kbd element', () => {
    const { container } = render(<Kbd>⌘</Kbd>);
    expect(container.querySelector('kbd')).toBeInTheDocument();
  });
});
