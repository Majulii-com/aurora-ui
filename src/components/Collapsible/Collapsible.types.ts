import type { ReactNode } from 'react';

export interface CollapsibleProps {
  /** Controlled open state. */
  open?: boolean;
  /** Uncontrolled initial state. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Clickable region (e.g. a `Button` or row). */
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
  /** When true, trigger includes `aria-expanded` and `aria-controls` for the panel id. */
  triggerClassName?: string;
  panelClassName?: string;
}
