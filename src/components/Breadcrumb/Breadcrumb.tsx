import React, { forwardRef, createContext, useContext } from 'react';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { BreadcrumbProps, BreadcrumbItemProps } from './Breadcrumb.types';

const BreadcrumbPlainContext = createContext<boolean | undefined>(undefined);

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ separator = '/', children, plain, className, ...rest }, ref) => {
    const ent = useAuroraSurface(plain);
    const items = React.Children.toArray(children);
    const content =
      items.length > 1 && separator != null
        ? items.reduce<React.ReactNode[]>(
            (acc, child, i) =>
              i === 0
                ? [child]
                : [
                    ...acc,
                    <span
                      key={`sep-${i}`}
                      className={cn(
                        'shrink-0 text-gray-400 dark:text-gray-500',
                        ent.isAurora && ent.breadcrumbSeparator
                      )}
                      aria-hidden
                    >
                      {separator}
                    </span>,
                    child,
                  ],
            []
          )
        : children;
    return (
      <BreadcrumbPlainContext.Provider value={plain}>
        <nav
          ref={ref}
          aria-label="Breadcrumb"
          className={cn(
            'flex min-w-0 max-w-full items-center gap-2 overflow-x-auto text-sm [-webkit-overflow-scrolling:touch]',
            className
          )}
          {...rest}
        >
          {content}
        </nav>
      </BreadcrumbPlainContext.Provider>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export function BreadcrumbItem({ href, current, children, className }: BreadcrumbItemProps) {
  const plain = useContext(BreadcrumbPlainContext);
  const ent = useAuroraSurface(plain);
  const base = ent.isAurora
    ? ent.breadcrumbLink
    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100';
  if (current) {
    return (
      <span
        className={cn(
          'shrink-0',
          base,
          ent.isAurora ? ent.breadcrumbCurrent : 'font-medium text-gray-900 dark:text-gray-100',
          className
        )}
        aria-current="page"
      >
        {children}
      </span>
    );
  }
  if (href) {
    return (
      <a href={href} className={cn('shrink-0 touch-manipulation', base, className)}>
        {children}
      </a>
    );
  }
  return <span className={cn('shrink-0', className)}>{children}</span>;
}
