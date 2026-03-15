import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { TextareaProps } from './Textarea.types';

const sizeClasses = { sm: 'py-2 px-3 text-sm', md: 'py-2.5 px-3 text-base', lg: 'py-3 px-4 text-lg' };
const variantClasses = {
  default: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800',
  outline: 'border-2 border-primary-500 bg-transparent',
  filled: 'border-0 bg-gray-100 dark:bg-gray-700',
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = 'md',
      variant = 'default',
      error,
      label,
      helperText,
      errorMessage,
      className,
      id: idProp,
      ...rest
    },
    ref
  ) => {
    const id = idProp ?? `aurora-textarea-${Math.random().toString(36).slice(2, 9)}`;
    const msg = error ? errorMessage : helperText;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            'w-full rounded-lg resize-y min-h-[80px] text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50',
            sizeClasses[size],
            variantClasses[variant],
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          aria-invalid={error}
          aria-describedby={msg ? `${id}-desc` : undefined}
          {...rest}
        />
        {msg && (
          <p id={`${id}-desc`} className={cn('mt-1 text-sm', error ? 'text-red-600' : 'text-gray-500')}>
            {msg}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
