export {
  ThemeProvider,
  AURORA_SCOPE_CLASS,
  useTheme,
  useAuroraAppearance,
  type ThemeMode,
  type ThemeProviderProps,
} from './theme-provider';
export type { AuroraAppearance } from './appearanceTypes';
export { useAuroraSurface } from './useAuroraSurface';
/** @deprecated Use `useAuroraSurface` */
export { useEnterpriseSurface } from './useEnterpriseSurface';
export { applyAppearanceVariables } from './appearanceVariables';
export { lightColors, darkColors, type ThemeColors } from './colors';
export { spacing, type SpacingScale } from './spacing';
export { fontFamily, fontSize, fontWeight } from './typography';
