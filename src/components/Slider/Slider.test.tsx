import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Slider } from './Slider';

describe('Slider', () => {
  const noop = () => {};

  it('renders range input', () => {
    render(<Slider min={0} max={100} value={50} onChange={noop} />);
    const input = screen.getByRole('slider');
    expect(input).toHaveAttribute('type', 'range');
    expect(input).toHaveAttribute('min', '0');
    expect(input).toHaveAttribute('max', '100');
    expect(input).toHaveValue('50');
  });

  it('renders label when provided', () => {
    render(<Slider label="Volume" id="vol" value={50} onChange={noop} />);
    expect(screen.getByText('Volume')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toHaveAttribute('id', 'vol');
  });

  it('shows value when showValue is true', () => {
    render(<Slider value={75} min={0} max={100} showValue onChange={noop} />);
    expect(screen.getByText('75')).toBeInTheDocument();
  });
});
