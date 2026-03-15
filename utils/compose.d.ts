type AnyFunction = (...args: unknown[]) => unknown;
/**
 * Composes multiple functions into a single function.
 * Rightmost function receives initial args; each result is passed left.
 */
export declare function compose<T extends AnyFunction>(...fns: T[]): T;
/**
 * Pipes a value through multiple functions (left to right).
 */
export declare function pipe<T>(initial: T, ...fns: Array<(x: T) => T>): T;
export {};
