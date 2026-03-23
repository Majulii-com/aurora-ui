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
  render: () => (
    <IconButton aria-label="Add">
      <Icon name="add" size={20} />
    </IconButton>
  ),
};

export const Toolbar: Story = {
  render: () => (
    <div className="flex gap-2">
      <IconButton aria-label="Run">
        <Icon name="run" size={18} />
      </IconButton>
      <IconButton aria-label="Save">
        <Icon name="save" size={18} />
      </IconButton>
      <IconButton aria-label="Export">
        <Icon name="export" size={18} />
      </IconButton>
      <IconButton aria-label="Settings">
        <Icon name="settings" size={18} />
      </IconButton>
    </div>
  ),
};
