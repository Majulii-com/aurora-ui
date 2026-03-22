/**
 * Optional opt-out for the global Aurora soft UI (larger radii, elevated shadows).
 * Pass `plain` on a component to force the denser, flatter look regardless of {@link ThemeProvider} `appearance`.
 */
export type AuroraSurfaceProps = {
  plain?: boolean;
};
