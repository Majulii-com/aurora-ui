import type { ReactNode } from 'react';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning';

export interface ToastInput {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  /** ms before auto-dismiss; `0` disables. Default 5000. */
  duration?: number;
  action?: ReactNode;
}

export interface ToastRecord extends ToastInput {
  id: string;
}
