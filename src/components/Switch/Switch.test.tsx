import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders with label', () => {
    render(<Switch label="Enable" />);
    expect(screen.getByRole('switch', { name: /enable/i })).toBeInTheDocument();
  });

  it('calls onChange when toggled', () => {
    const onChange = vi.fn();
    render(<Switch label="Toggle" onChange={onChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalled();
  });

  it('can be checked by default', () => {
    render(<Switch label="On" defaultChecked />);
    expect(screen.getByRole('switch')).toBeChecked();
  });
});
