import { useMemo } from 'react';
import { cn } from '../../utils';
import { Button } from '../Button';
import type { PaginationProps } from './Pagination.types';

function range(start: number, end: number): number[] {
  const len = end - start + 1;
  return Array.from({ length: len }, (_, i) => start + i);
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  className,
  ...rest
}: PaginationProps) {
  const items = useMemo(() => {
    const left = Math.max(1, page - siblingCount);
    const right = Math.min(totalPages, page + siblingCount);
    const pages = range(left, right);
    const withLeftEllipsis = left > 2;
    const withRightEllipsis = right < totalPages - 1;
    return { pages, withLeftEllipsis, withRightEllipsis };
  }, [page, totalPages, siblingCount]);

  return (
    <nav role="navigation" aria-label="Pagination" className={cn('flex items-center gap-1', className)} {...rest}>
      {showFirstLast && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={page <= 1}
          aria-label="First page"
        >
          «
        </Button>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        ‹
      </Button>
      {items.withLeftEllipsis && (
        <>
          <Button variant="ghost" size="sm" onClick={() => onPageChange(1)}>
            1
          </Button>
          <span className="px-2 text-gray-500">…</span>
        </>
      )}
      {items.pages.map((p) => (
        <Button
          key={p}
          variant={p === page ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => onPageChange(p)}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </Button>
      ))}
      {items.withRightEllipsis && (
        <>
          <span className="px-2 text-gray-500">…</span>
          <Button variant="ghost" size="sm" onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </Button>
        </>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
      >
        ›
      </Button>
      {showFirstLast && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={page >= totalPages}
          aria-label="Last page"
        >
          »
        </Button>
      )}
    </nav>
  );
}
