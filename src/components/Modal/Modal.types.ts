import type { HTMLAttributes } from 'react';
import type { AuroraSurfaceProps } from '../../types/auroraSurface';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'>, AuroraSurfaceProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
}
