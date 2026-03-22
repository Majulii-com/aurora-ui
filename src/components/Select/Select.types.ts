import type { SelectHTMLAttributes } from 'react';
import type { AuroraSurfaceProps } from '../../types/auroraSurface';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>, AuroraSurfaceProps {
  size?: SelectSize;
  variant?: 'default' | 'outline' | 'filled';
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  errorMessage?: string;
}
