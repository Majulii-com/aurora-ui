import type { IconProps } from '../../icons/AddIcon';

/**
 * Any resolved Lucide icon name (kebab-case) or legacy alias — pass as string.
 * Prefer `LUCIDE_ICON_NAMES` / `resolveIconName` for validation in tooling.
 */
export type IconName = string;

export interface IconPropsWithName extends Omit<IconProps, 'ref'> {
  name: IconName;
  /** Passed to Lucide as `strokeWidth` (default 2). */
  strokeWidth?: number;
}
