import type { HTMLAttributes } from 'react';
import type { AuroraSurfaceProps } from '../../types/auroraSurface';

export type CardVariant = 'elevated' | 'outline' | 'filled';

export interface CardProps extends HTMLAttributes<HTMLDivElement>, AuroraSurfaceProps {
  variant?: CardVariant;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}
