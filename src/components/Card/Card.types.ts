import type { HTMLAttributes } from 'react';
import type { AuroraSurfaceProps } from '../../types/auroraSurface';

/** `glass` — frosted / Uiverse-style surface for dashboards and hero panels */
export type CardVariant = 'elevated' | 'outline' | 'filled' | 'glass';

export interface CardProps extends HTMLAttributes<HTMLDivElement>, AuroraSurfaceProps {
  variant?: CardVariant;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}
