import { useMemo, useState, useId, type MouseEvent } from 'react';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import { Popover } from '../Popover';
import { Input } from '../Input';
import { Badge } from '../Badge';
import { CloseIcon } from '../../icons';
import type { MultiSelectProps } from './MultiSelect.types';

const triggerSize: Record<NonNullable<MultiSelectProps['size']>, string> = {
  sm: 'min-h-[36px] px-2.5 py-1.5 text-sm',
  md: 'min-h-[40px] px-3 py-2 text-[15px]',
  lg: 'min-h-[44px] px-3.5 py-2.5 text-base',
};

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = 'Select…',
  label,
  size = 'md',
  searchable = true,
  searchPlaceholder = 'Search…',
  disabled,
  error,
  helperText,
  errorMessage,
  className,
  maxListHeightClassName = 'max-h-56',
  popoverPlacement = 'bottom-start',
  renderValue,
  plain,
}: MultiSelectProps) {
  const ent = useAuroraSurface(plain);
  const id = useId();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');

  const byValue = useMemo(() => new Map(options.map((o) => [o.value, o])), [options]);

  const selectedOpts = useMemo(
    () => value.map((v) => byValue.get(v)).filter(Boolean) as MultiSelectProps['options'],
    [value, byValue]
  );

  const filtered = useMemo(() => {
    if (!q.trim()) return options;
    const ql = q.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(ql) || o.value.toLowerCase().includes(ql));
  }, [options, q]);

  const toggle = (v: string) => {
    if (value.includes(v)) onChange(value.filter((x) => x !== v));
    else onChange([...value, v]);
  };

  const remove = (v: string, e: MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((x) => x !== v));
  };

  const msg = error ? errorMessage : helperText;
  const sizeCn = triggerSize[size];

  return (
    <div className={cn('w-full', className)}>
      {label ? (
        <label htmlFor={id} className={cn('block mb-1.5', ent.isAurora && !plain ? ent.label : 'text-sm font-medium text-gray-700 dark:text-gray-300')}>
          {label}
        </label>
      ) : null}
      <Popover
        isOpen={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) setQ('');
        }}
        placement={popoverPlacement}
        className="w-full"
        trigger={
          <button
            id={label ? id : undefined}
            type="button"
            disabled={disabled}
            aria-expanded={open}
            aria-haspopup="listbox"
            className={cn(
              'w-full flex flex-wrap items-center gap-1.5 text-left rounded-xl border transition-shadow',
              'focus:outline-none focus:ring-2 focus:ring-primary-500/35 focus:border-transparent',
              ent.isAurora && !plain ? ent.input : 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800',
              sizeCn,
              disabled && 'opacity-50 pointer-events-none',
              error && 'border-red-500 focus:ring-red-500'
            )}
          >
            {renderValue ? (
              renderValue(selectedOpts)
            ) : selectedOpts.length === 0 ? (
              <span className="text-slate-500 dark:text-slate-400 flex-1">{placeholder}</span>
            ) : (
              <>
                {selectedOpts.map((o) => (
                  <Badge key={o.value} variant="secondary" size="sm" className="gap-1 pr-1">
                    <span>{o.label}</span>
                    <span
                      role="button"
                      tabIndex={0}
                      className="inline-flex rounded hover:bg-black/10 p-0.5"
                      onClick={(e) => remove(o.value, e)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          remove(o.value, e as unknown as MouseEvent);
                        }
                      }}
                      aria-label={`Remove ${o.label}`}
                    >
                      <CloseIcon className="w-3 h-3" />
                    </span>
                  </Badge>
                ))}
              </>
            )}
            <span className="ml-auto shrink-0 text-slate-400 text-xs">{open ? '▲' : '▼'}</span>
          </button>
        }
      >
        <div className="p-0 min-w-[var(--radix-width,12rem)] w-full max-w-md" onMouseDown={(e) => e.stopPropagation()}>
          {searchable ? (
            <div className="px-2 pt-2 pb-2 border-b border-stone-200/80 dark:border-stone-600/80">
              <Input
                size="sm"
                placeholder={searchPlaceholder}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
          ) : null}
          <ul
            role="listbox"
            aria-multiselectable
            className={cn('overflow-y-auto py-1 px-1', maxListHeightClassName)}
          >
            {filtered.length === 0 ? (
              <li className="px-2 py-3 text-sm text-slate-500 text-center">No options</li>
            ) : (
              filtered.map((opt) => {
                const checked = value.includes(opt.value);
                return (
                  <li key={opt.value} role="option" aria-selected={checked}>
                    <label
                      className={cn(
                        'flex items-center gap-2.5 px-2 py-2 rounded-lg cursor-pointer text-sm text-slate-800 dark:text-slate-100',
                        'hover:bg-stone-100 dark:hover:bg-stone-700/80',
                        opt.disabled && 'opacity-50 pointer-events-none'
                      )}
                    >
                      <input
                        type="checkbox"
                        className="rounded border-stone-300 text-primary-600 focus:ring-primary-500"
                        checked={checked}
                        disabled={opt.disabled}
                        onChange={() => !opt.disabled && toggle(opt.value)}
                      />
                      <span className="flex-1">{opt.label}</span>
                    </label>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </Popover>
      {msg ? (
        <p className={cn('mt-1.5', ent.isAurora && !plain ? 'text-sm' : 'text-sm', error ? 'text-red-600' : 'text-slate-500')}>
          {msg}
        </p>
      ) : null}
    </div>
  );
}
