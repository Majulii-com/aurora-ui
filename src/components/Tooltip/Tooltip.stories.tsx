import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'Tooltip text',
    children: <Button size="sm">Hover me</Button>,
  },
};

export const Placements: Story = {
  render: () => (
    <div className="flex gap-4 justify-center items-center p-16">
      <Tooltip content="Top" placement="top">
        <Button size="sm">Top</Button>
      </Tooltip>
      <Tooltip content="Bottom" placement="bottom">
        <Button size="sm">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left" placement="left">
        <Button size="sm">Left</Button>
      </Tooltip>
      <Tooltip content="Right" placement="right">
        <Button size="sm">Right</Button>
      </Tooltip>
    </div>
  ),
};
