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
    'border border-stone-200/80 bg-white/80 shadow-aurora-md backdrop-blur-md dark:border-stone-600/45 dark:bg-stone-900/55',
};

/** Aurora glass variant — frosted surface with teal-tinted gradient and strong backdrop blur */
const auroraGlassClass =
  'border border-stone-200/58 dark:border-teal-800/25 ' +
  'bg-gradient-to-br from-white/92 via-teal-50/22 to-white/88 ' +
  'dark:from-stone-900/85 dark:via-teal-950/30 dark:to-stone-950/88 ' +
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.90),0_4px_16px_rgba(15,23,42,0.08),0_16px_40px_rgba(15,23,42,0.06)] ' +
  'ring-1 ring-white/70 dark:ring-teal-500/10 backdrop-blur-xl';

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'elevated', className, plain, ...rest }, ref) => {
    const ent = useAuroraSurface(plain);
    /* When aurora is active, the elevated variant uses ent.card which already contains
       the full gradient + shadow + ring — skip the plain variantClasses to avoid bg-white override */
    const plainVariant = !ent.isAurora || variant === 'outline' || variant === 'filled';
    return (
      <CardPlainContext.Provider value={Boolean(plain)}>
        <div
          ref={ref}
          className={cn(
            'w-full min-w-0 overflow-hidden rounded-lg',
            ent.isAurora && 'rounded-[1.5rem]',
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
        'border-b border-gray-200 dark:border-gray-700',
        ent.isAurora ? ent.cardHeader : 'px-4 py-3',
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
      className={cn(ent.isAurora ? ent.cardBody : 'p-4', className)}
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
        'border-t',
        ent.isAurora
          ? 'border-stone-200/50 dark:border-white/[0.065] px-5 py-4'
          : 'border-gray-200 dark:border-gray-700 px-4 py-3',
        className
      )}
      {...rest}
    />
  );
});
CardFooter.displayName = 'CardFooter';
