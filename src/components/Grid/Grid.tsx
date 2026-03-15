import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { GridProps } from './Grid.types';

const colsMap = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4', 6: 'grid-cols-6', 12: 'grid-cols-12' };
const gapMap = { 0: 'gap-0', 2: 'gap-2', 4: 'gap-4', 6: 'gap-6', 8: 'gap-8' };

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ columns = 3, gap = 4, className, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn('grid', colsMap[columns], gapMap[gap], className)}
      {...rest}
    />
  )
);
Grid.displayName = 'Grid';
