import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './StatCard';

const meta: Meta<typeof StatCard> = {
  title: 'Components/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  argTypes: {
    trend: { control: 'select', options: ['up', 'down', 'neutral'] },
  },
};

export default meta;

type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
  args: { title: 'Total Revenue', value: '$42,567' },
};

export const WithTrend: Story = {
  args: {
    title: 'Active users',
    value: '12,345',
    trend: 'up',
    trendLabel: '+12% vs last month',
  },
};

export const Dashboard: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Revenue" value="$42.5k" trend="up" trendLabel="+8.2%" />
      <StatCard title="Orders" value="1,234" trend="down" trendLabel="-2.4%" />
      <StatCard title="Conversion" value="3.2%" trend="up" trendLabel="+0.5%" />
      <StatCard title="Avg. order" value="$89" trend="neutral" />
    </div>
  ),
};
