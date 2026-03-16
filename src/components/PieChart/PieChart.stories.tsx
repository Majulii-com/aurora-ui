import type { Meta, StoryObj } from '@storybook/react';
import { PieChart } from './PieChart';

const sampleData = [
  { label: 'Product A', value: 35 },
  { label: 'Product B', value: 45 },
  { label: 'Product C', value: 20 },
];

const meta: Meta<typeof PieChart> = {
  title: 'Components/PieChart',
  component: PieChart,
  tags: ['autodocs'],
  argTypes: {
    donut: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof PieChart>;

export const Default: Story = {
  args: { data: sampleData },
};

export const Donut: Story = {
  args: { data: sampleData, donut: true },
};

export const NoLabels: Story = {
  args: { data: sampleData, showLabels: false },
};
