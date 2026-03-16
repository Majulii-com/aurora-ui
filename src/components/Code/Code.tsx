import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { CodeProps } from './Code.types';

export const Code = forwardRef<HTMLElement, CodeProps>(
  ({ block = false, children, className, ...rest }, ref) => {
    const base = 'font-mono text-sm';
    if (block) {
      return (
        <pre
          ref={ref as React.Ref<HTMLPreElement>}
          className={cn(base, 'block w-full p-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 overflow-x-auto', className)}
          {...rest}
        >
          <code>{children}</code>
        </pre>
      );
    }
    return (
      <code
        ref={ref as React.Ref<HTMLSpanElement>}
        className={cn(base, 'inline px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200', className)}
        {...rest}
      >
        {children}
      </code>
    );
  }
);

Code.displayName = 'Code';
