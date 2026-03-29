import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { HeadingProps, HeadingLevel } from './Heading.types';

/** Mobile-first type scale — avoids oversized display text on narrow viewports. */
const neutralSize: Record<HeadingLevel, string> = {
  1: 'text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-3xl md:text-4xl',
  2: 'text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-50 sm:text-2xl md:text-3xl',
  3: 'text-lg font-semibold text-gray-900 dark:text-gray-50 sm:text-xl md:text-2xl',
  4: 'text-base font-semibold text-gray-900 dark:text-gray-100 sm:text-lg',
  5: 'text-sm font-semibold text-gray-800 dark:text-gray-100 sm:text-base',
  6: 'text-xs font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-200 sm:text-sm',
};

export function Heading({ level = 2, className, children, ...rest }: HeadingProps) {
  const ent = useAuroraSurface();
  const Tag = `h${level}` as const;
  return (
    <Tag
      className={cn(
        'min-w-0 max-w-full',
        ent.isAurora
          ? cn(
              ent.genTextTitle,
              level === 1 && 'text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl',
              level === 2 && 'text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl',
              level === 3 && 'text-lg font-semibold sm:text-xl md:text-2xl',
              level === 4 && 'text-base font-semibold sm:text-lg',
              level >= 5 && 'text-sm font-semibold sm:text-base'
            )
          : neutralSize[level],
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
