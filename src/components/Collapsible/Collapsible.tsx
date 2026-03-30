import { useId, useState } from 'react';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { CollapsibleProps } from './Collapsible.types';

/**
 * Lightweight disclosure: one trigger + panel. For rich patterns use `Accordion`.
 * `trigger` is rendered inside a native `button` (do not pass another `Button` as direct child — use text/icon or `asChild`-style layout outside).
 */
export function Collapsible({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  trigger,
  children,
  className,
  triggerClassName,
  panelClassName,
}: CollapsibleProps) {
  const panelId = useId();
  const ent = useAuroraSurface();
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const controlled = openProp !== undefined;
  const open = controlled ? openProp : uncontrolled;

  const setOpen = (next: boolean) => {
    onOpenChange?.(next);
    if (!controlled) setUncontrolled(next);
  };

  return (
    <div className={cn('min-w-0', className)}>
      <button
        type="button"
        className={cn(
          'w-full text-left transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40',
          ent.isAurora
            ? 'text-[#08141e] dark:text-teal-50/95 hover:text-teal-900 dark:hover:text-teal-50'
            : '',
          triggerClassName
        )}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
      >
        {trigger}
      </button>
      {open ? (
        <div
          id={panelId}
          className={cn(
            'min-w-0 pt-2',
            ent.isAurora ? 'text-slate-600 dark:text-teal-100/78 text-[14.5px] leading-relaxed' : '',
            panelClassName
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
