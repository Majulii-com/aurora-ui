import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GenDataTable } from './GenDataTable';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status', sortable: true, filterable: true },
];

const rows = [
  { name: 'Alice Chen', role: 'Admin', status: 'Active' },
  { name: 'Bob Smith', role: 'User', status: 'Active' },
  { name: 'Carol Diaz', role: 'User', status: 'Away' },
];

const meta: Meta<typeof GenDataTable> = {
  title: 'Components/GenDataTable',
  component: GenDataTable,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;

type Story = StoryObj<typeof GenDataTable>;

export const Default: Story = {
  args: { columns, rows },
};

export const WithGlobalFilter: Story = {
  render: function WithFilter() {
    const [filter, setFilter] = useState('');
    return (
      <div className="w-full max-w-3xl">
        <GenDataTable
          columns={columns}
          rows={rows}
          filter={filter}
          onFilterChange={setFilter}
          filterPlaceholder="Search rows…"
        />
      </div>
    );
  },
};

export const Sortable: Story = {
  render: function SortableTable() {
    const [sortKey, setSortKey] = useState<string>('name');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
    const onSort = (key: string) => {
      if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
      else {
        setSortKey(key);
        setSortDir('asc');
      }
    };
    return (
      <div className="w-full max-w-3xl">
        <GenDataTable
          columns={columns.map((c) => ({ ...c, sortable: true }))}
          rows={rows}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={onSort}
        />
      </div>
    );
  },
};

export const ColumnFilters: Story = {
  render: function ColumnFiltersTable() {
    const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
    const onColumnFilterChange = (columnKey: string, value: string) => {
      setColumnFilters((prev) => ({ ...prev, [columnKey]: value }));
    };
    return (
      <div className="w-full max-w-3xl">
        <GenDataTable
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'role', label: 'Role', filterable: true },
            { key: 'status', label: 'Status', filterable: true },
          ]}
          rows={rows}
          columnFilters={columnFilters}
          onColumnFilterChange={onColumnFilterChange}
        />
      </div>
    );
  },
};
