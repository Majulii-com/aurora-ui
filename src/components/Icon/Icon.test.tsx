import { describe, it, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders Lucide icon by kebab-case name', async () => {
    const { container } = render(<Icon name="search" />);
    await waitFor(() => {
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  it('renders legacy alias add → plus', async () => {
    const { container } = render(<Icon name="add" />);
    await waitFor(() => {
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  it('applies size', async () => {
    const { container } = render(<Icon name="home" size={32} />);
    await waitFor(() => {
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width', '32');
    });
  });

  it('returns null for unknown name', () => {
    const { container } = render(<Icon name="totally-nonexistent-icon-xyz" />);
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });
});
