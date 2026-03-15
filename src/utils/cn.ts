type ClassValue = string | number | boolean | undefined | null | ClassValue[] | Record<string, boolean | undefined | null>;

/**
 * Merges class names with tailwind-merge-like behavior.
 * Filters out falsy values and flattens arrays.
 */
export function cn(...inputs: ClassValue[]): string {
  const result: string[] = [];
  for (const input of inputs) {
    if (input == null) continue;
    if (typeof input === 'string') {
      if (input.trim()) result.push(input.trim());
    } else if (typeof input === 'number' && !Number.isNaN(input)) {
      result.push(String(input));
    } else if (Array.isArray(input)) {
      result.push(cn(...input));
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) result.push(key);
      }
    }
  }
  return result.filter(Boolean).join(' ');
}
