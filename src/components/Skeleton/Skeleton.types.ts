import type { AuroraSurfaceProps } from '../../types/auroraSurface';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, AuroraSurfaceProps {
  /** Shape of the placeholder */
  variant?: 'text' | 'rect' | 'circle';
  /** Width (e.g. '100%', '2rem'); for text, line width */
  width?: string | number;
  /** Height (e.g. '1rem'); for text, line height */
  height?: string | number;
}
