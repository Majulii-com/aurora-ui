import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['default', 'outline', 'filled'] },
    error: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

export const Default: Story = {
  args: { options, placeholder: 'Select...' },
};

export const WithLabel: Story = {
  args: { label: 'Country', options, placeholder: 'Choose country' },
};

export const WithError: Story = {
  args: { label: 'Status', options, error: true, errorMessage: 'Please select an option' },
};
