import type { HTMLAttributes } from 'react';

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  page: number;
  totalPages: number;
  /** Defaults to a no-op so demos / schema renderers don’t crash without a handler */
  onPageChange?: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
}
