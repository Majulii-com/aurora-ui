import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Link } from './Link';

describe('Link', () => {
  it('renders anchor with href', () => {
    render(<Link href="/path">Click me</Link>);
    const link = screen.getByRole('link', { name: 'Click me' });
    expect(link).toHaveAttribute('href', '/path');
  });

  it('applies external attributes when external is true', () => {
    render(
      <Link href="https://example.com" external>
        External
      </Link>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
