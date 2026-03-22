import type { Meta, StoryObj } from '@storybook/react';
import { ComposedChart } from './ComposedChart';

const meta: Meta<typeof ComposedChart> = {
  title: 'Components/ComposedChart',
  component: ComposedChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;

type Story = StoryObj<typeof ComposedChart>;

const data = [
  { month: 'Jan', revenue: 40, profit: 12 },
  { month: 'Feb', revenue: 55, profit: 18 },
  { month: 'Mar', revenue: 48, profit: 15 },
  { month: 'Apr', revenue: 62, profit: 22 },
];

export const BarAndLine: Story = {
  args: {
    indexKey: 'month',
    data,
    height: 260,
    series: [
      { type: 'bar', dataKey: 'revenue', name: 'Revenue' },
      { type: 'line', dataKey: 'profit', name: 'Profit' },
    ],
  },
};

export const WithBrush: Story = {
  args: {
    indexKey: 'month',
    data,
    height: 280,
    brush: true,
    series: [
      { type: 'bar', dataKey: 'revenue', name: 'Revenue' },
      { type: 'line', dataKey: 'profit', name: 'Profit' },
    ],
  },
};
