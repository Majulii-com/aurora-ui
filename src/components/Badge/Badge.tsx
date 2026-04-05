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

/**
 * Enterprise badges — flat solid status chips. GitHub, Linear, Stripe style.
 * No gradients. Color fills the background directly at low opacity, border at full opacity.
 */
const auroraBadgeVariants: Record<BadgeProps['variant'] & string, string> = {
  primary:
    'bg-teal-600 text-white font-medium antialiased',
  secondary:
    'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 ' +
    'border border-zinc-200 dark:border-zinc-700/60',
  success:
    'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 ' +
    'border border-emerald-200 dark:border-emerald-800/60',
  danger:
    'bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-400 ' +
    'border border-red-200 dark:border-red-800/60',
  warning:
    'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-500 ' +
    'border border-amber-200 dark:border-amber-800/60',
  outline:
    'border border-teal-600/60 dark:border-teal-500/50 ' +
    'text-teal-700 dark:text-teal-400 bg-transparent',
  ghost:
    'bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400',
};

const sizeClasses = { sm: 'px-1.5 py-0 text-xs', md: 'px-2.5 py-0.5 text-sm', lg: 'px-3 py-1 text-base' };

const auroraBadgeSizeClasses = {
  sm: 'h-[18px] px-1.5 text-[10px] font-medium',
  md: 'h-5 px-2 text-[11px] font-medium',
  lg: 'h-6 px-2.5 text-xs font-medium',
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
          'inline-flex items-center rounded-full antialiased',
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
