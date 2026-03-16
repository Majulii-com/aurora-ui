import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const WithName: Story = {
  args: { name: 'Jane Doe' },
};

export const WithImage: Story = {
  args: {
    src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    alt: 'Jane',
    name: 'Jane Doe',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-end">
      <Avatar name="Small" size="sm" />
      <Avatar name="Medium" size="md" />
      <Avatar name="Large" size="lg" />
    </div>
  ),
};

export const Fallback: Story = {
  args: { name: 'AB', fallback: 'AB' },
};
