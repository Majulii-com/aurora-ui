import { forwardRef } from 'react';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { RadioProps } from './Radio.types';

const sizeClasses = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' };

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ size = 'md', label, error, plain, className, id: idProp, ...rest }, ref) => {
    const ent = useAuroraSurface(plain);
    const id = idProp ?? `aurora-radio-${Math.random().toString(36).slice(2, 9)}`;
    return (
      <label htmlFor={id} className={cn('inline-flex items-center gap-2 cursor-pointer', className)}>
        <input
          ref={ref}
          type="radio"
          id={id}
          className={cn(
            'border-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0 disabled:opacity-50',
            ent.isAurora && ent.radio,
            sizeClasses[size],
            error && 'border-red-500'
          )}
          aria-invalid={error}
          {...rest}
        />
        {label != null && <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>}
      </label>
    );
  }
);

Radio.displayName = 'Radio';
