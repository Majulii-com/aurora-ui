import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: { min: 0, max: 100, value: 50 },
};

export const WithLabelAndValue: Story = {
  args: {
    label: 'Volume',
    min: 0,
    max: 100,
    value: 70,
    showValue: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-64">
      <Slider label="Small" size="sm" value={50} showValue />
      <Slider label="Medium" size="md" value={50} showValue />
      <Slider label="Large" size="lg" value={50} showValue />
    </div>
  ),
};
