import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['text', 'rect', 'circle'] },
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {},
};

export const Text: Story = {
  args: { variant: 'text', width: '100%' },
};

export const Circle: Story = {
  args: { variant: 'circle' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-48">
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="rect" width="100%" height={80} />
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" />
        <Skeleton variant="text" width="60%" />
      </div>
    </div>
  ),
};
