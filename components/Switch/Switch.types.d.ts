import type { InputHTMLAttributes } from 'react';
export type SwitchSize = 'sm' | 'md' | 'lg';
export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    size?: SwitchSize;
    label?: React.ReactNode;
}
