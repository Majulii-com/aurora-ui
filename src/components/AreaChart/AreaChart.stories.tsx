import type { Meta, StoryObj } from '@storybook/react';
import { AreaChart } from './AreaChart';

const meta: Meta<typeof AreaChart> = {
  title: 'Components/AreaChart',
  component: AreaChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;

type Story = StoryObj<typeof AreaChart>;

const singleSeries = [
  { x: 'Mon', y: 2 },
  { x: 'Tue', y: 5 },
  { x: 'Wed', y: 3 },
  { x: 'Thu', y: 8 },
];

const multiSeries = [
  {
    name: 'Revenue',
    data: [
      { x: 'Q1', y: 40 },
      { x: 'Q2', y: 55 },
      { x: 'Q3', y: 48 },
    ],
  },
  {
    name: 'Cost',
    data: [
      { x: 'Q1', y: 22 },
      { x: 'Q2', y: 28 },
      { x: 'Q3', y: 25 },
    ],
  },
];

export const Default: Story = {
  args: { data: singleSeries, height: 220 },
};

export const Stacked: Story = {
  args: { series: multiSeries, stacked: true, height: 240 },
};

export const MultiSeries: Story = {
  args: { series: multiSeries, height: 240 },
};
