import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Stack } from './Stack';

describe('Stack', () => {
  it('renders children', () => {
    render(
      <Stack>
        <span>One</span>
        <span>Two</span>
      </Stack>
    );
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
  });

  it('applies flex direction', () => {
    const { container } = render(<Stack direction="row">Child</Stack>);
    expect(container.firstChild).toHaveClass('flex-row');
  });
});
