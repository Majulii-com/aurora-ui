import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps } from './Card.types';

const variantClasses = {
  elevated: 'bg-white dark:bg-gray-800 shadow-md',
  outline: 'bg-transparent border-2 border-gray-200 dark:border-gray-700',
  filled: 'bg-gray-50 dark:bg-gray-800/50',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'elevated', className, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn('rounded-lg overflow-hidden', variantClasses[variant], className)}
      {...rest}
    />
  )
);
Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...rest }, ref) => (
    <div ref={ref} className={cn('px-4 py-3 border-b border-gray-200 dark:border-gray-700', className)} {...rest} />
  )
);
CardHeader.displayName = 'CardHeader';

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, ...rest }, ref) => <div ref={ref} className={cn('p-4', className)} {...rest} />
);
CardBody.displayName = 'CardBody';

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...rest }, ref) => (
    <div ref={ref} className={cn('px-4 py-3 border-t border-gray-200 dark:border-gray-700', className)} {...rest} />
  )
);
CardFooter.displayName = 'CardFooter';
