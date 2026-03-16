import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TreeView } from './TreeView';

const items = [
  { id: '1', label: 'Parent', children: [{ id: '1-1', label: 'Child' }] },
  { id: '2', label: 'Sibling' },
];

describe('TreeView', () => {
  it('renders root items', () => {
    render(<TreeView items={items} />);
    expect(screen.getByText('Parent')).toBeInTheDocument();
    expect(screen.getByText('Sibling')).toBeInTheDocument();
  });

  it('expands and shows children on toggle', () => {
    render(<TreeView items={items} />);
    expect(screen.queryByText('Child')).not.toBeInTheDocument();
    const expandBtns = screen.getAllByLabelText(/expand/i);
    fireEvent.click(expandBtns[0]);
    expect(screen.getByText('Child')).toBeInTheDocument();
  });

  it('calls onSelect when item is clicked', () => {
    const onSelect = vi.fn();
    render(<TreeView items={items} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Sibling'));
    expect(onSelect).toHaveBeenCalledWith('2', expect.objectContaining({ id: '2', label: 'Sibling' }));
  });
});
