import { forwardRef } from 'react';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { SkeletonProps } from './Skeleton.types';

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = 'rect', width, height, plain, className, style, ...rest }, ref) => {
    const ent = useAuroraSurface(plain);
    const resolvedStyle: React.CSSProperties = {
      ...style,
      width: width ?? (variant === 'circle' ? '2rem' : undefined),
      height: height ?? (variant === 'text' ? '1em' : variant === 'circle' ? '2rem' : '1rem'),
    };
    return (
      <div
        ref={ref}
        className={cn(
          'animate-pulse rounded',
          ent.isAurora ? ent.skeleton : 'bg-gray-200 dark:bg-gray-700',
          variant === 'circle' && 'rounded-full',
          variant === 'text' && 'rounded',
          className
        )}
        style={resolvedStyle}
        aria-hidden
        {...rest}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';
