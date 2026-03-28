import { useCallback, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent, ReactNode } from 'react';

export type PointerRippleOptions = {
  /** CSS color for the wave (e.g. `rgba(255,255,255,0.35)` or `#fff`) */
  color?: string;
  durationMs?: number;
};

type RippleItem = { key: number; x: number; y: number; size: number };

/**
 * Material-style press ripple for enterprise CTAs (similar intent to
 * [Magic UI Ripple Button](https://magicui.design/docs/components/ripple-button)).
 */
export function usePointerRipple(
  enabled: boolean,
  options?: PointerRippleOptions
): {
  onPointerDown: (e: PointerEvent<HTMLButtonElement>) => void;
  /** Render inside the button as the first child; uses `rounded-[inherit]` to match the control */
  rippleLayer: ReactNode;
  /** Merge onto the button when `enabled` */
  rippleHostClassName: string | undefined;
} {
  const [ripples, setRipples] = useState<RippleItem[]>([]);
  const keyRef = useRef(0);
  const durationMs = options?.durationMs ?? 560;
  const color = options?.color ?? 'rgba(255, 255, 255, 0.38)';

  const onPointerDown = useCallback(
    (e: PointerEvent<HTMLButtonElement>) => {
      if (!enabled || e.button !== 0) return;
      const el = e.currentTarget;
      if (el.disabled) return;
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.35;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      const key = ++keyRef.current;
      setRipples((r) => [...r, { key, x, y, size }]);
      window.setTimeout(() => {
        setRipples((r) => r.filter((i) => i.key !== key));
      }, durationMs);
    },
    [enabled, durationMs]
  );

  const rippleLayer =
    enabled ?
      <span
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
        aria-hidden
      >
        {ripples.map((r) => (
          <span
            key={r.key}
            className="aurora-ui-ripple-wave"
            style={
              {
                left: r.x,
                top: r.y,
                width: r.size,
                height: r.size,
                backgroundColor: color,
                '--aurora-ripple-ms': `${durationMs}ms`,
              } as CSSProperties & { '--aurora-ripple-ms': string }
            }
          />
        ))}
      </span>
    : null;

  return {
    onPointerDown,
    rippleLayer,
    rippleHostClassName: enabled ? 'relative overflow-hidden' : undefined,
  };
}
