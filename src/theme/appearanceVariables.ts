import type { AuroraAppearance } from './appearanceTypes';

/** Sets design tokens used by Aurora vs plain surfaces (radii, shadows). */
export function applyAppearanceVariables(
  mode: AuroraAppearance,
  target: HTMLElement | null = typeof document !== 'undefined' ? document.documentElement : null
) {
  if (!target) return;
  const root = target;
  if (mode === 'aurora') {
    /* Enterprise radii — tight, precise, professional. Controls at 8px, cards at 12px. */
    root.style.setProperty('--aurora-radius-sm', '0.3125rem');   /* 5px  — badges, chips */
    root.style.setProperty('--aurora-radius-md', '0.5rem');       /* 8px  — buttons, inputs */
    root.style.setProperty('--aurora-radius-lg', '0.75rem');      /* 12px — cards, panels */
    root.style.setProperty('--aurora-radius-xl', '0.875rem');     /* 14px — larger cards */
    root.style.setProperty('--aurora-radius-2xl', '1rem');        /* 16px — modals, sheets */
    root.style.setProperty('--aurora-radius-pill', '9999px');
    /* Architectural shadows — precise depth, not ambient bloom */
    root.style.setProperty(
      '--aurora-shadow-card',
      'inset 0 1px 0 rgba(255,255,255,0.8), 0 0 0 1px rgba(0,0,0,0.04), 0 6px 20px -3px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)'
    );
    root.style.setProperty(
      '--aurora-shadow-float',
      '0 0 0 1px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.06), 0 16px 40px -6px rgba(0,0,0,0.10), 0 32px 64px -12px rgba(0,0,0,0.07)'
    );
    root.style.setProperty(
      '--aurora-shadow-control',
      'inset 0 1px 0 rgba(255,255,255,0.85), 0 0 0 1px rgba(0,0,0,0.05), 0 2px 8px -1px rgba(0,0,0,0.05)'
    );
    root.style.setProperty('--aurora-shadow-sm', '0 1px 2px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.03)');
    root.style.setProperty('--aurora-shadow-md', '0 2px 4px rgba(0,0,0,0.05), 0 8px 24px -4px rgba(0,0,0,0.08)');
    root.style.setProperty('--aurora-shadow-lg', '0 4px 8px rgba(0,0,0,0.06), 0 16px 48px -8px rgba(0,0,0,0.10)');
    root.setAttribute('data-aurora-appearance', 'aurora');
  } else {
    root.style.setProperty('--aurora-radius-sm', '0.25rem');
    root.style.setProperty('--aurora-radius-md', '0.375rem');
    root.style.setProperty('--aurora-radius-lg', '0.5rem');
    root.style.setProperty('--aurora-radius-xl', '0.75rem');
    root.style.setProperty('--aurora-radius-2xl', '1rem');
    root.style.setProperty('--aurora-radius-pill', '9999px');
    root.style.setProperty('--aurora-shadow-card', '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)');
    root.style.setProperty('--aurora-shadow-float', '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)');
    root.style.setProperty('--aurora-shadow-control', '0 1px 2px 0 rgb(0 0 0 / 0.05)');
    root.style.setProperty('--aurora-shadow-sm', '0 1px 2px 0 rgb(0 0 0 / 0.05)');
    root.style.setProperty('--aurora-shadow-md', '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)');
    root.style.setProperty('--aurora-shadow-lg', '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)');
    root.setAttribute('data-aurora-appearance', 'plain');
  }
}
