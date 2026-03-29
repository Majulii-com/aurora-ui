/**
 * Path segment guards for dotted keys (`state.foo.bar`) — blocks prototype pollution.
 */

const UNSAFE_SEGMENT = new Set(['__proto__', 'constructor', 'prototype']);

export function isUnsafePathSegment(key: string): boolean {
  return UNSAFE_SEGMENT.has(key);
}
