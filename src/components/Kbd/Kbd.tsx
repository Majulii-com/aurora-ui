import { forwardRef } from 'react';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { KbdProps } from './Kbd.types';

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ children, className, ...rest }, ref) => {
    const ent = useAuroraSurface();
    return (
      <kbd
        ref={ref as React.Ref<HTMLSpanElement>}
        className={cn(
          'inline-flex items-center justify-center min-w-[1.5em] px-1.5 py-0.5 text-xs font-mono font-medium',
          ent.isAurora
            ? 'rounded-md border border-stone-200/88 dark:border-stone-700/65 ' +
              'bg-gradient-to-b from-white to-stone-100/88 dark:from-stone-800 dark:to-stone-900 ' +
              'text-stone-700 dark:text-stone-200 ' +
              'shadow-[inset_0_-2px_0_rgba(15,23,42,0.10),inset_0_1px_0_rgba(255,255,255,0.94),0_1px_3px_rgba(15,23,42,0.06)] ' +
              'ring-1 ring-stone-900/[0.055] dark:ring-white/[0.08]'
            : 'rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
          className
        )}
        {...rest}
      >
        {children}
      </kbd>
    );
  }
);

Kbd.displayName = 'Kbd';
