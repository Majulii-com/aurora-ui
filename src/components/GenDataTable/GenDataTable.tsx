import React from 'react';
import { Input } from '../Input';
import { Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from '../Table';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';

export type GenTableColumn = {
  key: string;
  label: string;
  sortable?: boolean;
  /** Per-column filter (search) — shows a filter input under this column when `onColumnFilterChange` is set. */
  filterable?: boolean;
};

export type GenDataTableDSLProps = {
  columns: GenTableColumn[];
  rows: Record<string, unknown>[];
  sortKey?: string;
  sortDir?: 'asc' | 'desc';
  onSort?: (key: string) => void;
  filter?: string;
  onFilterChange?: (v: string) => void;
  /** Per-column text filters (AND). Keys are column `key`s. */
  columnFilters?: Record<string, string>;
  onColumnFilterChange?: (columnKey: string, value: string) => void;
  /** Optional class for each column filter `<Input>` (DSL: not easily per-column; use global `columnFilterClassName`). */
  columnFilterClassName?: string;
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
  columnFilters,
  onColumnFilterChange,
  columnFilterClassName,
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

  const columnFiltered = React.useMemo(() => {
    if (!onColumnFilterChange) return filtered;
    const cf = columnFilters ?? {};
    let next = filtered;
    for (const col of columns) {
      if (!col.filterable) continue;
      const q = cf[col.key]?.trim();
      if (!q) continue;
      const ql = q.toLowerCase();
      next = next.filter((row) => String(row[col.key] ?? '').toLowerCase().includes(ql));
    }
    return next;
  }, [filtered, columns, columnFilters, onColumnFilterChange]);

  const showColumnFilterRow =
    Boolean(onColumnFilterChange) && columns.some((c) => c.filterable);

  const sorted = React.useMemo(() => {
    if (!sortKey) return columnFiltered;
    const copy = [...columnFiltered];
    copy.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = String(av).localeCompare(String(bv));
      return sortDir === 'desc' ? -cmp : cmp;
    });
    return copy;
  }, [columnFiltered, sortKey, sortDir]);

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
          {showColumnFilterRow ? (
            <TableRow className="bg-stone-50/80 dark:bg-stone-800/40">
              {columns.map((c) => (
                <TableHeaderCell key={`f-${c.key}`} className="py-2 align-top">
                  {c.filterable ? (
                    <Input
                      size="sm"
                      className={cn('w-full min-w-[6rem] text-[13px]', columnFilterClassName)}
                      placeholder="Filter…"
                      value={(columnFilters ?? {})[c.key] ?? ''}
                      onChange={(e) => onColumnFilterChange?.(c.key, e.target.value)}
                      aria-label={`Filter ${c.label}`}
                    />
                  ) : null}
                </TableHeaderCell>
              ))}
            </TableRow>
          ) : null}
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
