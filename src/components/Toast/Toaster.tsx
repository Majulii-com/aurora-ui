import { cn } from '../../utils';
import { CloseIcon } from '../../icons';
import { useOptionalToast } from './ToastContext';
import type { ToastVariant } from './Toast.types';

const shell: Record<ToastVariant, string> = {
  default:
    'border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg',
  success:
    'border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-50 shadow-lg',
  error:
    'border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/50 text-red-950 dark:text-red-50 shadow-lg',
  warning:
    'border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/50 text-amber-950 dark:text-amber-50 shadow-lg',
};

/**
 * Renders the toast stack. Place once inside `ToastProvider`, typically near the app root.
 */
export function Toaster({ className }: { className?: string }) {
  const ctx = useOptionalToast();
  if (!ctx) return null;

  const { toasts, dismiss } = ctx;

  return (
    <div
      role="region"
      aria-label="Notifications"
      aria-live="polite"
      className={cn(
        'pointer-events-none fixed inset-x-4 bottom-4 z-[200] flex flex-col gap-2 sm:inset-x-auto sm:right-4 sm:left-auto sm:max-w-sm',
        'pb-[max(0.25rem,env(safe-area-inset-bottom,0px))]',
        className
      )}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={cn(
            'pointer-events-auto flex gap-3 rounded-xl px-4 py-3 text-sm',
            shell[t.variant ?? 'default']
          )}
        >
          <div className="min-w-0 flex-1">
            {t.title ? <p className="font-semibold leading-snug">{t.title}</p> : null}
            {t.description ? (
              <p className={cn('leading-snug', t.title ? 'mt-0.5 text-[13px] opacity-90' : '')}>
                {t.description}
              </p>
            ) : null}
            {t.action ? <div className="mt-2">{t.action}</div> : null}
          </div>
          <button
            type="button"
            className="shrink-0 rounded-md p-1 opacity-70 hover:opacity-100 focus-visible:outline focus-visible:ring-2"
            aria-label="Dismiss"
            onClick={() => dismiss(t.id)}
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
