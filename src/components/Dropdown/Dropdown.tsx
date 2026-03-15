import { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils';
import type { DropdownProps, DropdownItemProps } from './Dropdown.types';

const placementClasses = {
  'bottom-start': 'top-full left-0 mt-1',
  'bottom-end': 'top-full right-0 mt-1',
  'top-start': 'bottom-full left-0 mb-1',
  'top-end': 'bottom-full right-0 mb-1',
};

export function Dropdown({
  trigger,
  isOpen: controlledOpen,
  onOpenChange,
  placement = 'bottom-start',
  children,
  className,
  ...rest
}: DropdownProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const setOpen = (v: boolean) => {
    if (!isControlled) setInternalOpen(v);
    onOpenChange?.(v);
  };
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  return (
    <div ref={ref} className={cn('relative inline-block', className)} {...rest}>
      <div onClick={() => setOpen(!isOpen)} aria-haspopup="true" aria-expanded={isOpen}>
        {trigger}
      </div>
      {isOpen && (
        <div
          className={cn(
            'absolute z-50 min-w-[8rem] py-1 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700',
            placementClasses[placement]
          )}
          role="menu"
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function DropdownItem({
  className,
  destructive,
  ...rest
}: DropdownItemProps) {
  return (
    <button
      type="button"
      role="menuitem"
      className={cn(
        'w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50',
        destructive ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-200',
        className
      )}
      {...rest}
    />
  );
}
