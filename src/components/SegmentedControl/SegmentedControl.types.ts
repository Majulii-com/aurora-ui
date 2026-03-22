import type { ReactNode } from 'react';
import type { AuroraSurfaceProps } from '../../types/auroraSurface';

export type SegmentedControlSize = 'sm' | 'md' | 'lg';

export interface SegmentedOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps extends AuroraSurfaceProps {
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  size?: SegmentedControlSize;
  className?: string;
  /** Accessible label for the group */
  'aria-label'?: string;
}
