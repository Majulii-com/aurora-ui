import type { AuroraSurfaceProps } from '../../types/auroraSurface';

export type DrawerPlacement = 'left' | 'right' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'full';

export interface DrawerProps extends AuroraSurfaceProps {
  isOpen?: boolean;
  onClose?: () => void;
  /** Where the drawer slides in from */
  placement?: DrawerPlacement;
  size?: DrawerSize;
  title?: React.ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
  children?: React.ReactNode;
}
