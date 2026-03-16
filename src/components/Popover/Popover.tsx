import { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils';
import type { PopoverProps } from './Popover.types';

const placementClasses: Record<NonNullable<PopoverProps['placement']>, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  'top-start': 'bottom-full left-0 mb-2',
  'top-end': 'bottom-full right-0 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  'bottom-start': 'top-full left-0 mt-2',
  'bottom-end': 'top-full right-0 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  'left-start': 'right-full top-0 mr-2',
  'left-end': 'right-full bottom-0 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  'right-start': 'left-full top-0 ml-2',
  'right-end': 'left-full bottom-0 ml-2',
};

export function Popover({
  trigger,
  children,
  isOpen: controlledOpen,
  onOpenChange,
  placement = 'bottom-start',
  closeOnOutsideClick = true,
  className,
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const setOpen = (v: boolean) => {
    if (!isControlled) setInternalOpen(v);
    onOpenChange?.(v);
  };
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !closeOnOutsideClick) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, closeOnOutsideClick]);

  return (
    <div ref={ref} className={cn('relative inline-block', className)}>
      <div onClick={() => setOpen(!isOpen)} aria-haspopup="dialog" aria-expanded={isOpen}>
        {trigger}
      </div>
      {isOpen && (
        <div
          className={cn(
            'absolute z-50 min-w-[10rem] max-w-[24rem] p-3 rounded-lg bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700',
            placementClasses[placement]
          )}
          role="dialog"
          aria-modal="false"
        >
          {children}
        </div>
      )}
    </div>
  );
}
