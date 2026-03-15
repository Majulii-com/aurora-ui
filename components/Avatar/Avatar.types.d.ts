import type { HTMLAttributes } from 'react';
export type AvatarSize = 'sm' | 'md' | 'lg';
export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    src?: string | null;
    alt?: string;
    name?: string;
    size?: AvatarSize;
    fallback?: React.ReactNode;
}
