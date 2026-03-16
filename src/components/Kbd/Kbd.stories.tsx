import type { Meta, StoryObj } from '@storybook/react';
import { Kbd } from './Kbd';

const meta: Meta<typeof Kbd> = {
  title: 'Components/Kbd',
  component: Kbd,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Kbd>;

export const Default: Story = {
  args: { children: '⌘' },
};

export const Shortcut: Story = {
  render: () => (
    <p className="text-sm text-gray-600 dark:text-gray-400">
      Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open search.
    </p>
  ),
};
