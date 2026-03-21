import type { HTMLAttributes } from 'react';

/**
 * Building blocks for Aurora components that must be **styling-friendly from generative JSON**
 * (`props.className`, `props.style`, ids, ARIA).
 *
 * **Convention:** Prefer `extends HTMLAttributes<HTMLElement>` on the root element’s props
 * so DSL authors can pass Tailwind and `style` without new library code.
 *
 * Use these helpers when you cannot extend full `HTMLAttributes` (e.g. conflicting `children` typing).
 */
export type AuroraDslRootDiv = Pick<
  HTMLAttributes<HTMLDivElement>,
  'className' | 'style' | 'id' | 'role' | 'hidden' | 'title' | 'translate' | 'slot'
>;

export type AuroraDslRootSpan = Pick<
  HTMLAttributes<HTMLSpanElement>,
  'className' | 'style' | 'id' | 'role' | 'hidden' | 'title' | 'translate' | 'slot'
>;
