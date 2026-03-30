import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { DrawerProps } from './Drawer.types';

const placementClasses = {
  left: 'inset-y-0 left-0',
  right: 'inset-y-0 right-0',
  bottom: 'inset-x-0 bottom-0',
};

const placementRounded = {
  left: 'rounded-r-2xl',
  right: 'rounded-l-2xl',
  bottom: 'rounded-t-2xl',
};

const sizeClasses = {
  sm: 'w-full max-w-full sm:w-80 sm:max-w-[min(20rem,100vw-1rem)]',
  md: 'w-full max-w-full sm:w-96 sm:max-w-[min(24rem,100vw-1rem)]',
  lg: 'w-full max-w-full sm:w-[28rem] sm:max-w-[min(28rem,100vw-1rem)]',
  full: 'w-full max-w-full',
};

const sizeClassesBottom = {
  sm: 'h-1/3 max-h-full',
  md: 'h-1/2 max-h-full',
  lg: 'h-3/4 max-h-full',
  full: 'h-full',
};

export function Drawer({
  isOpen,
  onClose,
  placement = 'right',
  size = 'md',
  title,
  showCloseButton = true,
  closeOnOverlayClick = true,
  plain,
  className,
  children,
}: DrawerProps) {
  const ent = useAuroraSurface(plain);
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const isBottom = placement === 'bottom';
  const content = (
    <div
      className={cn(
        'fixed inset-0 z-50 flex',
        placement === 'left' && 'justify-start',
        placement === 'right' && 'justify-end',
        placement === 'bottom' && 'flex-col justify-end'
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'drawer-title' : undefined}
    >
      <div
        className="absolute inset-0 bg-black/50"
        aria-hidden
        onClick={closeOnOverlayClick ? onClose : undefined}
      />
      <div
        className={cn(
          'relative flex flex-col bg-white dark:bg-gray-800 shadow-xl min-h-0 max-h-[100dvh]',
          ent.isAurora && ent.drawerPanel,
          placementClasses[placement],
          ent.isAurora ? placementRounded[placement] : (placement === 'left' ? 'rounded-r-lg' : placement === 'right' ? 'rounded-l-lg' : 'rounded-t-lg'),
          isBottom ? sizeClassesBottom[size] : sizeClasses[size],
          !isBottom && 'h-full',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div className={cn(
            'flex items-center justify-between border-b shrink-0',
            ent.isAurora
              ? 'px-5 py-4 border-stone-200/50 dark:border-white/[0.07]'
              : 'px-4 py-3 border-gray-200 dark:border-gray-700'
          )}>
            {title && (
              <h2
                id="drawer-title"
                className={cn(
                  ent.isAurora
                    ? 'text-[15px] font-semibold tracking-tight text-[#08141e] dark:text-teal-50'
                    : 'text-lg font-semibold text-gray-900 dark:text-gray-100'
                )}
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  'ml-auto rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40',
                  ent.isAurora
                    ? 'p-1.5 hover:bg-stone-100/85 dark:hover:bg-white/[0.07] text-stone-500 dark:text-stone-400'
                    : 'p-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500'
                )}
                aria-label="Close drawer"
              >
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}
        <div className={cn('overflow-auto flex-1', ent.isAurora ? 'p-5' : 'p-4')}>{children}</div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : content;
}
