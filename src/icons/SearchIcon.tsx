import { forwardRef } from 'react';
import { cn } from '../utils';
import type { IconProps } from './AddIcon';

export const SearchIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, color = 'currentColor', className }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className)}
      aria-hidden
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
);
SearchIcon.displayName = 'SearchIcon';
