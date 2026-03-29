import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { HeadingProps, HeadingLevel } from './Heading.types';

const neutralSize: Record<HeadingLevel, string> = {
  1: 'text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50',
  2: 'text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-50',
  3: 'text-xl font-semibold text-gray-900 dark:text-gray-50',
  4: 'text-lg font-semibold text-gray-900 dark:text-gray-100',
  5: 'text-base font-semibold text-gray-800 dark:text-gray-100',
  6: 'text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-200',
};

export function Heading({ level = 2, className, children, ...rest }: HeadingProps) {
  const ent = useAuroraSurface();
  const Tag = `h${level}` as const;
  return (
    <Tag
      className={cn(
        ent.isAurora
          ? cn(
              ent.genTextTitle,
              level === 1 && 'text-3xl font-bold tracking-tight',
              level === 2 && 'text-2xl font-semibold tracking-tight',
              level === 3 && 'text-xl font-semibold',
              level === 4 && 'text-lg font-semibold',
              level >= 5 && 'text-base font-semibold'
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
