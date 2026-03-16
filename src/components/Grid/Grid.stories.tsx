import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';
import { Box } from '../Box';

const meta: Meta<typeof Grid> = {
  title: 'Components/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'select', options: [1, 2, 3, 4, 6, 12] },
    gap: { control: 'select', options: [0, 2, 4, 6, 8] },
  },
};

export default meta;

type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  render: () => (
    <Grid columns={3} gap={4}>
      <Box className="p-4 bg-gray-100 dark:bg-gray-700 rounded">1</Box>
      <Box className="p-4 bg-gray-100 dark:bg-gray-700 rounded">2</Box>
      <Box className="p-4 bg-gray-100 dark:bg-gray-700 rounded">3</Box>
      <Box className="p-4 bg-gray-100 dark:bg-gray-700 rounded">4</Box>
      <Box className="p-4 bg-gray-100 dark:bg-gray-700 rounded">5</Box>
      <Box className="p-4 bg-gray-100 dark:bg-gray-700 rounded">6</Box>
    </Grid>
  ),
};

export const TwoColumns: Story = {
  render: () => (
    <Grid columns={2} gap={4}>
      <Box className="p-4 border border-gray-200 rounded">Left</Box>
      <Box className="p-4 border border-gray-200 rounded">Right</Box>
    </Grid>
  ),
};
