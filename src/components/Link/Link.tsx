import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { LinkProps } from './Link.types';

const variantClasses: Record<NonNullable<LinkProps['variant']>, string> = {
  default: 'text-primary-600 dark:text-primary-400 hover:underline',
  primary: 'text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium',
  muted: 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
  underline: 'text-gray-900 dark:text-gray-100 underline hover:no-underline',
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant = 'default', external, className, rel, target, ...rest }, ref) => (
    <a
      ref={ref}
      className={cn('transition-colors', variantClasses[variant], className)}
      rel={external ? 'noopener noreferrer' : rel}
      target={external ? '_blank' : target}
      {...rest}
    />
  )
);

Link.displayName = 'Link';
