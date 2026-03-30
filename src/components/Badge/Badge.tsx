import { forwardRef } from 'react';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { BadgeProps } from './Badge.types';

const variantClasses: Record<BadgeProps['variant'] & string, string> = {
  primary: 'bg-primary-500 text-white',
  secondary: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
  success: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
  danger: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200',
  warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200',
  outline: 'border-2 border-primary-500 text-primary-600 dark:text-primary-400 bg-transparent',
  ghost: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
};

const auroraBadgeVariants: Record<BadgeProps['variant'] & string, string> = {
  primary:
    'text-white font-semibold tracking-wide antialiased ' +
    'bg-gradient-to-b from-primary-500 to-primary-700 ' +
    'shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_1px_3px_rgba(13,148,136,0.20)]',
  secondary:
    'bg-gradient-to-b from-stone-100 to-stone-200/90 dark:from-stone-800 dark:to-stone-900 ' +
    'text-stone-700 dark:text-stone-100 font-semibold',
  success:
    'bg-gradient-to-b from-emerald-100/95 to-emerald-200/80 dark:from-emerald-950/80 dark:to-emerald-900/70 ' +
    'text-emerald-800 dark:text-emerald-200 font-semibold ' +
    'border border-emerald-300/60 dark:border-emerald-700/40',
  danger:
    'bg-gradient-to-b from-rose-100/95 to-rose-200/80 dark:from-rose-950/80 dark:to-rose-900/70 ' +
    'text-rose-700 dark:text-rose-200 font-semibold ' +
    'border border-rose-300/60 dark:border-rose-800/40',
  warning:
    'bg-gradient-to-b from-amber-100/95 to-amber-200/80 dark:from-amber-950/80 dark:to-amber-900/70 ' +
    'text-amber-800 dark:text-amber-200 font-semibold ' +
    'border border-amber-300/65 dark:border-amber-700/40',
  outline:
    'border border-primary-500/75 dark:border-primary-400/55 ' +
    'text-primary-700 dark:text-primary-300 bg-white/88 dark:bg-stone-900/55 font-semibold',
  ghost:
    'bg-stone-100/90 dark:bg-stone-800/90 text-stone-700 dark:text-stone-200 font-medium ' +
    'border border-stone-200/60 dark:border-stone-700/40',
};

const sizeClasses = { sm: 'px-1.5 py-0 text-xs', md: 'px-2.5 py-0.5 text-sm', lg: 'px-3 py-1 text-base' };

const auroraBadgeSizeClasses = {
  sm: 'px-1.5 py-px text-[10px] leading-tight',
  md: 'px-2 py-0.5 text-xs',
  lg: 'px-2.5 py-0.5 text-xs',
} as const;

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'primary', size = 'md', className, plain, ...rest }, ref) => {
    const ent = useAuroraSurface(plain);
    const sizeKey = size ?? 'md';
    const sizeCn = ent.isAurora && !plain ? auroraBadgeSizeClasses[sizeKey] : sizeClasses[sizeKey];
    const variantCn =
      ent.isAurora && !plain
        ? (auroraBadgeVariants[variant] ?? auroraBadgeVariants.primary)
        : (variantClasses[variant] ?? variantClasses.primary);
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium rounded-full',
          ent.badge,
          variantCn,
          sizeCn,
          className
        )}
        {...rest}
      />
    );
  }
);

Badge.displayName = 'Badge';
