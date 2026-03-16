import type { Meta, StoryObj } from '@storybook/react';
import { LineChart } from './LineChart';

const sampleData = [
  { x: 'Jan', y: 30 },
  { x: 'Feb', y: 45 },
  { x: 'Mar', y: 38 },
  { x: 'Apr', y: 55 },
  { x: 'May', y: 48 },
];

const meta: Meta<typeof LineChart> = {
  title: 'Components/LineChart',
  component: LineChart,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LineChart>;

export const Default: Story = {
  args: { data: sampleData },
};

export const MultipleSeries: Story = {
  args: {
    series: [
      { name: 'Revenue', data: sampleData, color: '#3b82f6' },
      {
        name: 'Costs',
        data: [
          { x: 'Jan', y: 20 },
          { x: 'Feb', y: 28 },
          { x: 'Mar', y: 25 },
          { x: 'Apr', y: 35 },
          { x: 'May', y: 30 },
        ],
        color: '#ef4444',
      },
    ],
  },
};
