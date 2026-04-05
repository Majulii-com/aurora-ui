import { forwardRef } from 'react';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps } from './Card.types';
import { CardPlainContext, useCardPlain } from './CardPlainContext';

const variantClasses = {
  elevated: 'bg-white dark:bg-gray-800 shadow-md',
  outline: 'bg-transparent border-2 border-gray-200 dark:border-gray-700',
  filled: 'bg-gray-50 dark:bg-gray-800/50',
  glass:
    'border border-gray-200/80 bg-white/80 shadow-md backdrop-blur-md dark:border-gray-700/50 dark:bg-gray-900/60',
};

/** Aurora glass — frosted, clean. No teal tinting. */
const auroraGlassClass =
  'border border-zinc-200/70 dark:border-white/[0.08] ' +
  'bg-white/85 dark:bg-zinc-900/75 ' +
  'shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_20px_-3px_rgba(0,0,0,0.07)] ' +
  'backdrop-blur-xl';

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'elevated', className, plain, ...rest }, ref) => {
    const ent = useAuroraSurface(plain);
    const plainVariant = !ent.isAurora || variant === 'outline' || variant === 'filled';
    return (
      <CardPlainContext.Provider value={Boolean(plain)}>
        <div
          ref={ref}
          className={cn(
            'w-full min-w-0 overflow-hidden',
            /* Enterprise radius: 12px, not 24px */
            ent.isAurora ? 'rounded-xl' : 'rounded-lg',
            ent.isAurora && variant === 'elevated' && ent.card,
            ent.isAurora && variant === 'glass' && auroraGlassClass,
            plainVariant && variantClasses[variant],
            className
          )}
          {...rest}
        />
      </CardPlainContext.Provider>
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...rest }, ref) => {
  const parentPlain = useCardPlain();
  const ent = useAuroraSurface(parentPlain);
  return (
    <div
      ref={ref}
      className={cn(
        ent.isAurora
          ? 'px-5 py-4 border-b border-zinc-100 dark:border-white/[0.06]'
          : 'px-4 py-3 border-b border-gray-200 dark:border-gray-700',
        className
      )}
      {...rest}
    />
  );
});
CardHeader.displayName = 'CardHeader';

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(({ className, ...rest }, ref) => {
  const parentPlain = useCardPlain();
  const ent = useAuroraSurface(parentPlain);
  return (
    <div
      ref={ref}
      className={cn(ent.isAurora ? 'p-5' : 'p-4', className)}
      {...rest}
    />
  );
});
CardBody.displayName = 'CardBody';

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(({ className, ...rest }, ref) => {
  const parentPlain = useCardPlain();
  const ent = useAuroraSurface(parentPlain);
  return (
    <div
      ref={ref}
      className={cn(
        ent.isAurora
          ? 'px-5 py-4 border-t border-zinc-100 dark:border-white/[0.06]'
          : 'px-4 py-3 border-t border-gray-200 dark:border-gray-700',
        className
      )}
      {...rest}
    />
  );
});
CardFooter.displayName = 'CardFooter';
