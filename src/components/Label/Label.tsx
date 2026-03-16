import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { LabelProps } from './Label.types';

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ required, children, className, ...rest }, ref) => (
    <label
      ref={ref}
      className={cn(
        'block text-sm font-medium text-gray-700 dark:text-gray-300',
        required && "after:content-['*'] after:ml-0.5 after:text-red-500",
        className
      )}
      {...rest}
    >
      {children}
    </label>
  )
);

Label.displayName = 'Label';
