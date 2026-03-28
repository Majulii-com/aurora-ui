import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { PointerRippleOptions } from '../../hooks/usePointerRipple';
import type { AuroraSurfaceProps } from '../../types/auroraSurface';

export type IconButtonVariant = 'ghost' | 'outline' | 'solid';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, AuroraSurfaceProps {
  /** Icon to show (required for a11y; pair with aria-label) */
  'aria-label': string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  children?: ReactNode;
  /** Press ripple (same interaction model as {@link Button} `ripple`). */
  ripple?: boolean | PointerRippleOptions;
}
