import { useId } from 'react';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { SegmentedControlProps } from './SegmentedControl.types';

const sizeBtn: Record<NonNullable<SegmentedControlProps['size']>, string> = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
};

export function SegmentedControl({
  options,
  value,
  onChange,
  size = 'md',
  plain,
  className,
  'aria-label': ariaLabel,
}: SegmentedControlProps) {
  const ent = useAuroraSurface(plain);
  const id = useId();
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex max-w-full min-w-0 flex-nowrap gap-0.5 overflow-x-auto overscroll-x-contain p-1 [-webkit-overflow-scrolling:touch]',
        ent.isAurora ? ent.segmented : 'rounded-xl bg-gray-100 dark:bg-gray-800',
        className
      )}
    >
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            id={`${id}-${opt.value}`}
            aria-selected={selected}
            disabled={opt.disabled}
            onClick={() => onChange(opt.value)}
            className={cn(
              'shrink-0 touch-manipulation rounded-lg font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 disabled:opacity-40',
              sizeBtn[size],
              selected
                ? ent.isAurora
                  ? ent.tabPillsActive
                  : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                : ent.isAurora
                  ? ent.tabPills
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
