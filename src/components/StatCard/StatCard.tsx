import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { StatCardProps } from './StatCard.types';

const trendClasses = {
  up: 'text-green-600 dark:text-green-400',
  down: 'text-red-600 dark:text-red-400',
  neutral: 'text-gray-500 dark:text-gray-400',
};

const trendIcons = {
  up: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  ),
  down: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  ),
  neutral: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
    </svg>
  ),
};

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  ({ title, value, trend, trendLabel, subtitle, icon, className }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm',
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-gray-100 tabular-nums">
            {value}
          </p>
          {(trend != null || trendLabel) && (
            <div className="mt-1 flex items-center gap-1.5">
              {trend != null && (
                <span className={cn('flex items-center', trendClasses[trend])} aria-hidden>
                  {trendIcons[trend]}
                </span>
              )}
              {trendLabel != null && (
                <span className={cn('text-sm', trend != null && trendClasses[trend])}>
                  {trendLabel}
                </span>
              )}
            </div>
          )}
          {subtitle != null && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
          )}
        </div>
        {icon != null && <div className="shrink-0 opacity-80">{icon}</div>}
      </div>
    </div>
  )
);

StatCard.displayName = 'StatCard';
