import type { HTMLAttributes } from 'react';
export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'full';
    closeOnOverlayClick?: boolean;
    showCloseButton?: boolean;
}
