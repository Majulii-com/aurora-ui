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

  it('applies columns class', () => {
    const { container } = render(<Grid columns={4}>Child</Grid>);
    expect(container.firstChild).toHaveClass('grid-cols-4');
  });
});
