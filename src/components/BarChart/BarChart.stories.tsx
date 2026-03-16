import type { Meta, StoryObj } from '@storybook/react';
import { BarChart } from './BarChart';

const sampleData = [
  { label: 'Jan', value: 40 },
  { label: 'Feb', value: 65 },
  { label: 'Mar', value: 52 },
  { label: 'Apr', value: 78 },
  { label: 'May', value: 61 },
];

const meta: Meta<typeof BarChart> = {
  title: 'Components/BarChart',
  component: BarChart,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['vertical', 'horizontal'] },
  },
};

export default meta;

type Story = StoryObj<typeof BarChart>;

export const Default: Story = {
  args: { data: sampleData },
};

export const Horizontal: Story = {
  args: { data: sampleData, direction: 'horizontal' },
};

export const NoValues: Story = {
  args: { data: sampleData, showValues: false },
};
