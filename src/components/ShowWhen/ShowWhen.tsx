import type { ShowWhenProps } from './ShowWhen.types';

/**
 * Conditionally renders children based on `when`.
 * In schema-driven UIs, `when` is resolved by the runtime from __bind or __eq (e.g. wizard step).
 */
export function ShowWhen({ when, children }: ShowWhenProps): React.ReactElement | null {
  if (when === true) {
    return <>{children}</>;
  }
  return null;
}
