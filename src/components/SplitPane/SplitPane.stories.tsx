import type { Meta, StoryObj } from '@storybook/react';
import { SplitPane } from './SplitPane';

const meta: Meta<typeof SplitPane> = {
  title: 'Components/SplitPane',
  component: SplitPane,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['horizontal', 'vertical'] },
  },
};

export default meta;

type Story = StoryObj<typeof SplitPane>;

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
    defaultSize: 0.4,
    children: [
      <div key="a" className="p-4 bg-gray-100 dark:bg-gray-800 h-full">Left panel</div>,
      <div key="b" className="p-4 bg-gray-50 dark:bg-gray-700 h-full">Right panel</div>,
    ],
  },
};

export const Vertical: Story = {
  args: {
    direction: 'vertical',
    defaultSize: 0.3,
    children: [
      <div key="a" className="p-4 bg-gray-100 dark:bg-gray-800">Top panel</div>,
      <div key="b" className="p-4 bg-gray-50 dark:bg-gray-700 flex-1">Bottom panel</div>,
    ],
  },
};
