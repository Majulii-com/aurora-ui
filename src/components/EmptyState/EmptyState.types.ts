import type { AuroraSurfaceProps } from '../../types/auroraSurface';

export interface EmptyStateProps extends AuroraSurfaceProps {
  /** Optional icon (e.g. SVG or icon component) */
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Optional action (e.g. Button) */
  action?: React.ReactNode;
  className?: string;
}
