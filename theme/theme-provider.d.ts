import React from 'react';
export type ThemeMode = 'light' | 'dark';
type ThemeContextValue = {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
    toggleTheme: () => void;
};
export interface ThemeProviderProps {
    theme?: ThemeMode;
    defaultTheme?: ThemeMode;
    storageKey?: string;
    children: React.ReactNode;
    className?: string;
}
export declare function ThemeProvider({ theme: controlledTheme, defaultTheme, storageKey, children, className, }: ThemeProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useTheme(): ThemeContextValue;
export {};
