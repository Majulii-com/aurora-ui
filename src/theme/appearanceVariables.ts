import type { AuroraAppearance } from './appearanceTypes';

/** Sets design tokens used by Aurora vs plain surfaces (radii, shadows). */
export function applyAppearanceVariables(mode: AuroraAppearance) {
  const root = document.documentElement;
  if (mode === 'aurora') {
    /* Premium radii — generous curves like high-end product UI */
    root.style.setProperty('--aurora-radius-sm', '0.5625rem');
    root.style.setProperty('--aurora-radius-md', '0.8125rem');
    root.style.setProperty('--aurora-radius-lg', '1.0625rem');
    root.style.setProperty('--aurora-radius-xl', '1.3125rem');
    root.style.setProperty('--aurora-radius-2xl', '1.625rem');
    root.style.setProperty('--aurora-radius-pill', '9999px');
    /* Layered ambient + contact shadows (luxury depth) */
    root.style.setProperty(
      '--aurora-shadow-card',
      '0 1px 0 0 rgba(255,255,255,0.85) inset, 0 0 0 1px rgba(13,148,136,0.04), 0 12px 40px -8px rgba(15, 23, 42, 0.08), 0 4px 12px -4px rgba(15, 23, 42, 0.05)'
    );
    root.style.setProperty(
      '--aurora-shadow-float',
      '0 1px 0 0 rgba(255,255,255,0.7) inset, 0 0 0 1px rgba(13,148,136,0.06), 0 24px 64px -12px rgba(15, 23, 42, 0.14), 0 12px 32px -8px rgba(13, 148, 136, 0.08)'
    );
    root.style.setProperty(
      '--aurora-shadow-control',
      '0 1px 0 0 rgba(255,255,255,0.9) inset, 0 0 0 1px rgba(15, 23, 42, 0.05), 0 4px 16px -2px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.04)'
    );
    root.style.setProperty(
      '--aurora-shadow-sm',
      '0 1px 0 0 rgba(255,255,255,0.8) inset, 0 2px 8px rgba(15, 23, 42, 0.04)'
    );
    root.style.setProperty(
      '--aurora-shadow-md',
      '0 1px 0 0 rgba(255,255,255,0.75) inset, 0 6px 20px -4px rgba(15, 23, 42, 0.08)'
    );
    root.style.setProperty(
      '--aurora-shadow-lg',
      '0 1px 0 0 rgba(255,255,255,0.65) inset, 0 16px 48px -8px rgba(15, 23, 42, 0.12)'
    );
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
