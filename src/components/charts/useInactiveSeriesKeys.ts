import { useCallback, useState } from 'react';

/**
 * Legend-driven visibility toggles for multi-series Recharts (bar / line / area / …).
 */
export function useInactiveSeriesKeys(seriesKeys: string[], filterable: boolean) {
  const [inactive, setInactive] = useState<Set<string>>(() => new Set());

  const toggleKey = useCallback(
    (key: string) => {
      if (!filterable || seriesKeys.length < 2) return;
      setInactive((prev) => {
        const next = new Set(prev);
        if (next.has(key)) next.delete(key);
        else next.add(key);
        return next;
      });
    },
    [filterable, seriesKeys.length]
  );

  const isHidden = useCallback((key: string) => inactive.has(key), [inactive]);

  const clear = useCallback(() => setInactive(new Set()), []);

  return { inactive, toggleKey, isHidden, clear };
}
