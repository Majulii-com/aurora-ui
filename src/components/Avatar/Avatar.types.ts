import type { HTMLAttributes } from 'react';
import type { AuroraSurfaceProps } from '../../types/auroraSurface';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement>, AuroraSurfaceProps {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  fallback?: React.ReactNode;
}
