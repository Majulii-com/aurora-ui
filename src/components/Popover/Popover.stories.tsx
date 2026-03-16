import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'select', options: ['bottom-start', 'bottom', 'top', 'right', 'left'] },
  },
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    trigger: <Button size="sm">Open popover</Button>,
    children: 'Popover content here.',
  },
};

export const RichContent: Story = {
  render: () => (
    <Popover trigger={<Button size="sm" variant="outline">Code assist</Button>}>
      <div className="space-y-3">
        <p className="font-medium">Suggestions</p>
        <label className="flex items-center gap-2">
          <Checkbox /> Enable auto-complete
        </label>
        <Button size="sm">Send feedback</Button>
      </div>
    </Popover>
  ),
};
