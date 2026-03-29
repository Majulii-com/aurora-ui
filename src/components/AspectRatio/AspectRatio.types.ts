import type { HTMLAttributes } from 'react';

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  /** Width / height (e.g. `16/9`, `4/3`, `1`). */
  ratio?: number;
}
