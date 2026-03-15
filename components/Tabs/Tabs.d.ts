import type { TabsProps, TabListProps, TabProps, TabPanelProps } from './Tabs.types';
export declare function Tabs({ value, onChange, variant, className, children, ...rest }: TabsProps): import("react/jsx-runtime").JSX.Element;
export declare function TabList({ className, ...rest }: TabListProps): import("react/jsx-runtime").JSX.Element;
export declare function Tab({ value, className, children, ...rest }: TabProps): import("react/jsx-runtime").JSX.Element;
export declare function TabPanel({ value, className, children, ...rest }: TabPanelProps): import("react/jsx-runtime").JSX.Element | null;
