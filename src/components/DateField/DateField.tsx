import { forwardRef } from 'react';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { DateFieldProps } from './DateField.types';

export const DateField = forwardRef<HTMLInputElement, DateFieldProps>(
  (
    {
      type = 'date',
      label,
      error,
      helperText,
      errorMessage,
      plain,
      className,
      id: idProp,
      ...rest
    },
    ref
  ) => {
    const ent = useAuroraSurface(plain);
    const id = idProp ?? `aurora-date-${Math.random().toString(36).slice(2, 9)}`;
    const msg = error ? errorMessage : helperText;
    return (
      <div className="w-full">
        {label != null && (
          <label
            htmlFor={id}
            className={cn('block mb-1 text-gray-700 dark:text-gray-300', ent.isAurora ? ent.label : 'text-sm font-medium')}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          type={type}
          aria-invalid={error}
          className={cn(
            'w-full min-w-0 rounded-lg px-3 py-2 text-gray-900 dark:text-gray-100 outline-none transition-shadow',
            'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800',
            ent.isAurora && ent.input,
            error && 'border-red-500 focus:ring-red-500/40',
            className
          )}
          {...rest}
        />
        {msg != null && (
          <p className={cn('mt-1 text-sm', error ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400')}>
            {msg}
          </p>
        )}
      </div>
    );
  }
);

DateField.displayName = 'DateField';
