import type { HTMLAttributes } from 'react';

export type TabsVariant = 'line' | 'pills' | 'enclosed';

export interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
  variant: TabsVariant;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  variant?: TabsVariant;
  children: React.ReactNode;
}

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {}
export interface TabProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'role'> {
  value: string;
}
export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}
