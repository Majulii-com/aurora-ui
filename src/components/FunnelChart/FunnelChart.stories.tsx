import type { Meta, StoryObj } from '@storybook/react';
import { FunnelChart } from './FunnelChart';

const meta: Meta<typeof FunnelChart> = {
  title: 'Components/FunnelChart',
  component: FunnelChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;

type Story = StoryObj<typeof FunnelChart>;

const funnelData = [
  { name: 'Visitors', value: 5000 },
  { name: 'Sign-ups', value: 1200 },
  { name: 'Trials', value: 600 },
  { name: 'Paid', value: 180 },
];

export const Default: Story = {
  args: { data: funnelData, height: 280 },
};
