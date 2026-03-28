import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'outline', 'danger', 'success'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    ripple: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: 'Button', variant: 'primary' },
};

export const Secondary: Story = {
  args: { children: 'Secondary', variant: 'secondary' },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Loading: Story = {
  args: { children: 'Loading', isLoading: true },
};

export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true },
};

/** Press ripple — same interaction model as [Magic UI Ripple Button](https://magicui.design/docs/components/ripple-button) */
export const WithRipple: Story = {
  args: { children: 'Click me', variant: 'primary', ripple: true },
};

export const RippleOutline: Story = {
  args: { children: 'Secondary ripple', variant: 'outline', ripple: true },
};
