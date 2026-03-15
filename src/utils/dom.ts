/**
 * Checks if the environment has DOM (browser).
 */
export function canUseDOM(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Gets the active element safely (for focus management).
 */
export function getActiveElement(root?: Document | ShadowRoot): Element | null {
  const doc = root ?? (canUseDOM() ? document : null);
  return doc?.activeElement ?? null;
}

/**
 * Checks if element is focusable (simplified).
 */
export function isFocusable(el: HTMLElement): boolean {
  if (el.tabIndex < 0 && !el.getAttribute('tabindex')) return false;
  const style = window.getComputedStyle(el);
  if (style.visibility === 'hidden' || style.display === 'none') return false;
  return true;
}

/**
 * Requests focus and optionally scrolls into view.
 */
export function focusElement(el: HTMLElement | null, options?: FocusOptions & { scroll?: boolean }): void {
  if (!el) return;
  el.focus(options);
  if (options?.scroll !== false) {
    el.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' });
  }
}
