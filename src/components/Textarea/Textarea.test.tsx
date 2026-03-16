import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders with placeholder', () => {
    render(<Textarea placeholder="Write here" />);
    expect(screen.getByPlaceholderText('Write here')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Textarea label="Description" placeholder="..." />);
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    const onChange = vi.fn();
    render(<Textarea placeholder="Test" onChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText('Test'), { target: { value: 'text' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('shows error message when error is true', () => {
    render(<Textarea label="Bio" error errorMessage="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });
});
