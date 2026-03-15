export type VariantMap<T extends string> = Record<T, string>;

/**
 * Resolves variant to className. Safe for missing keys.
 */
export function variant<T extends string>(map: VariantMap<T>, key: T | undefined, fallback?: string): string {
  if (key == null) return fallback ?? '';
  return map[key] ?? fallback ?? '';
}

/**
 * Builds a variant helper that merges base classes with variant and optional className.
 */
export function createVariant<T extends string>(
  base: string,
  variantMap: VariantMap<T>,
  defaultVariant?: T
) {
  return (props: { variant?: T; size?: string; className?: string }, sizeMap?: Record<string, string>) => {
    const v = props.variant ?? defaultVariant;
    const sizeClass = props.size && sizeMap ? sizeMap[props.size] ?? '' : '';
    const parts = [base, variant(variantMap, v), sizeClass, props.className].filter(Boolean);
    return parts.join(' ');
  };
}
