import { forwardRef } from 'react';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { LabelProps } from './Label.types';

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ required, children, className, ...rest }, ref) => {
    const ent = useAuroraSurface();
    return (
      <label
        ref={ref}
        className={cn(
          'block text-gray-700 dark:text-gray-300',
          ent.isAurora ? ent.label : 'text-sm font-medium',
          required && "after:content-['*'] after:ml-0.5 after:text-red-500",
          className
        )}
        {...rest}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = 'Label';
