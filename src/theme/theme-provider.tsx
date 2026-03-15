import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { lightColors, darkColors } from './colors';
import { cn } from '../utils/cn';

export type ThemeMode = 'light' | 'dark';

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(mode: ThemeMode) {
  const colors = mode === 'dark' ? darkColors : lightColors;
  const root = document.documentElement;
  for (const [key, value] of Object.entries(colors)) {
    root.style.setProperty(key, value);
  }
  root.classList.remove('light', 'dark');
  root.classList.add(mode);
}

export interface ThemeProviderProps {
  theme?: ThemeMode;
  defaultTheme?: ThemeMode;
  storageKey?: string;
  children: React.ReactNode;
  className?: string;
}

export function ThemeProvider({
  theme: controlledTheme,
  defaultTheme = 'light',
  storageKey = 'aurora-ui-theme',
  children,
  className,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    const stored = window.localStorage.getItem(storageKey) as ThemeMode | null;
    if (stored === 'light' || stored === 'dark') return stored;
    return defaultTheme;
  });

  const themeToUse = controlledTheme ?? theme;

  useEffect(() => {
    applyTheme(themeToUse);
  }, [themeToUse]);

  const setTheme = (next: ThemeMode) => {
    if (controlledTheme == null) {
      setThemeState(next);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(storageKey, next);
      }
    }
  };

  const toggleTheme = () => {
    setTheme(themeToUse === 'dark' ? 'light' : 'dark');
  };

  const value = useMemo(
    () => ({ theme: themeToUse, setTheme, toggleTheme }),
    [themeToUse, controlledTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <div className={cn(className)} data-theme={themeToUse}>
        {children}
      </div>
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
