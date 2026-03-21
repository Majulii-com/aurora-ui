import type { ShowWhenProps } from './ShowWhen.types';
import { cn } from '../../utils';

/**
 * Conditionally renders children based on `when`.
 * In schema-driven UIs, `when` is resolved by the runtime from __bind or __eq (e.g. wizard step).
 */
export function ShowWhen({ when, children, className }: ShowWhenProps): React.ReactElement | null {
  if (when !== true) {
    return null;
  }
  if (className) {
    return <div className={cn(className)}>{children}</div>;
  }
  return <>{children}</>;
}
