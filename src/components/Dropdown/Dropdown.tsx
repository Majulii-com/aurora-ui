import { useState, useRef, useEffect, createContext, useContext } from 'react';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { DropdownProps, DropdownItemProps } from './Dropdown.types';

const DropdownPlainContext = createContext<boolean | undefined>(undefined);

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
  plain,
  children,
  className,
  ...rest
}: DropdownProps) {
  const ent = useAuroraSurface(plain);
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
    <DropdownPlainContext.Provider value={plain}>
      <div ref={ref} className={cn('relative inline-block', className)} {...rest}>
        <div onClick={() => setOpen(!isOpen)} aria-haspopup="true" aria-expanded={isOpen}>
          {trigger}
        </div>
        {isOpen && (
          <div
            className={cn(
              'absolute z-50 min-w-[8rem]',
              ent.isAurora
                ? cn(ent.dropdownMenu, 'py-1.5')
                : 'py-1 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700',
              placementClasses[placement]
            )}
            role="menu"
          >
            {children}
          </div>
        )}
      </div>
    </DropdownPlainContext.Provider>
  );
}

export function DropdownItem({
  className,
  destructive,
  ...rest
}: DropdownItemProps) {
  const plain = useContext(DropdownPlainContext);
  const ent = useAuroraSurface(plain);
  return (
    <button
      type="button"
      role="menuitem"
      className={cn(
        'w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 rounded-lg mx-1',
        destructive ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-200',
        ent.isAurora &&
          (destructive ? cn(ent.dropdownItem, ent.dropdownItemDestructive) : ent.dropdownItem),
        className
      )}
      {...rest}
    />
  );
}
