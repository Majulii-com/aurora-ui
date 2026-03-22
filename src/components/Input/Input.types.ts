import type { InputHTMLAttributes } from 'react';
import type { AuroraSurfaceProps } from '../../types/auroraSurface';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, AuroraSurfaceProps {
  size?: InputSize;
  variant?: 'default' | 'outline' | 'filled';
  error?: boolean;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  label?: string;
  helperText?: string;
  errorMessage?: string;
}
