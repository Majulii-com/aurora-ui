import { useState, useCallback } from 'react';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { CopyButtonProps } from './CopyButton.types';

export function CopyButton({
  textToCopy,
  children = 'Copy',
  copiedLabel = 'Copied',
  plain,
  className,
  disabled,
  ...rest
}: CopyButtonProps) {
  const ent = useAuroraSurface(plain);
  const [done, setDone] = useState(false);
  const onClick = useCallback(async () => {
    if (disabled) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setDone(true);
      window.setTimeout(() => setDone(false), 2000);
    } catch {
      /* clipboard may be unavailable */
    }
  }, [disabled, textToCopy]);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-sm font-medium rounded-lg',
        'text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800',
        'hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 disabled:opacity-50',
        ent.isAurora && ent.copyButton,
        className
      )}
      {...rest}
    >
      {done ? copiedLabel : children}
    </button>
  );
}
