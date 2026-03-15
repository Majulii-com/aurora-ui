import type { InputHTMLAttributes } from 'react';
export type RadioSize = 'sm' | 'md' | 'lg';
export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    size?: RadioSize;
    label?: React.ReactNode;
    error?: boolean;
}
