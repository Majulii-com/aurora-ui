import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders a separator', () => {
    const { container } = render(<Divider />);
    const hr = container.querySelector('hr');
    expect(hr).toBeInTheDocument();
    expect(hr).toHaveAttribute('role', 'separator');
  });

  it('renders with label when provided', () => {
    render(<Divider label="or" />);
    expect(screen.getByText('or')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(<Divider className="my-8" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('my-8');
  });
});
