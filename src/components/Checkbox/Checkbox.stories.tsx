import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    indeterminate: { control: 'boolean' },
    error: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { label: 'Accept terms' },
};

export const Checked: Story = {
  args: { label: 'Subscribe', defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { label: 'Select all', indeterminate: true },
};

export const Disabled: Story = {
  args: { label: 'Disabled option', disabled: true },
};
