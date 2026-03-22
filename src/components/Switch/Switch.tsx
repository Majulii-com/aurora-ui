import { forwardRef } from 'react';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { SwitchProps } from './Switch.types';

const trackSizes = { sm: 'h-5 w-9', md: 'h-6 w-11', lg: 'h-7 w-14' };
const thumbSizes = { sm: 'h-4 w-4 translate-x-0.5 peer-checked:translate-x-4', md: 'h-5 w-5 translate-x-0.5 peer-checked:translate-x-5', lg: 'h-6 w-6 translate-x-1 peer-checked:translate-x-7' };

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ size = 'md', label, className, id: idProp, ...rest }, ref) => {
    const ent = useAuroraSurface();
    const id = idProp ?? `aurora-switch-${Math.random().toString(36).slice(2, 9)}`;
    return (
      <label htmlFor={id} className={cn('inline-flex items-center gap-2 cursor-pointer', className)}>
        <div className="relative inline-flex">
          <input
            ref={ref}
            type="checkbox"
            id={id}
            role="switch"
            aria-checked={rest.checked}
            className="peer sr-only"
            {...rest}
          />
          <span
            className={cn(
              'flex rounded-full bg-gray-200 dark:bg-gray-600 transition-colors peer-checked:bg-primary-500',
              trackSizes[size],
              ent.isAurora && ent.switchTrack
            )}
            aria-hidden
          />
          <span
            className={cn(
              'absolute left-0.5 top-1/2 -translate-y-1/2 rounded-full bg-white shadow transition-transform',
              thumbSizes[size],
              ent.isAurora && ent.switchThumb
            )}
            aria-hidden
          />
        </div>
        {label != null && <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>}
      </label>
    );
  }
);

Switch.displayName = 'Switch';
