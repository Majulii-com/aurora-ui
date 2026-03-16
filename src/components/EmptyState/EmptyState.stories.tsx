import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { Button } from '../Button';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: 'No data',
    description: 'Nothing to show here yet.',
  },
};

export const WithAction: Story = {
  args: {
    title: 'No results',
    description: 'Try adjusting your search or filters.',
    action: <Button size="sm">Clear filters</Button>,
  },
};

export const Minimal: Story = {
  args: { title: 'Empty' },
};
