import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Radio } from './Radio';

describe('Radio', () => {
  it('renders with label', () => {
    render(<Radio name="g" label="Option A" />);
    expect(screen.getByRole('radio', { name: /option a/i })).toBeInTheDocument();
  });

  it('calls onChange when clicked', () => {
    const onChange = vi.fn();
    render(<Radio name="g" label="Option" onChange={onChange} value="1" />);
    fireEvent.click(screen.getByRole('radio'));
    expect(onChange).toHaveBeenCalled();
  });

  it('can be checked by default', () => {
    render(<Radio name="g" label="Selected" defaultChecked />);
    expect(screen.getByRole('radio')).toBeChecked();
  });
});
