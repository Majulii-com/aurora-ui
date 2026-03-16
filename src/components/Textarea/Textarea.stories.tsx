import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['default', 'outline', 'filled'] },
    error: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: { placeholder: 'Enter your message...', rows: 4 },
};

export const WithLabel: Story = {
  args: { label: 'Description', placeholder: 'Write something...', rows: 3 },
};

export const WithError: Story = {
  args: { label: 'Bio', error: true, errorMessage: 'This field is required', placeholder: '...' },
};
