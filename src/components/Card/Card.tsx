import { forwardRef } from 'react';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps } from './Card.types';
import { CardPlainContext, useCardPlain } from './CardPlainContext';

const variantClasses = {
  elevated: 'bg-white dark:bg-gray-800 shadow-md',
  outline: 'bg-transparent border-2 border-gray-200 dark:border-gray-700',
  filled: 'bg-gray-50 dark:bg-gray-800/50',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'elevated', className, plain, ...rest }, ref) => {
    const ent = useAuroraSurface(plain);
    return (
      <CardPlainContext.Provider value={Boolean(plain)}>
        <div
          ref={ref}
          className={cn(
            'overflow-hidden rounded-lg',
            ent.isAurora && 'rounded-2xl',
            variant === 'elevated' && ent.card,
            variantClasses[variant],
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
        'border-t border-gray-200 dark:border-gray-700',
        ent.isAurora ? 'px-5 py-4' : 'px-4 py-3',
        className
      )}
      {...rest}
    />
  );
});
CardFooter.displayName = 'CardFooter';
