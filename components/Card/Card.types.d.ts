import type { HTMLAttributes } from 'react';
export type CardVariant = 'elevated' | 'outline' | 'filled';
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: CardVariant;
}
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
}
export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
}
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
}
