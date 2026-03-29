import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { ScrollAreaProps } from './ScrollArea.types';

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, maxHeight, horizontal, style, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        'min-h-0 w-full min-w-0 max-w-full',
        horizontal
          ? 'overflow-x-auto overflow-y-hidden [scrollbar-width:thin]'
          : 'overflow-y-auto overflow-x-hidden [scrollbar-width:thin]',
        '[&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:w-2',
        '[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600',
        className
      )}
      style={{ ...style, ...(maxHeight != null ? { maxHeight } : {}) }}
      {...rest}
    >
      {children}
    </div>
  )
);

ScrollArea.displayName = 'ScrollArea';
