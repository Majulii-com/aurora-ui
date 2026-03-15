type AnyFunction = (...args: unknown[]) => unknown;

/**
 * Composes multiple functions into a single function.
 * Rightmost function receives initial args; each result is passed left.
 */
export function compose<T extends AnyFunction>(...fns: T[]): T {
  return ((...args: unknown[]) => {
    const [first, ...rest] = fns.reverse();
    return rest.reduce<unknown>((acc, fn) => (fn as (x: unknown) => unknown)(acc), (first as AnyFunction)(...args));
  }) as T;
}

/**
 * Pipes a value through multiple functions (left to right).
 */
export function pipe<T>(initial: T, ...fns: Array<(x: T) => T>): T {
  return fns.reduce((acc, fn) => fn(acc), initial);
}
