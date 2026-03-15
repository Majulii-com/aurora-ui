import type { TextareaHTMLAttributes } from 'react';

export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: TextareaSize;
  variant?: 'default' | 'outline' | 'filled';
  error?: boolean;
  label?: string;
  helperText?: string;
  errorMessage?: string;
}
