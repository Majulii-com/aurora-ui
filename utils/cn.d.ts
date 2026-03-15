type ClassValue = string | number | boolean | undefined | null | ClassValue[] | Record<string, boolean | undefined | null>;
/**
 * Merges class names with tailwind-merge-like behavior.
 * Filters out falsy values and flattens arrays.
 */
export declare function cn(...inputs: ClassValue[]): string;
export {};
