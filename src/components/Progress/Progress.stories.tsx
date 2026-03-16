import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'success', 'warning', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: { value: 60, max: 100 },
};

export const WithValueLabel: Story = {
  args: { value: 75, max: 100, showValue: true },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Progress value={40} max={100} variant="primary" showValue />
      <Progress value={70} max={100} variant="success" showValue />
      <Progress value={55} max={100} variant="warning" showValue />
      <Progress value={90} max={100} variant="danger" showValue />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-64">
      <Progress value={50} size="sm" showValue />
      <Progress value={50} size="md" showValue />
      <Progress value={50} size="lg" showValue />
    </div>
  ),
};
