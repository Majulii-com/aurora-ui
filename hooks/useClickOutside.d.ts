import { type RefObject } from 'react';
export declare function useClickOutside<T extends HTMLElement>(ref: RefObject<T | null>, handler: (event: MouseEvent | TouchEvent) => void): void;
