import type { Meta, StoryObj } from '@storybook/react';
import { Page } from './Page';

const meta: Meta<typeof Page> = {
  title: 'Components/Page',
  component: Page,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Page>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Page content</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Full-height page wrapper with content.</p>
      </div>
    ),
  },
};
