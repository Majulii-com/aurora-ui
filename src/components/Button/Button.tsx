import { forwardRef } from 'react';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { ButtonProps } from './Button.types';

const variantClasses: Record<ButtonProps['variant'] & string, string> = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 border-transparent',
  secondary: 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200 border-transparent dark:bg-secondary-700 dark:text-secondary-100',
  ghost: 'bg-transparent hover:bg-black/5 dark:hover:bg-white/5 border-transparent',
  outline: 'bg-transparent border-2 border-primary-500 text-primary-600 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400',
  danger: 'bg-red-500 text-white hover:bg-red-600 border-transparent',
  success: 'bg-green-500 text-white hover:bg-green-600 border-transparent',
};

/** Majulii / Aurora: solid teal primary (enterprise — avoids loud “pill gradient”) */
const auroraVariantClasses: Record<ButtonProps['variant'] & string, string> = {
  primary:
    'border-transparent text-white antialiased font-semibold tracking-wide ' +
    'bg-primary-600 ' +
    'hover:bg-primary-700 active:bg-primary-800 ' +
    'focus:ring-primary-500/90 dark:bg-primary-600 dark:hover:bg-primary-500 dark:active:bg-primary-700',
  secondary:
    'border-transparent text-slate-800 dark:text-stone-100 antialiased font-semibold tracking-wide ' +
    'bg-gradient-to-b from-stone-100 to-stone-200/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] ' +
    'hover:from-stone-200 hover:to-stone-300/90 ' +
    'dark:from-stone-800 dark:to-stone-900 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ' +
    'dark:hover:from-stone-700 dark:hover:to-stone-800',
  ghost:
    'border-transparent text-slate-700 dark:text-stone-200 antialiased font-medium tracking-wide ' +
    'hover:bg-stone-100/95 dark:hover:bg-white/[0.07] hover:text-slate-900 dark:hover:text-white',
  outline:
    'border border-primary-500/85 dark:border-primary-400/70 bg-white/90 dark:bg-stone-900/60 ' +
    'text-primary-700 dark:text-primary-300 antialiased font-semibold tracking-wide ' +
    'backdrop-blur-[2px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-none ' +
    'hover:bg-primary-50/95 hover:border-primary-600 dark:hover:bg-primary-950/35 dark:hover:border-primary-300',
  danger:
    'border-transparent text-white antialiased font-semibold tracking-wide ' +
    'bg-gradient-to-b from-rose-500 to-rose-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] ' +
    'hover:from-rose-600 hover:to-rose-800 focus:ring-rose-500',
  success:
    'border-transparent text-white antialiased font-semibold tracking-wide ' +
    'bg-gradient-to-b from-emerald-500 to-emerald-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] ' +
    'hover:from-emerald-600 hover:to-emerald-800 focus:ring-emerald-500',
};

const sizeClasses: Record<ButtonProps['size'] & string, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-base gap-2',
  lg: 'px-6 py-3 text-lg gap-2',
};

/** Slightly larger type — rounded-xl shells (see className merge) */
const auroraButtonSizeClasses: Record<ButtonProps['size'] & string, string> = {
  sm: 'px-3 py-1.5 text-xs gap-1.5 min-h-[32px] font-semibold tracking-wide',
  md: 'px-4 py-2.5 text-sm gap-2 leading-snug min-h-[38px] font-semibold tracking-wide',
  lg: 'px-5 py-3 text-base gap-2 min-h-[44px] font-semibold tracking-wide',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant: v = 'primary',
      size = 'md',
      fullWidth,
      isLoading,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      plain,
      ...rest
    },
    ref
  ) => {
    const ent = useAuroraSurface(plain);
    const entChrome = ent.isAurora && v !== 'ghost';
    const sizeKey = size ?? 'md';
    const sizeCn = ent.isAurora && !plain ? auroraButtonSizeClasses[sizeKey] : sizeClasses[sizeKey];
    const variantCn =
      ent.isAurora && !plain
        ? (auroraVariantClasses[v] ?? auroraVariantClasses.primary)
        : (variantClasses[v] ?? variantClasses.primary);
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          ent.isAurora && !plain ? 'rounded-xl font-medium' : 'rounded-lg font-medium',
          /* Primary uses only `buttonPrimary` — `button` adds a strong top inset that reads as a white “gap” on solid teal */
          entChrome && v !== 'primary' && ent.button,
          entChrome && v === 'primary' && ent.buttonPrimary,
          variantCn,
          sizeCn,
          fullWidth && 'w-full',
          className
        )}
        aria-busy={isLoading}
        {...rest}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          leftIcon
        )}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
