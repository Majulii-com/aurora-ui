import { forwardRef } from 'react';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import { cn } from '../../utils';
import type { StatCardProps } from './StatCard.types';

const trendClasses = {
  up: 'text-emerald-600 dark:text-emerald-400',
  down: 'text-rose-600 dark:text-rose-400',
  neutral: 'text-slate-500 dark:text-teal-300/70',
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
  ({ title, value, trend, trendLabel, subtitle, icon, className, plain }, ref) => {
    const ent = useAuroraSurface(plain);
    const premium = ent.isAurora && !plain;
    return (
      <div
        ref={ref}
        className={cn(
          premium ?
            ent.statCard
          : 'w-full min-w-0 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm',
          className
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p
              className={cn(
                'text-sm truncate',
                premium ?
                  'font-semibold tracking-wide text-teal-900/72 dark:text-teal-200/80'
                : 'font-medium text-gray-500 dark:text-gray-400'
              )}
            >
              {title}
            </p>
            <p
              className={cn(
                'mt-1 text-2xl font-semibold tabular-nums tracking-tight',
                premium ?
                  'text-[#061018] dark:text-teal-50 [text-shadow:0_1px_0_rgba(255,255,255,0.35)] dark:[text-shadow:0_0_24px_rgba(45,212,191,0.12)]'
                : 'text-gray-900 dark:text-gray-100'
              )}
            >
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
              <p
                className={cn(
                  'mt-1 text-xs',
                  premium ? 'text-slate-500 dark:text-teal-200/65' : 'text-gray-500 dark:text-gray-400'
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
          {icon != null && (
            <div className={cn('shrink-0', premium ? 'opacity-90 text-primary-600 dark:text-teal-300' : 'opacity-80')}>
              {icon}
            </div>
          )}
        </div>
      </div>
    );
  }
);

StatCard.displayName = 'StatCard';
