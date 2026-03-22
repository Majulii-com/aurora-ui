import type { AuroraSurfaceProps } from '../../types/auroraSurface';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement>, AuroraSurfaceProps {
  orientation?: 'horizontal' | 'vertical';
  /** Optional label in the middle of the line */
  label?: React.ReactNode;
}
