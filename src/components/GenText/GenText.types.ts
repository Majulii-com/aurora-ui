import type { HTMLAttributes } from 'react';

export type GenTextVariant = 'body' | 'title' | 'muted';

/**
 * Typography node for generative UI. Extends paragraph HTML attributes so JSON can set
 * `className`, `style`, `id`, `data-*`, `aria-*`, etc.
 */
export type GenTextProps = {
  variant?: GenTextVariant;
} & HTMLAttributes<HTMLParagraphElement>;
