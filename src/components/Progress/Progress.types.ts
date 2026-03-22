import type { AuroraSurfaceProps } from '../../types/auroraSurface';

export type ProgressVariant = 'primary' | 'success' | 'warning' | 'danger';
export type ProgressSize = 'sm' | 'md' | 'lg';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement>, AuroraSurfaceProps {
  value?: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  /** Show value label inside or next to bar */
  showValue?: boolean;
}
