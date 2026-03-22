import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Grid } from './Grid';

describe('Grid', () => {
  it('renders children', () => {
    render(
      <Grid>
        <div>Cell 1</div>
        <div>Cell 2</div>
      </Grid>
    );
    expect(screen.getByText('Cell 1')).toBeInTheDocument();
    expect(screen.getByText('Cell 2')).toBeInTheDocument();
  });

  it('applies responsive column classes', () => {
    const { container } = render(<Grid columns={4}>Child</Grid>);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('grid');
    expect(el.className).toMatch(/grid-cols-1/);
    expect(el.className).toMatch(/lg:grid-cols-4/);
  });
});
