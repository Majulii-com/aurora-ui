import type { Meta, StoryObj } from '@storybook/react';
import { GenSpinner } from './GenSpinner';

const meta: Meta<typeof GenSpinner> = {
  title: 'Components/GenSpinner',
  component: GenSpinner,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;

type Story = StoryObj<typeof GenSpinner>;

export const Default: Story = {
  args: { label: 'Loading…' },
};

export const NoLabel: Story = {
  args: {},
};

export const Small: Story = {
  args: { size: 'sm', label: 'Please wait' },
};
