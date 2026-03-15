/**
 * Checks if the environment has DOM (browser).
 */
export declare function canUseDOM(): boolean;
/**
 * Gets the active element safely (for focus management).
 */
export declare function getActiveElement(root?: Document | ShadowRoot): Element | null;
/**
 * Checks if element is focusable (simplified).
 */
export declare function isFocusable(el: HTMLElement): boolean;
/**
 * Requests focus and optionally scrolls into view.
 */
export declare function focusElement(el: HTMLElement | null, options?: FocusOptions & {
    scroll?: boolean;
}): void;
