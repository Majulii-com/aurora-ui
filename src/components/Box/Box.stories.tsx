import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';

const meta: Meta<typeof Box> = {
  title: 'Components/Box',
  component: Box,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: { children: 'Box content', className: 'p-4 border border-gray-200 rounded-lg' },
};

export const WithCustomStyles: Story = {
  render: () => (
    <Box className="p-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
      <p className="text-primary-800 dark:text-primary-200">Styled box content.</p>
    </Box>
  ),
};
