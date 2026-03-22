import type { InputHTMLAttributes, ReactNode } from 'react';
import type { AuroraSurfaceProps } from '../../types/auroraSurface';

export type DateFieldType = 'date' | 'datetime-local' | 'time' | 'month' | 'week';

export interface DateFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    AuroraSurfaceProps {
  type?: DateFieldType;
  label?: ReactNode;
  error?: boolean;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
}
