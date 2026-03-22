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
    'text-white font-semibold tracking-wide antialiased bg-gradient-to-b from-primary-500 to-primary-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]',
  secondary: 'bg-stone-200/95 text-stone-800 dark:bg-stone-800 dark:text-stone-100 font-medium',
  success: variantClasses.success,
  danger: variantClasses.danger,
  warning: variantClasses.warning,
  outline:
    'border border-primary-500/80 text-primary-700 dark:text-primary-300 bg-white/90 dark:bg-stone-900/60 font-semibold',
  ghost: 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 font-medium',
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
