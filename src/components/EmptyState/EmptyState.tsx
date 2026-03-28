import { useAuroraSurface } from '../../theme/useAuroraSurface';
import { cn } from '../../utils';
import type { EmptyStateProps } from './EmptyState.types';

const defaultIcon = (
  <svg
    className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.5m-2.5 0h-5m5 0v5"
    />
  </svg>
);

export function EmptyState({
  icon = defaultIcon,
  title,
  description,
  action,
  className,
  plain,
}: EmptyStateProps) {
  const ent = useAuroraSurface(plain);
  const premium = ent.isAurora && !plain;
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}>
      {icon && (
        <div className={cn('mb-4', premium && 'inline-flex', premium && ent.emptyStateIcon)}>{icon}</div>
      )}
      {title && (
        <h3
          className={cn(
            'mb-1',
            premium ? ent.emptyStateTitle : 'text-lg font-medium text-gray-900 dark:text-gray-100'
          )}
        >
          {title}
        </h3>
      )}
      {description && (
        <p className={cn('max-w-sm mb-4', premium ? ent.emptyStateBody : 'text-sm text-gray-500 dark:text-gray-400')}>
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
