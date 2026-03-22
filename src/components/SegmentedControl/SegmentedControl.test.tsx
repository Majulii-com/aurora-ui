import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SegmentedControl } from './SegmentedControl';

describe('SegmentedControl', () => {
  it('calls onChange when a segment is selected', () => {
    const onChange = vi.fn();
    render(
      <SegmentedControl
        aria-label="Mode"
        options={[
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' },
        ]}
        value="one"
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByRole('tab', { name: 'Two' }));
    expect(onChange).toHaveBeenCalledWith('two');
  });
});
