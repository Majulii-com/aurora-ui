import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';
import type { AuroraSurfaceProps } from '../../types/auroraSurface';

export interface TableProps extends HTMLAttributes<HTMLTableElement>, AuroraSurfaceProps {
  /** Tailwind/classes for the scroll wrapper around `<table>` (not the table element). */
  wrapperClassName?: string;
  /**
   * When true, omit the inner card chrome on the scroll wrapper (e.g. {@link GenDataTable} already wraps the block in `tableSurface`).
   * Rows/headers still use Aurora styling when global appearance is `aurora`.
   */
  skipOuterChrome?: boolean;
}
export interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {}
export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}
export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {}
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {}
