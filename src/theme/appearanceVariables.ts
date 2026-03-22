import type { AuroraAppearance } from './appearanceTypes';

/** Sets design tokens used by Aurora vs plain surfaces (radii, shadows). */
export function applyAppearanceVariables(mode: AuroraAppearance) {
  const root = document.documentElement;
  if (mode === 'aurora') {
    root.style.setProperty('--aurora-radius-sm', '0.5rem');
    root.style.setProperty('--aurora-radius-md', '0.75rem');
    root.style.setProperty('--aurora-radius-lg', '1rem');
    root.style.setProperty('--aurora-radius-xl', '1.25rem');
    root.style.setProperty('--aurora-radius-2xl', '1.5rem');
    root.style.setProperty('--aurora-radius-pill', '9999px');
    root.style.setProperty(
      '--aurora-shadow-card',
      '0 8px 30px -6px rgba(28, 25, 23, 0.09), 0 2px 8px -2px rgba(28, 25, 23, 0.05)'
    );
    root.style.setProperty(
      '--aurora-shadow-float',
      '0 16px 48px -8px rgba(28, 25, 23, 0.12), 0 6px 16px -4px rgba(28, 25, 23, 0.07)'
    );
    root.style.setProperty(
      '--aurora-shadow-control',
      '0 2px 10px rgba(28, 25, 23, 0.05), 0 1px 3px rgba(28, 25, 23, 0.04)'
    );
    root.style.setProperty('--aurora-shadow-sm', '0 2px 8px rgba(15, 23, 42, 0.04)');
    root.style.setProperty('--aurora-shadow-md', '0 4px 16px rgba(15, 23, 42, 0.08)');
    root.style.setProperty('--aurora-shadow-lg', '0 12px 40px rgba(15, 23, 42, 0.1)');
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
