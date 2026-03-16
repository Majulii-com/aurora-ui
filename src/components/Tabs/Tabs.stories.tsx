import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['line', 'pills', 'enclosed'] },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

function TabsDemo({ variant = 'line' as const }: { variant?: 'line' | 'pills' | 'enclosed' }) {
  const [value, setValue] = useState('1');
  return (
    <Tabs value={value} onChange={setValue} variant={variant}>
      <TabList>
        <Tab value="1">Tab 1</Tab>
        <Tab value="2">Tab 2</Tab>
        <Tab value="3">Tab 3</Tab>
      </TabList>
      <TabPanel value="1">Content for tab 1.</TabPanel>
      <TabPanel value="2">Content for tab 2.</TabPanel>
      <TabPanel value="3">Content for tab 3.</TabPanel>
    </Tabs>
  );
}

export const Default: Story = {
  render: () => <TabsDemo />,
};

export const Pills: Story = {
  render: () => <TabsDemo variant="pills" />,
};

export const Enclosed: Story = {
  render: () => <TabsDemo variant="enclosed" />,
};
