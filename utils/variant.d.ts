export type VariantMap<T extends string> = Record<T, string>;
/**
 * Resolves variant to className. Safe for missing keys.
 */
export declare function variant<T extends string>(map: VariantMap<T>, key: T | undefined, fallback?: string): string;
/**
 * Builds a variant helper that merges base classes with variant and optional className.
 */
export declare function createVariant<T extends string>(base: string, variantMap: VariantMap<T>, defaultVariant?: T): (props: {
    variant?: T;
    size?: string;
    className?: string;
}, sizeMap?: Record<string, string>) => string;
