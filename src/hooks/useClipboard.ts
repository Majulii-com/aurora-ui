import { useCallback, useState } from 'react';

export interface UseClipboardReturn {
  value: string;
  copy: (text?: string) => Promise<boolean>;
  copied: boolean;
}

export function useClipboard(initialValue = ''): UseClipboardReturn {
  const [value, setValue] = useState(initialValue);
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text?: string) => {
    const toCopy = text ?? value;
    if (toCopy === '') return false;
    setValue(toCopy);
    try {
      await navigator.clipboard.writeText(toCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch {
      return false;
    }
  }, [value]);

  return { value, copy, copied };
}
