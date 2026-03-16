import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { KbdProps } from './Kbd.types';

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ children, className, ...rest }, ref) => (
    <kbd
      ref={ref as React.Ref<HTMLSpanElement>}
      className={cn(
        'inline-flex items-center justify-center min-w-[1.5em] px-1.5 py-0.5 text-xs font-mono font-medium rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
        className
      )}
      {...rest}
    >
      {children}
    </kbd>
  )
);

Kbd.displayName = 'Kbd';
