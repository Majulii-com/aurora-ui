import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    error: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: { label: 'Option A', name: 'demo' },
};

export const Checked: Story = {
  args: { label: 'Selected', name: 'demo', defaultChecked: true },
};

export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Radio name="choice" label="First" value="1" />
      <Radio name="choice" label="Second" value="2" defaultChecked />
      <Radio name="choice" label="Third" value="3" />
    </div>
  ),
};
