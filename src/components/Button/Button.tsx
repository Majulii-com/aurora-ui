import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { ButtonProps } from './Button.types';

const variantClasses: Record<ButtonProps['variant'] & string, string> = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 border-transparent',
  secondary: 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200 border-transparent dark:bg-secondary-700 dark:text-secondary-100',
  ghost: 'bg-transparent hover:bg-black/5 dark:hover:bg-white/5 border-transparent',
  outline: 'bg-transparent border-2 border-primary-500 text-primary-600 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400',
  danger: 'bg-red-500 text-white hover:bg-red-600 border-transparent',
  success: 'bg-green-500 text-white hover:bg-green-600 border-transparent',
};

const sizeClasses: Record<ButtonProps['size'] & string, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-base gap-2',
  lg: 'px-6 py-3 text-lg gap-2',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant: v = 'primary',
      size = 'md',
      fullWidth,
      isLoading,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          variantClasses[v] ?? variantClasses.primary,
          sizeClasses[size] ?? sizeClasses.md,
          fullWidth && 'w-full',
          className
        )}
        aria-busy={isLoading}
        {...rest}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          leftIcon
        )}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
