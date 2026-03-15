import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { BadgeProps } from './Badge.types';

const variantClasses: Record<BadgeProps['variant'] & string, string> = {
  primary: 'bg-primary-500 text-white',
  secondary: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
  success: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
  danger: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200',
  warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200',
  outline: 'border-2 border-primary-500 text-primary-600 dark:text-primary-400 bg-transparent',
  ghost: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
};

const sizeClasses = { sm: 'px-1.5 py-0 text-xs', md: 'px-2.5 py-0.5 text-sm', lg: 'px-3 py-1 text-base' };

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'primary', size = 'md', className, ...rest }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variantClasses[variant] ?? variantClasses.primary,
        sizeClasses[size],
        className
      )}
      {...rest}
    />
  )
);

Badge.displayName = 'Badge';
