import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { AuroraSurfaceProps } from '../../types/auroraSurface';

export interface CopyButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>, AuroraSurfaceProps {
  /** Text copied to the clipboard */
  textToCopy: string;
  children?: ReactNode;
  /** Shown briefly after a successful copy */
  copiedLabel?: ReactNode;
}
