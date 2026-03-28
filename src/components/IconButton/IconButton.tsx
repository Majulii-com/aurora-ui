import { forwardRef } from 'react';
import { usePointerRipple } from '../../hooks/usePointerRipple';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { IconButtonProps, IconButtonVariant } from './IconButton.types';

function iconRippleColor(variant: IconButtonVariant): string {
  switch (variant) {
    case 'solid':
      return 'rgba(255, 255, 255, 0.35)';
    case 'outline':
      return 'rgba(13, 148, 136, 0.2)';
    case 'ghost':
    default:
      return 'rgba(13, 148, 136, 0.16)';
  }
}

const variantClasses: Record<NonNullable<IconButtonProps['variant']>, string> = {
  ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700/50',
  outline: 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800',
  solid: 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600',
};

const auroraIconVariantClasses: Record<NonNullable<IconButtonProps['variant']>, string> = {
  ghost: 'text-stone-600 dark:text-stone-300 hover:bg-stone-100/95 dark:hover:bg-white/[0.08]',
  outline:
    'border border-stone-300/90 dark:border-stone-600 bg-white/90 dark:bg-stone-900/50 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800',
  solid:
    'border-transparent bg-gradient-to-b from-stone-100 to-stone-200/95 text-stone-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] hover:from-stone-200 hover:to-stone-300/90 dark:from-stone-800 dark:to-stone-900 dark:text-stone-100 dark:hover:from-stone-700 dark:hover:to-stone-800',
};

const sizeClasses: Record<NonNullable<IconButtonProps['size']>, string> = {
  sm: 'w-8 h-8 p-1.5',
  md: 'w-10 h-10 p-2',
  lg: 'w-12 h-12 p-2.5',
};

const auroraIconSizeClasses: Record<NonNullable<IconButtonProps['size']>, string> = {
  sm: 'w-7 h-7 p-1',
  md: 'w-8 h-8 p-1.5',
  lg: 'w-10 h-10 p-2',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant = 'ghost',
      size = 'md',
      className,
      children,
      plain,
      ripple: rippleProp,
      onPointerDown,
      disabled,
      ...rest
    },
    ref
  ) => {
    const ent = useAuroraSurface(plain);
    const sizeKey = size ?? 'md';
    const sizeCn = ent.isAurora && !plain ? auroraIconSizeClasses[sizeKey] : sizeClasses[sizeKey];
    const variantCn =
      ent.isAurora && !plain ? auroraIconVariantClasses[variant] : variantClasses[variant];

    const rippleOn = Boolean(rippleProp) && !disabled && !plain;
    const rippleOpts =
      typeof rippleProp === 'object' ?
        { color: rippleProp.color ?? iconRippleColor(variant), durationMs: rippleProp.durationMs }
      : rippleOn ? { color: iconRippleColor(variant) }
      : undefined;
    const { onPointerDown: rippleDown, rippleLayer, rippleHostClassName } = usePointerRipple(
      rippleOn,
      rippleOpts
    );

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          ent.isAurora && !plain ? 'rounded-xl' : 'rounded-lg',
          ent.iconButton,
          variantCn,
          sizeCn,
          rippleHostClassName,
          className
        )}
        onPointerDown={(e) => {
          rippleDown(e);
          onPointerDown?.(e);
        }}
        {...rest}
      >
        {rippleLayer}
        <span className="relative z-[1] inline-flex items-center justify-center">{children}</span>
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
