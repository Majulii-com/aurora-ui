import { forwardRef } from 'react';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { InputProps } from './Input.types';

const sizeClasses = { sm: 'h-8 text-sm', md: 'h-10 text-base', lg: 'h-12 text-lg' };

const auroraInputSizeClasses = { sm: 'h-9 text-sm', md: 'h-10 text-[15px]', lg: 'h-11 text-base' };
const variantClasses = {
  default: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800',
  outline: 'border-2 border-primary-500 bg-transparent',
  filled: 'border-0 bg-gray-100 dark:bg-gray-700',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      variant = 'default',
      error,
      leftAddon,
      rightAddon,
      label,
      helperText,
      errorMessage,
      className,
      id: idProp,
      plain,
      ...rest
    },
    ref
  ) => {
    const ent = useAuroraSurface(plain);
    const sizeKey = size ?? 'md';
    const inputSizeCn = ent.isAurora && !plain ? auroraInputSizeClasses[sizeKey] : sizeClasses[sizeKey];
    const id = idProp ?? `aurora-input-${Math.random().toString(36).slice(2, 9)}`;
    const msg = error ? errorMessage : helperText;
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className={cn(
              'block mb-1 text-gray-700 dark:text-gray-300',
              ent.isAurora ? ent.label : 'text-sm font-medium'
            )}
          >
            {label}
          </label>
        )}
        <div className="relative flex">
          {leftAddon && (
            <div className="absolute left-0 top-0 bottom-0 flex items-center pl-3 text-gray-500">
              {leftAddon}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            className={cn(
              'w-full rounded-lg px-3 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50',
              ent.input,
              inputSizeCn,
              variantClasses[variant],
              leftAddon && 'pl-10',
              rightAddon && 'pr-10',
              error && 'border-red-500 focus:ring-red-500',
              className
            )}
            aria-invalid={error}
            aria-describedby={msg ? `${id}-desc` : undefined}
            {...rest}
          />
          {rightAddon && (
            <div className="absolute right-0 top-0 bottom-0 flex items-center pr-3 text-gray-500">
              {rightAddon}
            </div>
          )}
        </div>
        {msg && (
          <p
            id={`${id}-desc`}
            className={cn('mt-1', ent.isAurora && !plain ? 'text-xs' : 'text-sm', error ? 'text-red-600' : 'text-gray-500')}
          >
            {msg}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
