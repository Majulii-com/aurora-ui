import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TreeTable } from './TreeTable';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'type', label: 'Type' },
];

const treeRows = [
  { id: '1', name: 'Engineering', type: 'Department', parentId: null },
  { id: '2', name: 'Platform', type: 'Team', parentId: '1' },
  { id: '3', name: 'API', type: 'Squad', parentId: '2' },
  { id: '4', name: 'Design', type: 'Department', parentId: null },
  { id: '5', name: 'Brand', type: 'Team', parentId: '4' },
];

const meta: Meta<typeof TreeTable> = {
  title: 'Components/TreeTable',
  component: TreeTable,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;

type Story = StoryObj<typeof TreeTable>;

export const Default: Story = {
  args: {
    columns,
    rows: treeRows,
    treeColumnKey: 'name',
    defaultExpandAll: true,
  },
};

export const CollapsedByDefault: Story = {
  args: {
    columns,
    rows: treeRows,
    treeColumnKey: 'name',
    defaultExpandAll: false,
  },
};

export const WithFilter: Story = {
  render: function FilteredTree() {
    const [filter, setFilter] = useState('');
    return (
      <div className="w-full max-w-3xl">
        <TreeTable
          columns={columns}
          rows={treeRows}
          treeColumnKey="name"
          defaultExpandAll
          filter={filter}
          onFilterChange={setFilter}
          filterPlaceholder="Filter tree…"
        />
      </div>
    );
  },
};
