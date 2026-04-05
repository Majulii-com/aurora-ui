import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { HeadingProps, HeadingLevel } from './Heading.types';

/** Plain mode / non-aurora type scale */
const neutralSize: Record<HeadingLevel, string> = {
  1: 'text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-3xl md:text-4xl',
  2: 'text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-50 sm:text-2xl md:text-3xl',
  3: 'text-lg font-semibold text-gray-900 dark:text-gray-50 sm:text-xl md:text-2xl',
  4: 'text-base font-semibold text-gray-900 dark:text-gray-100 sm:text-lg',
  5: 'text-sm font-semibold text-gray-800 dark:text-gray-100 sm:text-base',
  6: 'text-xs font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-200 sm:text-sm',
};

/**
 * Enterprise type scale — tight negative tracking, authoritative weights.
 * Applied on top of genTextTitle (which carries color + antialiasing).
 */
const auroraLevelClass: Record<HeadingLevel, string> = {
  1: 'text-[1.875rem] font-extrabold tracking-[-0.036em] sm:text-[2.5rem] md:text-[3rem]',
  2: 'text-2xl font-bold tracking-[-0.028em] sm:text-[1.875rem] md:text-[2.25rem]',
  3: 'text-xl font-bold tracking-[-0.022em] sm:text-2xl',
  4: 'text-lg font-semibold tracking-[-0.014em] sm:text-xl',
  5: 'text-base font-semibold tracking-[-0.008em]',
  6: 'text-xs font-semibold uppercase tracking-[0.06em]',
};

export function Heading({ level = 2, className, children, ...rest }: HeadingProps) {
  const ent = useAuroraSurface();
  const Tag = `h${level}` as const;
  return (
    <Tag
      className={cn(
        'min-w-0 max-w-full',
        ent.isAurora
          ? cn(ent.genTextTitle, auroraLevelClass[level])
          : neutralSize[level],
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
