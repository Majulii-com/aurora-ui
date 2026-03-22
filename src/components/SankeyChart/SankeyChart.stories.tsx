import type { Meta, StoryObj } from '@storybook/react';
import { SankeyChart } from './SankeyChart';

const meta: Meta<typeof SankeyChart> = {
  title: 'Components/SankeyChart',
  component: SankeyChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;

type Story = StoryObj<typeof SankeyChart>;

export const Default: Story = {
  args: {
    height: 320,
    nodes: [{ name: 'Source A' }, { name: 'Source B' }, { name: 'Merge' }, { name: 'Output' }],
    links: [
      { source: 0, target: 2, value: 30 },
      { source: 1, target: 2, value: 20 },
      { source: 2, target: 3, value: 50 },
    ],
  },
};
