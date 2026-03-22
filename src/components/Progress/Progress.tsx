import { forwardRef } from 'react';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { ProgressProps } from './Progress.types';

const variantClasses: Record<NonNullable<ProgressProps['variant']>, string> = {
  primary: 'bg-primary-500',
  success: 'bg-green-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
};

const sizeClasses: Record<NonNullable<ProgressProps['size']>, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      variant = 'primary',
      size = 'md',
      showValue = false,
      plain,
      className,
      ...rest
    },
    ref
  ) => {
    const ent = useAuroraSurface(plain);
    const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
    return (
      <div ref={ref} className={cn('w-full', className)} {...rest}>
        <div
          className={cn(
            'w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden',
            ent.isAurora && ent.progressTrack,
            sizeClasses[size]
          )}
        >
          <div
            className={cn(
              'h-full rounded-full transition-all duration-300',
              variantClasses[variant]
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
        {showValue && (
          <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {Math.round(pct)}%
          </span>
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress';
