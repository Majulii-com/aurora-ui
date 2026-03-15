import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { SpinnerProps } from './Spinner.types';

const sizeClasses = { sm: 'w-4 h-4 border-2', md: 'w-8 h-8 border-2', lg: 'w-12 h-12 border-3' };

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'md', className, ...rest }, ref) => (
    <div
      ref={ref}
      role="status"
      aria-label="Loading"
      className={cn(
        'rounded-full border-primary-500 border-t-transparent animate-spin',
        sizeClasses[size],
        className
      )}
      {...rest}
    />
  )
);

Spinner.displayName = 'Spinner';
