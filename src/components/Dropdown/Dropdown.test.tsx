import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown, DropdownItem } from './Dropdown';
import { Button } from '../Button';

describe('Dropdown', () => {
  it('renders trigger', () => {
    render(
      <Dropdown trigger={<Button>Menu</Button>}>
        <DropdownItem>Item 1</DropdownItem>
      </Dropdown>
    );
    expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
  });

  it('shows menu when trigger is clicked', () => {
    render(
      <Dropdown trigger={<Button>Open</Button>}>
        <DropdownItem>Action</DropdownItem>
      </Dropdown>
    );
    fireEvent.click(screen.getByRole('button', { name: /open/i }));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /action/i })).toBeInTheDocument();
  });

  it('calls onClick on DropdownItem when clicked', () => {
    const onClick = vi.fn();
    render(
      <Dropdown trigger={<Button>Open</Button>}>
        <DropdownItem onClick={onClick}>Click me</DropdownItem>
      </Dropdown>
    );
    fireEvent.click(screen.getByRole('button', { name: /open/i }));
    fireEvent.click(screen.getByRole('menuitem', { name: /click me/i }));
    expect(onClick).toHaveBeenCalled();
  });
});
