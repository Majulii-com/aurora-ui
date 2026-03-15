import { createContext, useContext, useState, useCallback } from 'react';
import { cn } from '../../utils';
import type {
  AccordionContextValue,
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
} from './Accordion.types';

function toArray(v: string | string[] | null | undefined): string[] {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}

type InternalContext = AccordionContextValue & { toggle: (value: string) => void; isOpen: (value: string) => boolean };

const AccordionContext = createContext<InternalContext | null>(null);
const AccordionItemContext = createContext<string | null>(null);

function useAccordion() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('Accordion components must be used within Accordion');
  return ctx;
}

export function Accordion({
  defaultValue,
  value: controlledValue,
  onChange,
  variant = 'default',
  allowMultiple = false,
  className,
  children,
  ...rest
}: AccordionProps) {
  const [internalValue, setInternalValue] = useState<string[]>(() => toArray(defaultValue));
  const isControlled = controlledValue !== undefined;
  const valueArray = isControlled ? toArray(controlledValue) : internalValue;
  const expandedSet = new Set(valueArray);

  const toggle = useCallback(
    (itemValue: string) => {
      const isOpen = expandedSet.has(itemValue);
      const next = allowMultiple
        ? isOpen
          ? valueArray.filter((x) => x !== itemValue)
          : [...valueArray, itemValue]
        : isOpen
          ? []
          : [itemValue];
      if (!isControlled) setInternalValue(next);
      onChange?.(allowMultiple ? next : next[0] ?? null);
    },
    [allowMultiple, isControlled, onChange, valueArray, expandedSet]
  );

  const isOpen = useCallback((value: string) => expandedSet.has(value), [valueArray]);

  const ctx: InternalContext = {
    expanded: allowMultiple ? valueArray.join(',') : valueArray[0] ?? null,
    setExpanded: (v) => {
      const next = v == null ? [] : [v];
      if (!isControlled) setInternalValue(next);
      onChange?.(allowMultiple ? next : v);
    },
    variant,
    allowMultiple,
    toggle,
    isOpen,
  };

  return (
    <AccordionContext.Provider value={ctx}>
      <div className={cn('w-full', variant === 'separated' && 'space-y-2', className)} {...rest}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ value, className, children, ...rest }: AccordionItemProps) {
  const { variant } = useAccordion();
  return (
    <AccordionItemContext.Provider value={value}>
      <div
        className={cn(
          variant === 'bordered' && 'border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden',
          variant === 'separated' && 'border border-gray-200 dark:border-gray-700 rounded-lg',
          className
        )}
        {...rest}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({ className, children, ...rest }: AccordionTriggerProps) {
  const ctx = useAccordion();
  const itemValue = useContext(AccordionItemContext);
  if (itemValue == null) return null;
  const isOpen = ctx.isOpen(itemValue);
  return (
    <button
      type="button"
      className={cn(
        'w-full flex items-center justify-between px-4 py-3 text-left font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500',
        ctx.variant === 'bordered' && 'border-b border-gray-200 dark:border-gray-700 last:border-b-0',
        className
      )}
      aria-expanded={isOpen}
      onClick={() => ctx.toggle(itemValue)}
      {...rest}
    >
      {children}
      <span className={cn('transition-transform', isOpen && 'rotate-180')}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </button>
  );
}

export function AccordionContent({ className, children, ...rest }: AccordionContentProps) {
  const ctx = useAccordion();
  const itemValue = useContext(AccordionItemContext);
  if (itemValue == null) return null;
  const isOpen = ctx.isOpen(itemValue);
  if (!isOpen) return null;
  return (
    <div className={cn('px-4 py-3 text-gray-600 dark:text-gray-400', className)} {...rest}>
      {children}
    </div>
  );
}
