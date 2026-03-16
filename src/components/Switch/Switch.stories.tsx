import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: { label: 'Enable notifications' },
};

export const Checked: Story = {
  args: { label: 'Dark mode', defaultChecked: true },
};

export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true },
};
