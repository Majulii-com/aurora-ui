import { cn } from '../../utils';
import type { VisuallyHiddenProps } from './VisuallyHidden.types';

/**
 * Hides content visually while keeping it available to screen readers.
 */
export function VisuallyHidden({ className, ...rest }: VisuallyHiddenProps) {
  return <span className={cn('sr-only', className)} {...rest} />;
}
