import type { HTMLAttributes } from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  content: React.ReactNode;
  placement?: TooltipPlacement;
  disabled?: boolean;
  children: React.ReactElement;
}
