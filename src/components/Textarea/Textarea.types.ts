import type { TextareaHTMLAttributes } from 'react';
import type { AuroraSurfaceProps } from '../../types/auroraSurface';

export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, AuroraSurfaceProps {
  size?: TextareaSize;
  variant?: 'default' | 'outline' | 'filled';
  error?: boolean;
  label?: string;
  helperText?: string;
  errorMessage?: string;
}
