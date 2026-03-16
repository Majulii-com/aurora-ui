import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { DividerProps } from './Divider.types';

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = 'horizontal', label, className, ...rest }, ref) => {
    const isVertical = orientation === 'vertical';
    const hrEl = (
      <hr
        ref={ref}
        role="separator"
        className={cn(
          'border-0 border-gray-200 dark:border-gray-700',
          isVertical ? 'w-px h-full border-l' : 'h-px w-full border-t',
          label && !isVertical && 'border-none',
          className
        )}
        {...rest}
      />
    );
    if (label && !isVertical) {
      return (
        <div className={cn('flex items-center gap-3 w-full', className)}>
          <hr className="flex-1 border-0 border-t border-gray-200 dark:border-gray-700" />
          <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0">{label}</span>
          <hr className="flex-1 border-0 border-t border-gray-200 dark:border-gray-700" />
        </div>
      );
    }
    return hrEl;
  }
);

Divider.displayName = 'Divider';
