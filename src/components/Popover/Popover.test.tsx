import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Popover } from './Popover';

describe('Popover', () => {
  it('shows content when trigger is clicked', () => {
    render(
      <Popover trigger={<button type="button">Open</button>}>
        Popover body
      </Popover>
    );
    expect(screen.queryByText('Popover body')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByText('Popover body')).toBeInTheDocument();
  });

  it('calls onOpenChange when opened', () => {
    const onOpenChange = vi.fn();
    render(
      <Popover trigger={<button type="button">Open</button>} onOpenChange={onOpenChange}>
        Content
      </Popover>
    );
    fireEvent.click(screen.getByText('Open'));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
