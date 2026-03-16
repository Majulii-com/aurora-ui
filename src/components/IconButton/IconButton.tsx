import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { IconButtonProps } from './IconButton.types';

const variantClasses: Record<NonNullable<IconButtonProps['variant']>, string> = {
  ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700/50',
  outline: 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800',
  solid: 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600',
};

const sizeClasses: Record<NonNullable<IconButtonProps['size']>, string> = {
  sm: 'w-8 h-8 p-1.5',
  md: 'w-10 h-10 p-2',
  lg: 'w-12 h-12 p-2.5',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = 'ghost', size = 'md', className, children, ...rest }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        'inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
);

IconButton.displayName = 'IconButton';
