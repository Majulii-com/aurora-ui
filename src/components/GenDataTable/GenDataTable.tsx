import React from 'react';
import { Input } from '../Input';
import { Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from '../Table';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';

export type GenTableColumn = { key: string; label: string; sortable?: boolean };

export type GenDataTableDSLProps = {
  columns: GenTableColumn[];
  rows: Record<string, unknown>[];
  sortKey?: string;
  sortDir?: 'asc' | 'desc';
  onSort?: (key: string) => void;
  filter?: string;
  onFilterChange?: (v: string) => void;
  /** Root wrapper (whole block). */
  className?: string;
  /** Filter `<Input>` — Tailwind from JSON DSL. */
  filterClassName?: string;
  /** Wrapper around the filter row (spacing, width). */
  filterRowClassName?: string;
  filterPlaceholder?: string;
  /** Passed to `<table className=…>`. */
  tableClassName?: string;
  /** Passed to the scroll wrapper around the table (default includes overflow-x). */
  tableWrapperClassName?: string;
  /** Sortable column header `<button>` classes. */
  sortHeaderButtonClassName?: string;
};

/** Table with optional client-side sort + filter (generative DSL). */
export function GenDataTable({
  columns,
  rows,
  sortKey,
  sortDir,
  onSort,
  filter,
  onFilterChange,
  className,
  filterClassName,
  filterRowClassName,
  filterPlaceholder = 'Filter rows...',
  tableClassName,
  tableWrapperClassName,
  sortHeaderButtonClassName,
}: GenDataTableDSLProps) {
  const ent = useAuroraSurface();
  const safeRows = Array.isArray(rows) ? rows : [];

  const filtered = React.useMemo(() => {
    if (!filter?.trim()) return safeRows;
    const q = filter.toLowerCase();
    return safeRows.filter((r) =>
      Object.values(r).some((v) => String(v).toLowerCase().includes(q))
    );
  }, [safeRows, filter]);

  const sorted = React.useMemo(() => {
    if (!sortKey) return filtered;
    const copy = [...filtered];
    copy.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = String(av).localeCompare(String(bv));
      return sortDir === 'desc' ? -cmp : cmp;
    });
    return copy;
  }, [filtered, sortKey, sortDir]);

  return (
    <div className={cn('w-full min-w-0', ent.isAurora && ent.tableSurface, className)}>
      {onFilterChange ? (
        <div className={cn('mb-4 w-full max-w-md py-0.5', filterRowClassName)}>
          <Input
            className={cn('w-full', filterClassName)}
            placeholder={filterPlaceholder}
            value={filter ?? ''}
            onChange={(e) => onFilterChange(e.target.value)}
          />
        </div>
      ) : null}
      <Table
        skipOuterChrome={ent.isAurora}
        className={tableClassName}
        wrapperClassName={cn('w-full min-w-0', tableWrapperClassName)}
      >
        <TableHead>
          <TableRow>
            {columns.map((c) => (
              <TableHeaderCell key={c.key}>
                {c.sortable && onSort ? (
                  <button
                    type="button"
                    className={cn(
                      'font-semibold hover:text-primary-600 dark:hover:text-primary-400',
                      sortHeaderButtonClassName
                    )}
                    onClick={() => onSort(c.key)}
                  >
                    {c.label}
                    {sortKey === c.key ? (sortDir === 'desc' ? ' ↓' : ' ↑') : ''}
                  </button>
                ) : (
                  c.label
                )}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map((row, i) => (
            <TableRow key={i}>
              {columns.map((c) => (
                <TableCell key={c.key}>{String(row[c.key] ?? '')}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
