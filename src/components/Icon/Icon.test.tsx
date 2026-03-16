import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders by name', () => {
    const { container } = render(<Icon name="search" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies size', () => {
    const { container } = render(<Icon name="add" size={32} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '32');
  });
});
