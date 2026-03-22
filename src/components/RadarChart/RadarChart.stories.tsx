import type { Meta, StoryObj } from '@storybook/react';
import { RadarChart } from './RadarChart';

const meta: Meta<typeof RadarChart> = {
  title: 'Components/RadarChart',
  component: RadarChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;

type Story = StoryObj<typeof RadarChart>;

const data = [
  { subject: 'Speed', A: 80, B: 50 },
  { subject: 'Reliability', A: 70, B: 90 },
  { subject: 'Comfort', A: 60, B: 70 },
  { subject: 'Safety', A: 85, B: 75 },
  { subject: 'Efficiency', A: 65, B: 80 },
];

export const Default: Story = {
  args: { data, subjectKey: 'subject', height: 300 },
};

export const SingleMetric: Story = {
  args: {
    data: [
      { subject: 'A', score: 72 },
      { subject: 'B', score: 88 },
      { subject: 'C', score: 65 },
    ],
    subjectKey: 'subject',
    metricKeys: ['score'],
    height: 280,
  },
};
