import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { lightColors, darkColors } from './colors';
import { cn } from '../utils/cn';
import type { AuroraAppearance } from './appearanceTypes';
import { applyAppearanceVariables } from './appearanceVariables';

export type ThemeMode = 'light' | 'dark';

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type AppearanceContextValue = {
  appearance: AuroraAppearance;
  setAppearance: (appearance: AuroraAppearance) => void;
};

const AppearanceContext = createContext<AppearanceContextValue | null>(null);

function applyTheme(mode: ThemeMode) {
  const colors = mode === 'dark' ? darkColors : lightColors;
  const root = document.documentElement;
  for (const [key, value] of Object.entries(colors)) {
    root.style.setProperty(key, value);
  }
  root.classList.remove('light', 'dark');
  root.classList.add(mode);
}

function readStoredAppearance(key: string, fallback: AuroraAppearance): AuroraAppearance {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === 'plain') return 'plain';
    // Migrate legacy `enterprise` → `aurora`
    if (raw === 'aurora' || raw === 'enterprise') return 'aurora';
  } catch {
    /* ignore */
  }
  return fallback;
}

export interface ThemeProviderProps {
  theme?: ThemeMode;
  defaultTheme?: ThemeMode;
  storageKey?: string;
  /** Visual density: `aurora` (default) = premium soft UI; `plain` = tighter legacy look. */
  appearance?: AuroraAppearance;
  defaultAppearance?: AuroraAppearance;
  appearanceStorageKey?: string;
  children: React.ReactNode;
  className?: string;
}

export function ThemeProvider({
  theme: controlledTheme,
  defaultTheme = 'light',
  storageKey = 'aurora-ui-theme',
  appearance: controlledAppearance,
  defaultAppearance = 'aurora',
  appearanceStorageKey = 'aurora-ui-appearance',
  children,
  className,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    const stored = window.localStorage.getItem(storageKey) as ThemeMode | null;
    if (stored === 'light' || stored === 'dark') return stored;
    return defaultTheme;
  });

  const [appearance, setAppearanceState] = useState<AuroraAppearance>(() =>
    readStoredAppearance(appearanceStorageKey, defaultAppearance)
  );

  const themeToUse = controlledTheme ?? theme;
  const appearanceToUse = controlledAppearance ?? appearance;

  useEffect(() => {
    applyTheme(themeToUse);
  }, [themeToUse]);

  useEffect(() => {
    applyAppearanceVariables(appearanceToUse);
  }, [appearanceToUse]);

  const setTheme = (next: ThemeMode) => {
    if (controlledTheme == null) {
      setThemeState(next);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(storageKey, next);
      }
    }
  };

  const setAppearance = (next: AuroraAppearance) => {
    if (controlledAppearance == null) {
      setAppearanceState(next);
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(appearanceStorageKey, next);
        } catch {
          /* ignore */
        }
      }
    }
  };

  const toggleTheme = () => {
    setTheme(themeToUse === 'dark' ? 'light' : 'dark');
  };

  const themeValue = useMemo(
    () => ({ theme: themeToUse, setTheme, toggleTheme }),
    [themeToUse, controlledTheme]
  );

  const appearanceValue = useMemo(
    () => ({ appearance: appearanceToUse, setAppearance }),
    [appearanceToUse, controlledAppearance]
  );

  return (
    <ThemeContext.Provider value={themeValue}>
      <AppearanceContext.Provider value={appearanceValue}>
        <div
          className={cn(className)}
          data-theme={themeToUse}
          data-aurora-appearance={appearanceToUse}
        >
          {children}
        </div>
      </AppearanceContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}

/** Appearance API; safe outside ThemeProvider (defaults to `aurora`). */
export function useAuroraAppearance(): AppearanceContextValue & {
  isAurora: boolean;
  /** @deprecated Use `isAurora` */
  isEnterprise: boolean;
} {
  const ctx = useContext(AppearanceContext);
  if (!ctx) {
    return {
      appearance: 'aurora',
      setAppearance: () => {},
      isAurora: true,
      isEnterprise: true,
    };
  }
  const isAurora = ctx.appearance === 'aurora';
  return {
    ...ctx,
    isAurora,
    isEnterprise: isAurora,
  };
}
