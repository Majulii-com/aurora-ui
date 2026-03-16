import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    page: { control: 'number' },
    totalPages: { control: 'number' },
    siblingCount: { control: 'number' },
    showFirstLast: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

function PaginationDemo({ totalPages = 10 }: { totalPages?: number }) {
  const [page, setPage] = useState(1);
  return <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />;
}

export const Default: Story = {
  render: () => <PaginationDemo />,
};

export const ManyPages: Story = {
  render: () => <PaginationDemo totalPages={20} />,
};

export const WithoutFirstLast: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <Pagination
        page={page}
        totalPages={10}
        onPageChange={setPage}
        showFirstLast={false}
      />
    );
  },
};
