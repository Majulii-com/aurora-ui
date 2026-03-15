import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { SelectProps } from './Select.types';

const sizeClasses = { sm: 'h-8 text-sm', md: 'h-10 text-base', lg: 'h-12 text-lg' };
const variantClasses = {
  default: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800',
  outline: 'border-2 border-primary-500 bg-transparent',
  filled: 'border-0 bg-gray-100 dark:bg-gray-700',
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      size = 'md',
      variant = 'default',
      options,
      placeholder,
      label,
      error,
      helperText,
      errorMessage,
      className,
      id: idProp,
      ...rest
    },
    ref
  ) => {
    const id = idProp ?? `aurora-select-${Math.random().toString(36).slice(2, 9)}`;
    const msg = error ? errorMessage : helperText;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          className={cn(
            'w-full rounded-lg px-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 appearance-none bg-no-repeat bg-right',
            sizeClasses[size],
            variantClasses[variant],
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em', paddingRight: '2rem' }}
          aria-invalid={error}
          aria-describedby={msg ? `${id}-desc` : undefined}
          {...rest}
        >
          {placeholder != null && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        {msg && (
          <p id={`${id}-desc`} className={cn('mt-1 text-sm', error ? 'text-red-600' : 'text-gray-500')}>
            {msg}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
