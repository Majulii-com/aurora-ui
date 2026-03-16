import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: ['add', 'search', 'close', 'run', 'save', 'export', 'settings', 'menu', 'chevron-down', 'chevron-right', 'refresh', 'maximize', 'more'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: { name: 'search' },
};

export const All: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(['add', 'search', 'close', 'run', 'save', 'export', 'settings', 'menu', 'chevron-down', 'chevron-right', 'refresh', 'maximize', 'more'] as const).map((name) => (
        <div key={name} className="flex flex-col items-center gap-1">
          <Icon name={name} size={24} />
          <span className="text-xs text-gray-500">{name}</span>
        </div>
      ))}
    </div>
  ),
};
