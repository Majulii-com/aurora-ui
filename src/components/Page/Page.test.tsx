import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Page } from './Page';

describe('Page', () => {
  it('renders children', () => {
    render(<Page>Page content</Page>);
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  it('applies min-h-screen class', () => {
    const { container } = render(<Page>Content</Page>);
    expect(container.firstChild).toHaveClass('min-h-screen', 'w-full');
  });
});
