import type { ComponentType } from 'react';
import React from 'react';
import { Box } from '../components/Box';
import { Stack } from '../components/Stack';
import { Grid } from '../components/Grid';
import { Container } from '../components/Container';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { Select } from '../components/Select';
import { Checkbox } from '../components/Checkbox';
import { Switch } from '../components/Switch';
import { Button } from '../components/Button';
import { Alert } from '../components/Alert';
import { Label } from '../components/Label';
import { Tabs, TabList, Tab, TabPanel } from '../components/Tabs';
import { Breadcrumb, BreadcrumbItem } from '../components/Breadcrumb';
import { Link } from '../components/Link';
import { ShowWhen } from '../components/ShowWhen';
/** Import implementation files so TS/Vite resolve without relying on `index` re-exports (avoids IDE 2307 on some setups). */
import { GenText } from '../components/GenText/GenText';
import { GenDataTable } from '../components/GenDataTable/GenDataTable';
import { GenSpinner } from '../components/GenSpinner/GenSpinner';

export type GenRegistryEntry = {
  component: ComponentType<Record<string, unknown>>;
  defaultProps?: Record<string, unknown>;
};

const GAPS = new Set([0, 1, 2, 3, 4, 6, 8]);

function GenRow(props: Record<string, unknown>) {
  const { gap: rawGap = 3, children, className, ...rest } = props;
  const n = Number(rawGap);
  const gap = (GAPS.has(n) ? n : 3) as 0 | 1 | 2 | 3 | 4 | 6 | 8;
  return (
    <Stack direction="row" gap={gap} align="center" className={className as string | undefined} {...rest}>
      {children as React.ReactNode}
    </Stack>
  );
}

/** Default: DSL `type` string → Aurora component */
export const auroraGenUIRegistry: Record<string, GenRegistryEntry> = {
  Box: { component: Box as ComponentType<Record<string, unknown>> },
  Stack: {
    component: Stack as ComponentType<Record<string, unknown>>,
    defaultProps: {
      gap: 4,
      className: 'w-full min-w-0',
    },
  },
  Row: { component: GenRow as ComponentType<Record<string, unknown>> },
  Grid: { component: Grid as ComponentType<Record<string, unknown>> },
  Container: { component: Container as ComponentType<Record<string, unknown>> },
  Text: { component: GenText as ComponentType<Record<string, unknown>> },
  Input: { component: Input as ComponentType<Record<string, unknown>> },
  Textarea: { component: Textarea as ComponentType<Record<string, unknown>> },
  Select: {
    component: Select as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: {
      options: [
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B' },
      ],
    },
  },
  Checkbox: { component: Checkbox as ComponentType<Record<string, unknown>> },
  Switch: { component: Switch as ComponentType<Record<string, unknown>> },
  Label: { component: Label as ComponentType<Record<string, unknown>> },
  Button: { component: Button as ComponentType<Record<string, unknown>> },
  Alert: { component: Alert as ComponentType<Record<string, unknown>> },
  Tabs: {
    component: Tabs as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: { value: '1', onChange: () => {} },
  },
  TabList: { component: TabList as ComponentType<Record<string, unknown>> },
  Tab: { component: Tab as unknown as ComponentType<Record<string, unknown>> },
  TabPanel: { component: TabPanel as unknown as ComponentType<Record<string, unknown>> },
  Breadcrumb: { component: Breadcrumb as ComponentType<Record<string, unknown>> },
  BreadcrumbItem: { component: BreadcrumbItem as ComponentType<Record<string, unknown>> },
  Link: { component: Link as ComponentType<Record<string, unknown>> },
  Spinner: { component: GenSpinner as ComponentType<Record<string, unknown>> },
  Table: {
    component: GenDataTable as ComponentType<Record<string, unknown>>,
    defaultProps: { className: 'w-full min-w-0' },
  },
  ShowWhen: { component: ShowWhen as ComponentType<Record<string, unknown>> },
};

/** For {@link lintGenUIDocument} registry checks */
export const auroraGenUIRegistryTypes = new Set(Object.keys(auroraGenUIRegistry));
