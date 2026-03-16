import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders initials from name', () => {
    render(<Avatar name="Jane Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders with aria-label', () => {
    render(<Avatar name="John" />);
    expect(screen.getByRole('img', { name: /john/i })).toBeInTheDocument();
  });

  it('renders image when src is provided', () => {
    const { container } = render(<Avatar src="https://example.com/avatar.jpg" alt="User" name="User" />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });
});
