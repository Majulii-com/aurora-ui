import type { AuroraSurfaceProps } from '../../types/auroraSurface';

export type PopoverPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export interface PopoverProps extends AuroraSurfaceProps {
  /** Element that opens the popover when clicked */
  trigger: React.ReactNode;
  /** Content shown in the popover (can be rich: forms, buttons, etc.) */
  children: React.ReactNode;
  /** Open state (controlled) */
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: PopoverPlacement;
  /** Close when clicking outside */
  closeOnOutsideClick?: boolean;
  className?: string;
}
