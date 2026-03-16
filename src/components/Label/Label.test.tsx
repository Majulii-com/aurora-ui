import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from './Label';

describe('Label', () => {
  it('renders children', () => {
    render(<Label>Field name</Label>);
    expect(screen.getByText('Field name')).toBeInTheDocument();
  });

  it('associates with input via htmlFor', () => {
    render(
      <>
        <Label htmlFor="input-id">Label</Label>
        <input id="input-id" />
      </>
    );
    expect(screen.getByLabelText('Label')).toHaveAttribute('id', 'input-id');
  });

  it('applies required indicator when required is true', () => {
    const { container } = render(<Label required>Required</Label>);
    const label = container.querySelector('label');
    expect(label?.className).toMatch(/after:/);
  });
});
