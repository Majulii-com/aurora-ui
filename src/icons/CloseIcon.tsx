import { forwardRef } from 'react';
import { cn } from '../utils';
import type { IconProps } from './AddIcon';

export const CloseIcon = forwardRef<SVGSVGElement, IconProps>(
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
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
);
CloseIcon.displayName = 'CloseIcon';
