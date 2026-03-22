import type { HTMLAttributes } from 'react';
import type { AuroraSurfaceProps } from '../../types/auroraSurface';

export interface DropdownProps extends HTMLAttributes<HTMLDivElement>, AuroraSurfaceProps {
  trigger: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
}

export interface DropdownItemProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  destructive?: boolean;
}
