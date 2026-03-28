import type { ButtonHTMLAttributes } from 'react';
import type { PointerRippleOptions } from '../../hooks/usePointerRipple';
import type { AuroraSurfaceProps } from '../../types/auroraSurface';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, AuroraSurfaceProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /**
   * Pointer ripple on press (enterprise / engagement). Inspired by Magic UI–style ripple buttons.
   * @see https://magicui.design/docs/components/ripple-button
   */
  ripple?: boolean | PointerRippleOptions;
}
