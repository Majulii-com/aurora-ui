import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Drawer } from './Drawer';

describe('Drawer', () => {
  it('renders nothing when isOpen is false', () => {
    render(
      <Drawer isOpen={false} onClose={() => {}} title="Test">
        Content
      </Drawer>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders dialog when isOpen is true', () => {
    render(
      <Drawer isOpen onClose={() => {}} title="Test Drawer">
        Drawer content
      </Drawer>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Drawer')).toBeInTheDocument();
    expect(screen.getByText('Drawer content')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <Drawer isOpen onClose={onClose} title="Test" showCloseButton>
        Content
      </Drawer>
    );
    fireEvent.click(screen.getByLabelText(/close drawer/i));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
