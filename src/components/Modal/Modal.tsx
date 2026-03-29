import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { ModalProps } from './Modal.types';

const sizeClasses = {
  sm: 'max-w-full sm:max-w-sm',
  md: 'max-w-full sm:max-w-md',
  lg: 'max-w-full sm:max-w-lg',
  full: 'max-w-full sm:max-w-[min(90vw,100vw-2rem)] max-h-[100dvh] sm:max-h-[90vh]',
};

export function Modal({
  isOpen,
  onClose,
  title,
  size = 'md',
  closeOnOverlayClick = true,
  showCloseButton = true,
  className,
  children,
  plain,
  ...rest
}: ModalProps) {
  const ent = useAuroraSurface(plain);
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
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

  const content = (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] sm:items-center sm:p-4 sm:pb-4 aurora-safe-x"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className="absolute inset-0 bg-black/50"
        aria-hidden
        onClick={closeOnOverlayClick ? onClose : undefined}
      />
      <div
        className={cn(
          'relative w-full max-h-[min(100dvh,100vh)] overflow-y-auto overscroll-y-contain rounded-t-2xl sm:rounded-lg bg-white dark:bg-gray-800 shadow-xl touch-pan-y',
          ent.modalPanel,
          size !== 'full' && 'sm:max-h-[min(90vh,90dvh)]',
          sizeClasses[size],
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...rest}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            {title && (
              <h2 id="modal-title" className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="ml-auto touch-manipulation rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 sm:p-1"
                aria-label="Close modal"
              >
                <span className="sr-only">Close</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : content;
}
