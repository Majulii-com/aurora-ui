import type { HTMLAttributes, CSSProperties } from 'react';

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  /** When set, applies `maxHeight` as inline style (e.g. `320` or `'20rem'`). */
  maxHeight?: CSSProperties['maxHeight'];
  /** Prefer horizontal scrolling (e.g. wide tables). */
  horizontal?: boolean;
}
