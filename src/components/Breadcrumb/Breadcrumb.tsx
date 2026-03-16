import React, { forwardRef } from 'react';
import { cn } from '../../utils';
import type { BreadcrumbProps, BreadcrumbItemProps } from './Breadcrumb.types';

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ separator = '/', children, className, ...rest }, ref) => {
    const items = React.Children.toArray(children);
    const content =
      items.length > 1 && separator != null
        ? items.reduce<React.ReactNode[]>(
            (acc, child, i) =>
              i === 0 ? [child] : [...acc, <span key={`sep-${i}`} className="text-gray-400 dark:text-gray-500" aria-hidden>{separator}</span>, child],
            []
          )
        : children;
    return (
      <nav ref={ref} aria-label="Breadcrumb" className={cn('flex items-center gap-2 text-sm', className)} {...rest}>
        {content}
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export function BreadcrumbItem({ href, current, children, className }: BreadcrumbItemProps) {
  const base = 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100';
  if (current) {
    return (
      <span className={cn(base, 'font-medium text-gray-900 dark:text-gray-100', className)} aria-current="page">
        {children}
      </span>
    );
  }
  if (href) {
    return (
      <a href={href} className={cn(base, className)}>
        {children}
      </a>
    );
  }
  return <span className={cn(className)}>{children}</span>;
}
