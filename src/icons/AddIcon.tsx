import { forwardRef } from 'react';
import { cn } from '../utils';

export interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
}

export const AddIcon = forwardRef<SVGSVGElement, IconProps>(
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
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
);
AddIcon.displayName = 'AddIcon';
