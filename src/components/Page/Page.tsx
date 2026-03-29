import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { PageProps } from './Page.types';

export const Page = forwardRef<HTMLDivElement, PageProps>(({ className, children, ...rest }, ref) => (
  <div
    ref={ref}
    className={cn(
      'min-h-screen min-h-[100dvh] w-full min-w-0 max-w-[100vw] overflow-x-clip',
      className
    )}
    {...rest}
  >
    {children}
  </div>
));
Page.displayName = 'Page';
