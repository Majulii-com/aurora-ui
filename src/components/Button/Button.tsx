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
      return 'rgba(255, 255, 255, 0.35)';
    case 'outline':
    case 'secondary':
      return 'rgba(13, 148, 136, 0.18)';
    case 'ghost':
    default:
      return 'rgba(0, 0, 0, 0.06)';
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

/** Enterprise grade — clean, intentional. Solid gradients for depth, zinc for neutrals. */
const auroraVariantClasses: Record<ButtonProps['variant'] & string, string> = {
  primary:
    'border-transparent text-white antialiased font-semibold tracking-[-0.01em] ' +
    'bg-gradient-to-b from-teal-500 to-teal-700 ' +
    'hover:from-teal-400 hover:to-teal-600 active:from-teal-700 active:to-teal-800 ' +
    'focus:ring-teal-500/40 ' +
    'dark:from-teal-500 dark:to-teal-700 ' +
    'dark:hover:from-teal-400 dark:hover:to-teal-600 ' +
    'dark:active:from-teal-700 dark:active:to-teal-800',
  secondary:
    'border-transparent text-zinc-800 dark:text-zinc-100 antialiased font-medium tracking-[-0.01em] ' +
    'bg-white dark:bg-zinc-800/90 ' +
    'hover:bg-zinc-50 dark:hover:bg-zinc-700/80',
  ghost:
    'border-transparent text-zinc-600 dark:text-zinc-400 antialiased font-medium ' +
    'hover:bg-zinc-100/80 dark:hover:bg-white/[0.06] ' +
    'hover:text-zinc-900 dark:hover:text-zinc-100 active:bg-zinc-200/70',
  outline:
    'border border-zinc-300/80 dark:border-zinc-600/60 bg-transparent ' +
    'text-zinc-800 dark:text-zinc-200 antialiased font-medium ' +
    'hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 ' +
    'hover:border-zinc-400 dark:hover:border-zinc-500',
  danger:
    'border-transparent text-white antialiased font-semibold tracking-[-0.01em] ' +
    'bg-gradient-to-b from-red-500 to-red-700 ' +
    'hover:from-red-400 hover:to-red-600 active:from-red-700 active:to-red-800 ' +
    'focus:ring-red-500/40',
  success:
    'border-transparent text-white antialiased font-semibold tracking-[-0.01em] ' +
    'bg-gradient-to-b from-emerald-500 to-emerald-700 ' +
    'hover:from-emerald-400 hover:to-emerald-600 active:from-emerald-700 active:to-emerald-800 ' +
    'focus:ring-emerald-500/40',
};

const sizeClasses: Record<ButtonProps['size'] & string, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-base gap-2',
  lg: 'px-6 py-3 text-lg gap-2',
};

/** Enterprise scale: fixed heights, tight type, no excess padding */
const auroraButtonSizeClasses: Record<ButtonProps['size'] & string, string> = {
  sm: 'h-7 px-3 text-xs gap-1.5 font-medium',
  md: 'h-9 px-3.5 text-sm gap-2 font-semibold',
  lg: 'h-11 px-5 text-sm gap-2 font-semibold',
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
          'inline-flex cursor-pointer touch-manipulation items-center justify-center border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          ent.isAurora && !plain ? 'rounded-lg' : 'rounded-md',
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
            <span className="inline-block w-3.5 h-3.5 border-[1.5px] border-current border-t-transparent rounded-full animate-spin" />
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
