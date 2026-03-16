import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown, DropdownItem } from './Dropdown';
import { Button } from '../Button';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'select', options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'] },
  },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: () => (
    <Dropdown trigger={<Button size="sm" variant="outline">Open menu</Button>}>
      <DropdownItem>Edit</DropdownItem>
      <DropdownItem>Duplicate</DropdownItem>
      <DropdownItem destructive>Delete</DropdownItem>
    </Dropdown>
  ),
};

export const WithPlacement: Story = {
  render: () => (
    <div className="flex justify-end p-8">
      <Dropdown
        placement="bottom-end"
        trigger={<Button size="sm">Menu</Button>}
      >
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
      </Dropdown>
    </div>
  ),
};
