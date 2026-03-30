import { forwardRef } from 'react';
import { usePointerRipple } from '../../hooks/usePointerRipple';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { ButtonProps, ButtonVariant } from './Button.types';

function defaultRippleColor(variant: ButtonVariant): string {
  switch (variant) {
    case 'primary':
    case 'danger':
    case 'success':
      return 'rgba(255, 255, 255, 0.4)';
    case 'outline':
    case 'secondary':
      return 'rgba(13, 148, 136, 0.22)';
    case 'ghost':
    default:
      return 'rgba(15, 23, 42, 0.08)';
  }
}

const variantClasses: Record<ButtonProps['variant'] & string, string> = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 border-transparent',
  secondary: 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200 border-transparent dark:bg-secondary-700 dark:text-secondary-100',
  ghost: 'bg-transparent hover:bg-black/5 dark:hover:bg-white/5 border-transparent',
  outline: 'bg-transparent border-2 border-primary-500 text-primary-600 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400',
  danger: 'bg-red-500 text-white hover:bg-red-600 border-transparent',
  success: 'bg-green-500 text-white hover:bg-green-600 border-transparent',
};

/** Majulii / Aurora: premium enterprise variants — teal-primary gradient with rich bloom */
const auroraVariantClasses: Record<ButtonProps['variant'] & string, string> = {
  primary:
    'border-transparent text-white antialiased font-semibold tracking-wide ' +
    'bg-gradient-to-b from-teal-400 via-primary-500 to-primary-600 ' +
    'hover:from-teal-300 hover:via-teal-400 hover:to-primary-500 ' +
    'active:from-primary-600 active:to-primary-700 ' +
    'hover:-translate-y-px active:translate-y-0 ' +
    'focus:ring-primary-500/80 ' +
    'dark:from-teal-400 dark:via-primary-500 dark:to-primary-600 ' +
    'dark:hover:from-teal-300 dark:hover:via-teal-400 dark:hover:to-primary-500 ' +
    'dark:active:from-primary-600 dark:active:to-primary-700',
  secondary:
    'border-transparent text-slate-800 dark:text-stone-100 antialiased font-semibold tracking-wide ' +
    'bg-gradient-to-b from-white to-stone-100/90 ' +
    'hover:from-white hover:to-stone-50 ' +
    'dark:from-stone-800/95 dark:to-stone-900 ' +
    'dark:hover:from-stone-700/95 dark:hover:to-stone-800 ' +
    'hover:-translate-y-px backdrop-blur-sm',
  ghost:
    'border-transparent text-slate-700 dark:text-stone-200 antialiased font-medium tracking-wide ' +
    'hover:bg-stone-100/90 dark:hover:bg-white/[0.07] hover:text-slate-900 dark:hover:text-white ' +
    'active:bg-stone-200/80 dark:active:bg-white/[0.10] ' +
    'hover:-translate-y-px',
  outline:
    'border border-primary-500/80 dark:border-primary-400/65 bg-white/92 dark:bg-stone-900/60 ' +
    'text-primary-700 dark:text-primary-300 antialiased font-semibold tracking-wide ' +
    'backdrop-blur-[2px] ' +
    'hover:bg-primary-50/95 hover:border-primary-500 ' +
    'dark:hover:bg-primary-950/32 dark:hover:border-primary-300/80 ' +
    'hover:-translate-y-px',
  danger:
    'border-transparent text-white antialiased font-semibold tracking-wide ' +
    'bg-gradient-to-b from-rose-400 via-rose-500 to-rose-600 ' +
    'hover:from-rose-300 hover:via-rose-400 hover:to-rose-500 ' +
    'active:from-rose-600 active:to-rose-700 ' +
    'hover:-translate-y-px active:translate-y-0 ' +
    'focus:ring-rose-500/80',
  success:
    'border-transparent text-white antialiased font-semibold tracking-wide ' +
    'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 ' +
    'hover:from-emerald-300 hover:via-emerald-400 hover:to-emerald-500 ' +
    'active:from-emerald-600 active:to-emerald-700 ' +
    'hover:-translate-y-px active:translate-y-0 ' +
    'focus:ring-emerald-500/80',
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
      ripple: rippleProp,
      onPointerDown,
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

    const rippleOn = Boolean(rippleProp) && !isLoading && !disabled && !plain;
    const rippleOpts =
      typeof rippleProp === 'object' ?
        {
          color: rippleProp.color ?? defaultRippleColor(v),
          durationMs: rippleProp.durationMs,
        }
      : rippleOn ? { color: defaultRippleColor(v) }
      : undefined;
    const { onPointerDown: rippleDown, rippleLayer, rippleHostClassName } = usePointerRipple(
      rippleOn,
      rippleOpts
    );

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex touch-manipulation items-center justify-center border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          ent.isAurora && !plain ? 'rounded-xl font-medium' : 'rounded-lg font-medium',
          /* Primary uses only `buttonPrimary` — `button` adds a strong top inset that reads as a white “gap” on solid teal */
          entChrome && v !== 'primary' && ent.button,
          entChrome && v === 'primary' && ent.buttonPrimary,
          variantCn,
          sizeCn,
          fullWidth && 'w-full',
          rippleHostClassName,
          className
        )}
        aria-busy={isLoading}
        onPointerDown={(e) => {
          rippleDown(e);
          onPointerDown?.(e);
        }}
        {...rest}
      >
        {rippleLayer}
        <span
          className={cn(
            'relative z-[1] inline-flex items-center justify-center',
            sizeKey === 'sm' ? 'gap-1.5' : 'gap-2',
            fullWidth && 'w-full'
          )}
        >
          {isLoading ? (
            <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            leftIcon
          )}
          {children && <span>{children}</span>}
          {!isLoading && rightIcon}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';
