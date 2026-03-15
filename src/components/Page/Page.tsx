import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { PageProps } from './Page.types';

export const Page = forwardRef<HTMLDivElement, PageProps>(({ className, children, ...rest }, ref) => (
  <div ref={ref} className={cn('min-h-screen w-full', className)} {...rest}>
    {children}
  </div>
));
Page.displayName = 'Page';
