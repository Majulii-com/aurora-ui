import '@testing-library/jest-dom';

/** Recharts `ResponsiveContainer` expects ResizeObserver (not in jsdom). */
globalThis.ResizeObserver = class ResizeObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
};

/** Recharts measures the wrapper; without dimensions it renders no chart SVG. */
Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, get: () => 400 });
Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, get: () => 240 });
HTMLElement.prototype.getBoundingClientRect = function getBoundingClientRect() {
  return {
    width: 400,
    height: 240,
    top: 0,
    left: 0,
    bottom: 240,
    right: 400,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  } as DOMRect;
};
