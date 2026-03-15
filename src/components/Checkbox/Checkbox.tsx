import { forwardRef, useEffect, useRef } from 'react';
import { cn } from '../../utils';
import type { CheckboxProps } from './Checkbox.types';

const sizeClasses = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' };

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ size = 'md', label, error, indeterminate, className, id: idProp, ...rest }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const id = idProp ?? `aurora-checkbox-${Math.random().toString(36).slice(2, 9)}`;

    const setRef = (el: HTMLInputElement | null) => {
      (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
    };

    useEffect(() => {
      const input = inputRef.current;
      if (input) input.indeterminate = !!indeterminate;
    }, [indeterminate]);

    return (
      <label htmlFor={id} className={cn('inline-flex items-center gap-2 cursor-pointer', className)}>
        <input
          ref={setRef}
          type="checkbox"
          id={id}
          className={cn(
            'rounded border-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0 disabled:opacity-50',
            sizeClasses[size],
            error && 'border-red-500'
          )}
          aria-invalid={error}
          aria-checked={indeterminate ? 'mixed' : undefined}
          {...rest}
        />
        {label != null && <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
