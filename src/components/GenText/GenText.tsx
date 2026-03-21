import { cn } from '../../utils';
import type { GenTextProps } from './GenText.types';

export function GenText({ children, variant = 'body', className, ...rest }: GenTextProps) {
  return (
    <p
      className={cn(
        variant === 'title' && 'text-xl font-semibold text-gray-900 dark:text-gray-100',
        variant === 'muted' && 'text-sm text-gray-500 dark:text-gray-400',
        variant === 'body' && 'text-base text-gray-800 dark:text-gray-200',
        className
      )}
      {...rest}
    >
      {children}
    </p>
  );
}
