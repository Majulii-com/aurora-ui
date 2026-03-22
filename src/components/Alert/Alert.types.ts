import type { HTMLAttributes } from 'react';
import type { AuroraSurfaceProps } from '../../types/auroraSurface';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps extends HTMLAttributes<HTMLDivElement>, AuroraSurfaceProps {
  variant?: AlertVariant;
  title?: string;
  onClose?: () => void;
}
