import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { Icon } from '../Icon';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['ghost', 'outline', 'solid'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    'aria-label': 'Add',
    children: <Icon name="add" size={20} />,
  },
};

export const Toolbar: Story = {
  render: () => (
    <div className="flex gap-2">
      <IconButton aria-label="Run" children={<Icon name="run" size={18} />} />
      <IconButton aria-label="Save" children={<Icon name="save" size={18} />} />
      <IconButton aria-label="Export" children={<Icon name="export" size={18} />} />
      <IconButton aria-label="Settings" children={<Icon name="settings" size={18} />} />
    </div>
  ),
};
