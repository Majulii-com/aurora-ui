import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { StackProps } from './Stack.types';

const gapMap = { 0: 'gap-0', 1: 'gap-1', 2: 'gap-2', 3: 'gap-3', 4: 'gap-4', 6: 'gap-6', 8: 'gap-8' };
const alignMap = { start: 'items-start', center: 'items-center', end: 'items-end', stretch: 'items-stretch' };
const justifyMap = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
};

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ direction = 'column', gap = 2, align, justify, className, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex min-w-0',
        direction === 'column' ? 'flex-col' : 'flex-row flex-wrap',
        gapMap[gap],
        align && alignMap[align],
        justify && justifyMap[justify],
        className
      )}
      {...rest}
    />
  )
);
Stack.displayName = 'Stack';
