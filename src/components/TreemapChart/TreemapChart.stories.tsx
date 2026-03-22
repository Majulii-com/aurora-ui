import type { Meta, StoryObj } from '@storybook/react';
import { TreemapChart } from './TreemapChart';

const meta: Meta<typeof TreemapChart> = {
  title: 'Components/TreemapChart',
  component: TreemapChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;

type Story = StoryObj<typeof TreemapChart>;

const tree = {
  name: 'Portfolio',
  children: [
    { name: 'Equities', size: 420 },
    { name: 'Bonds', size: 280 },
    { name: 'Cash', size: 120 },
    { name: 'Alternatives', size: 180 },
  ],
};

export const Default: Story = {
  args: { data: tree, height: 280 },
};
