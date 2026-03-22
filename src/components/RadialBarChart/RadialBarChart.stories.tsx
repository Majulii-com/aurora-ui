import type { Meta, StoryObj } from '@storybook/react';
import { RadialBarChart } from './RadialBarChart';

const meta: Meta<typeof RadialBarChart> = {
  title: 'Components/RadialBarChart',
  component: RadialBarChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;

type Story = StoryObj<typeof RadialBarChart>;

const data = [
  { name: 'Desktop', value: 42 },
  { name: 'Mobile', value: 35 },
  { name: 'Tablet', value: 23 },
];

export const Default: Story = {
  args: { data, height: 280 },
};
