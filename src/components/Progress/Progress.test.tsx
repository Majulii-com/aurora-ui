import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Progress } from './Progress';

describe('Progress', () => {
  it('renders progress bar', () => {
    const { container } = render(<Progress value={50} max={100} />);
    expect(container.querySelector('[style*="width"]')).toBeInTheDocument();
  });

  it('shows value label when showValue is true', () => {
    render(<Progress value={60} max={100} showValue />);
    expect(screen.getByText('60%')).toBeInTheDocument();
  });

  it('does not show value label by default', () => {
    render(<Progress value={60} max={100} />);
    expect(screen.queryByText('60%')).not.toBeInTheDocument();
  });
});
