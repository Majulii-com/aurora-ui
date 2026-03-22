import type { HTMLAttributes } from 'react';
import type { AuroraSurfaceProps } from '../../types/auroraSurface';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'>, AuroraSurfaceProps {
  content: React.ReactNode;
  placement?: TooltipPlacement;
  disabled?: boolean;
  children: React.ReactElement;
}
