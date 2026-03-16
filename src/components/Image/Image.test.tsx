import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Image } from './Image';

describe('Image', () => {
  it('renders img with src and alt', () => {
    render(<Image src="https://example.com/photo.jpg" alt="Example" />);
    const img = screen.getByRole('img', { name: 'Example' });
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg');
  });

  it('shows fallback when image errors', () => {
    render(
      <Image
        src="https://invalid/fail.jpg"
        alt="Broken"
        fallback={<span>Fallback content</span>}
      />
    );
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByText('Fallback content')).toBeInTheDocument();
  });
});
