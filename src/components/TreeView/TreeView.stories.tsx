import type { Meta, StoryObj } from '@storybook/react';
import { TreeView } from './TreeView';
import type { TreeNodeData } from './TreeView.types';

const sampleItems: TreeNodeData[] = [
  {
    id: '1',
    label: 'cpd-db-development',
    children: [
      {
        id: '1-1',
        label: 'Schema 2',
        children: [
          { id: '1-1-1', label: 'Tables' },
          { id: '1-1-2', label: 'Views' },
        ],
      },
      { id: '1-2', label: 'CDP' },
      { id: '1-3', label: 'information_schema' },
      { id: '1-4', label: 'pg_catalog' },
    ],
  },
  { id: '2', label: 'Queries', badge: '0' },
];

const meta: Meta<typeof TreeView> = {
  title: 'Components/TreeView',
  component: TreeView,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TreeView>;

export const Default: Story = {
  args: { items: sampleItems },
};

export const WithSelection: Story = {
  args: {
    items: sampleItems,
    selectedId: '1-2',
  },
};
