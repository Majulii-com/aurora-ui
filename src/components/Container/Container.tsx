import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { ContainerProps } from './Container.types';

const maxWidthMap = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  full: 'max-w-full',
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ maxWidth = 'lg', className, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        'w-full min-w-0 max-w-full mx-auto',
        'px-4 sm:px-6 lg:px-8',
        'pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))]',
        maxWidthMap[maxWidth],
        className
      )}
      {...rest}
    />
  )
);
Container.displayName = 'Container';
