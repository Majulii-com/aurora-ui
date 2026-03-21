import { forwardRef } from 'react';
import { cn } from '../../utils';
import type {
  TableProps,
  TableHeadProps,
  TableBodyProps,
  TableRowProps,
  TableHeaderCellProps,
  TableCellProps,
} from './Table.types';

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, wrapperClassName, ...rest }, ref) => (
    <div className={cn('overflow-x-auto', wrapperClassName)}>
      <table ref={ref} className={cn('w-full border-collapse', className)} {...rest} />
    </div>
  )
);
Table.displayName = 'Table';

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ className, ...rest }, ref) => <thead ref={ref} className={cn('bg-gray-50 dark:bg-gray-800', className)} {...rest} />
);
TableHead.displayName = 'TableHead';

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...rest }, ref) => <tbody ref={ref} className={className} {...rest} />
);
TableBody.displayName = 'TableBody';

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...rest }, ref) => (
    <tr ref={ref} className={cn('border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50', className)} {...rest} />
  )
);
TableRow.displayName = 'TableRow';

export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  ({ className, ...rest }, ref) => (
    <th ref={ref} className={cn('px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100', className)} {...rest} />
  )
);
TableHeaderCell.displayName = 'TableHeaderCell';

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...rest }, ref) => (
    <td ref={ref} className={cn('px-4 py-3 text-sm text-gray-700 dark:text-gray-300', className)} {...rest} />
  )
);
TableCell.displayName = 'TableCell';
