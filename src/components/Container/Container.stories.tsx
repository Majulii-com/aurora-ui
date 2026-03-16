import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'Components/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    maxWidth: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'] },
  },
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    children: 'Centered container with max-width and padding.',
    className: 'bg-gray-100 dark:bg-gray-800 rounded py-4 text-center',
  },
};

export const Small: Story = {
  args: {
    maxWidth: 'sm',
    children: 'Narrow container (sm).',
    className: 'bg-gray-100 dark:bg-gray-800 rounded py-4 text-center',
  },
};
