import type { ReactNode } from 'react';
import type { AuroraSurfaceProps } from '../../types/auroraSurface';

export interface StepperStep {
  id: string;
  title: ReactNode;
  description?: ReactNode;
}

export interface StepperProps extends AuroraSurfaceProps {
  steps: StepperStep[];
  /** Index of the active step (0-based) */
  activeIndex: number;
  className?: string;
  /** Mark steps before active as completed */
  showCompleted?: boolean;
}
