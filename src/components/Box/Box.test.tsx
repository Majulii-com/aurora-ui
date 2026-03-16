import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Box } from './Box';

describe('Box', () => {
  it('renders children', () => {
    render(<Box>Box content</Box>);
    expect(screen.getByText('Box content')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(<Box className="custom-class">Content</Box>);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
