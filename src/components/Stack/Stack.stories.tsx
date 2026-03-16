import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack';
import { Box } from '../Box';

const meta: Meta<typeof Stack> = {
  title: 'Components/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['column', 'row'] },
    gap: { control: 'select', options: [0, 1, 2, 3, 4, 6, 8] },
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch'] },
    justify: { control: 'select', options: ['start', 'center', 'end', 'between', 'around'] },
  },
};

export default meta;

type Story = StoryObj<typeof Stack>;

const Placeholder = ({ label }: { label: string }) => (
  <Box className="p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm">{label}</Box>
);

export const Vertical: Story = {
  args: { gap: 2, children: [<Placeholder key="1" label="One" />, <Placeholder key="2" label="Two" />, <Placeholder key="3" label="Three" />] },
};

export const Horizontal: Story = {
  args: {
    direction: 'row',
    gap: 2,
    children: [<Placeholder key="1" label="A" />, <Placeholder key="2" label="B" />, <Placeholder key="3" label="C" />],
  },
};

export const Centered: Story = {
  render: () => (
    <Stack gap={3} align="center" justify="center" className="min-h-[120px] border border-dashed border-gray-300 rounded">
      <Placeholder label="Centered" />
    </Stack>
  ),
};
