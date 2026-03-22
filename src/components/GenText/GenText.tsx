import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { GenTextProps } from './GenText.types';

export function GenText({ children, variant = 'body', className, ...rest }: GenTextProps) {
  const ent = useAuroraSurface();
  return (
    <p
      className={cn(
        variant === 'title' &&
          (ent.isAurora
            ? ent.genTextTitle
            : 'text-xl font-semibold text-gray-900 dark:text-gray-100'),
        variant === 'muted' &&
          (ent.isAurora ? ent.genTextMuted : 'text-sm text-gray-500 dark:text-gray-400'),
        variant === 'body' &&
          (ent.isAurora ? ent.genTextBody : 'text-base text-gray-800 dark:text-gray-200'),
        className
      )}
      {...rest}
    >
      {children}
    </p>
  );
}
