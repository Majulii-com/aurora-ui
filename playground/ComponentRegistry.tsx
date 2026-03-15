import React from 'react';
import {
  Button,
  Input,
  Textarea,
  Checkbox,
  Radio,
  Select,
  Switch,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  Avatar,
  Spinner,
  Alert,
  Pagination,
  Box,
  Stack,
  Grid,
  Container,
  Page,
} from '@majulii/aurora-ui';
import type { UIRegistry } from '@majulii/aurora-ui';

export interface RegistryItem {
  id: string;
  name: string;
  component: React.ComponentType<Record<string, unknown>>;
  defaultProps: Record<string, unknown>;
  category?: 'layout' | 'content';
}

const registryList: RegistryItem[] = [
  { id: 'Page', name: 'Page', component: Page as React.ComponentType<Record<string, unknown>>, defaultProps: {}, category: 'layout' },
  { id: 'Box', name: 'Box', component: Box as React.ComponentType<Record<string, unknown>>, defaultProps: {}, category: 'layout' },
  { id: 'Stack', name: 'Stack', component: Stack as React.ComponentType<Record<string, unknown>>, defaultProps: { gap: 2 }, category: 'layout' },
  { id: 'Grid', name: 'Grid', component: Grid as React.ComponentType<Record<string, unknown>>, defaultProps: { columns: 3, gap: 4 }, category: 'layout' },
  { id: 'Container', name: 'Container', component: Container as React.ComponentType<Record<string, unknown>>, defaultProps: { maxWidth: 'lg' }, category: 'layout' },
  { id: 'Button', name: 'Button', component: Button as React.ComponentType<Record<string, unknown>>, defaultProps: { children: 'Button', variant: 'primary', size: 'md' }, category: 'content' },
  { id: 'Input', name: 'Input', component: Input as React.ComponentType<Record<string, unknown>>, defaultProps: { placeholder: 'Placeholder' }, category: 'content' },
  { id: 'Textarea', name: 'Textarea', component: Textarea as React.ComponentType<Record<string, unknown>>, defaultProps: { placeholder: 'Placeholder', rows: 3 }, category: 'content' },
  { id: 'Checkbox', name: 'Checkbox', component: Checkbox as React.ComponentType<Record<string, unknown>>, defaultProps: { label: 'Checkbox' }, category: 'content' },
  { id: 'Radio', name: 'Radio', component: Radio as React.ComponentType<Record<string, unknown>>, defaultProps: { label: 'Radio', name: 'radio-demo' }, category: 'content' },
  { id: 'Select', name: 'Select', component: Select as React.ComponentType<Record<string, unknown>>, defaultProps: { options: [{ value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }], placeholder: 'Select...' }, category: 'content' },
  { id: 'Switch', name: 'Switch', component: Switch as React.ComponentType<Record<string, unknown>>, defaultProps: { label: 'Switch' }, category: 'content' },
  {
    id: 'Card',
    name: 'Card',
    component: ({ children, ...p }: Record<string, unknown>) => (
      <Card {...p}>
        <CardHeader>Card header</CardHeader>
        <CardBody>{children ?? 'Card body'}</CardBody>
        <CardFooter><Button size="sm">Action</Button></CardFooter>
      </Card>
    ),
    defaultProps: {},
    category: 'content',
  },
  { id: 'Badge', name: 'Badge', component: Badge as React.ComponentType<Record<string, unknown>>, defaultProps: { children: 'Badge', variant: 'primary' }, category: 'content' },
  { id: 'Avatar', name: 'Avatar', component: Avatar as React.ComponentType<Record<string, unknown>>, defaultProps: { name: 'JD' }, category: 'content' },
  { id: 'Spinner', name: 'Spinner', component: Spinner as React.ComponentType<Record<string, unknown>>, defaultProps: {}, category: 'content' },
  { id: 'Alert', name: 'Alert', component: Alert as React.ComponentType<Record<string, unknown>>, defaultProps: { title: 'Alert', children: 'Alert message.', variant: 'info' }, category: 'content' },
  { id: 'Pagination', name: 'Pagination', component: Pagination as React.ComponentType<Record<string, unknown>>, defaultProps: { page: 1, totalPages: 10, onPageChange: () => {} }, category: 'content' },
];

export const registry = registryList;

/** Map of type -> { component, defaultProps } for UIRenderer */
export const uiRegistry: UIRegistry = registryList.reduce<UIRegistry>((acc, item) => {
  acc[item.id] = { component: item.component, defaultProps: item.defaultProps };
  return acc;
}, {});
