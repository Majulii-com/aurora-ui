/**
 * Majulii brand tokens. Teal primary accent, deep near-black backgrounds,
 * cool zinc-based neutrals. Enterprise: 95% neutral, 5% color.
 */
export const lightColors = {
  /* Deep teal primary — brand accent, authoritative not minty */
  '--aurora-primary-50': '#f0fdfa',
  '--aurora-primary-100': '#ccfbf1',
  '--aurora-primary-200': '#99f6e4',
  '--aurora-primary-300': '#2dd4bf',
  '--aurora-primary-400': '#14b8a6',
  '--aurora-primary-500': '#0d9488',
  '--aurora-primary-600': '#0f766e',
  '--aurora-primary-700': '#115e59',
  '--aurora-primary-800': '#134e4a',
  '--aurora-primary-900': '#0d3d3a',
  /* Cool zinc secondary — buttons, controls, text */
  '--aurora-secondary-50': '#fafafa',
  '--aurora-secondary-100': '#f4f4f5',
  '--aurora-secondary-500': '#71717a',
  '--aurora-secondary-600': '#52525b',
  '--aurora-secondary-700': '#3f3f46',
  '--aurora-success': '#16a34a',
  '--aurora-danger': '#dc2626',
  '--aurora-warning': '#d97706',
  '--aurora-info': '#0891b2',
  '--aurora-accent': '#d97706',
  /* Enterprise canvas — cool near-white, deep near-black text */
  '--aurora-background': '#f8fafc',
  '--aurora-foreground': '#0f172a',
  '--aurora-muted': '#f1f5f9',
  '--aurora-muted-foreground': '#64748b',
  '--aurora-border': '#e2e8f0',
} as const;

export const darkColors = {
  '--aurora-primary-50': '#042f2e',
  '--aurora-primary-100': '#0f3d3a',
  '--aurora-primary-200': '#115e59',
  '--aurora-primary-300': '#0f766e',
  '--aurora-primary-400': '#14b8a6',
  '--aurora-primary-500': '#2dd4bf',
  '--aurora-primary-600': '#5eead4',
  '--aurora-primary-700': '#99f6e4',
  '--aurora-primary-800': '#ccfbf1',
  '--aurora-primary-900': '#f0fdfa',
  '--aurora-secondary-50': '#18181b',
  '--aurora-secondary-100': '#27272a',
  '--aurora-secondary-500': '#a1a1aa',
  '--aurora-secondary-600': '#d4d4d8',
  '--aurora-secondary-700': '#e4e4e7',
  '--aurora-success': '#4ade80',
  '--aurora-danger': '#f87171',
  '--aurora-warning': '#fbbf24',
  '--aurora-info': '#22d3ee',
  '--aurora-accent': '#fbbf24',
  /* Near-black dark canvas */
  '--aurora-background': '#0c0f14',
  '--aurora-foreground': '#f1f5f9',
  '--aurora-muted': '#18181b',
  '--aurora-muted-foreground': '#71717a',
  '--aurora-border': '#27272a',
} as const;

export type ThemeColors = typeof lightColors;
