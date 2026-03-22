import type { Meta, StoryObj } from '@storybook/react';
import { ScatterChart } from './ScatterChart';

const meta: Meta<typeof ScatterChart> = {
  title: 'Components/ScatterChart',
  component: ScatterChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;

type Story = StoryObj<typeof ScatterChart>;

const points = [
  { x: 12, y: 24, label: 'A', z: 120 },
  { x: 28, y: 18, label: 'B', z: 200 },
  { x: 35, y: 40, label: 'C', z: 80 },
  { x: 48, y: 12, label: 'D', z: 160 },
];

export const Default: Story = {
  args: { data: points, height: 280 },
};
