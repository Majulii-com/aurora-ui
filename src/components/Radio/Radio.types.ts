import type { InputHTMLAttributes } from 'react';
import type { AuroraSurfaceProps } from '../../types/auroraSurface';

export type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>, AuroraSurfaceProps {
  size?: RadioSize;
  label?: React.ReactNode;
  error?: boolean;
}
