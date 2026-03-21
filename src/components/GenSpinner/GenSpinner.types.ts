import type { StackProps } from '../Stack/Stack.types';
import type { SpinnerSize } from '../Spinner/Spinner.types';

/**
 * Spinner row for generative UI. Inherits Stack’s root props (`className`, `style`, …) except
 * fixed layout (`direction` / `gap` / `align`). Use `labelClassName` for the optional label text.
 */
export type GenSpinnerProps = Omit<StackProps, 'direction' | 'gap' | 'align' | 'children'> & {
  label?: string;
  size?: SpinnerSize;
  labelClassName?: string;
};
