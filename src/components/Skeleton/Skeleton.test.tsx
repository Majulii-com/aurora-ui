import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders with aria-hidden', () => {
    const { container } = render(<Skeleton />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies variant classes', () => {
    const { container } = render(<Skeleton variant="circle" />);
    expect(container.firstChild).toHaveClass('rounded-full');
  });

  it('applies custom width and height via style', () => {
    const { container } = render(<Skeleton width="10rem" height="2rem" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe('10rem');
    expect(el.style.height).toBe('2rem');
  });
});
