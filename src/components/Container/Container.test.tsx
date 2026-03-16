import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Container } from './Container';

describe('Container', () => {
  it('renders children', () => {
    render(<Container>Container content</Container>);
    expect(screen.getByText('Container content')).toBeInTheDocument();
  });

  it('applies maxWidth class', () => {
    const { container } = render(<Container maxWidth="lg">Content</Container>);
    expect(container.firstChild).toHaveClass('max-w-screen-lg');
  });
});
