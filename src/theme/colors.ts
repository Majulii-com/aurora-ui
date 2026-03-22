/**
 * Majulii brand–aligned tokens: deep navy wordmark, teal/green→navy mountain,
 * warm sun (amber), sky/cyan nodes. Consumed via Tailwind `primary-*` and CSS vars.
 */
export const lightColors = {
  /* Teal primary — mountain / connected product */
  '--aurora-primary-50': '#f0fdfa',
  '--aurora-primary-100': '#ccfbf1',
  '--aurora-primary-200': '#99f6e4',
  '--aurora-primary-300': '#5eead4',
  '--aurora-primary-400': '#2dd4bf',
  '--aurora-primary-500': '#14b8a6',
  '--aurora-primary-600': '#0d9488',
  '--aurora-primary-700': '#0f766e',
  '--aurora-primary-800': '#115e59',
  '--aurora-primary-900': '#134e4a',
  '--aurora-secondary-50': '#f8fafc',
  '--aurora-secondary-100': '#f1f5f9',
  '--aurora-secondary-500': '#64748b',
  '--aurora-secondary-600': '#475569',
  '--aurora-secondary-700': '#334155',
  /* Logo green + sun orange for semantics */
  '--aurora-success': '#10b981',
  '--aurora-danger': '#ef4444',
  '--aurora-warning': '#f59e0b',
  /** Cyan node accent (links, info) */
  '--aurora-info': '#06b6d4',
  /** Warm amber highlight (logo sun) */
  '--aurora-accent': '#f59e0b',
  /* Deep navy “Maju” text + cool canvas */
  '--aurora-background': '#f6faf9',
  '--aurora-foreground': '#0b1f2a',
  '--aurora-muted': '#eef4f3',
  '--aurora-muted-foreground': '#4a6670',
  '--aurora-border': '#d4e4e0',
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
  '--aurora-secondary-50': '#0a1218',
  '--aurora-secondary-100': '#13242a',
  '--aurora-secondary-500': '#94a3b8',
  '--aurora-secondary-600': '#cbd5e1',
  '--aurora-secondary-700': '#e2e8f0',
  '--aurora-success': '#34d399',
  '--aurora-danger': '#f87171',
  '--aurora-warning': '#fbbf24',
  '--aurora-info': '#22d3ee',
  '--aurora-accent': '#fbbf24',
  '--aurora-background': '#0a1218',
  '--aurora-foreground': '#f0fdfa',
  '--aurora-muted': '#13242a',
  '--aurora-muted-foreground': '#94b8b3',
  '--aurora-border': '#1e3a35',
} as const;

export type ThemeColors = typeof lightColors;
