import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { BoxProps } from './Box.types';

export const Box = forwardRef<HTMLDivElement, BoxProps>(({ className, children, ...rest }, ref) => (
  <div ref={ref} className={cn('min-w-0', className)} {...rest}>
    {children}
  </div>
));
Box.displayName = 'Box';
