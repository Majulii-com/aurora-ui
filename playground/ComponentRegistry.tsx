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
  Modal,
  Tooltip,
  Dropdown,
  DropdownItem,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from '@majulii/aurora-ui';
import type { UIRegistry } from '@majulii/aurora-ui';
import type { PropFieldDef } from './src/propSchema';

/**
 * Registry item: one entry per component.
 * - defaultProps: used for inference when propSchema is omitted (scalable: new components get props panel for free).
 * - propSchema: optional override for custom labels, select options, or to hide props. Omit for inference.
 */
export interface RegistryItem {
  id: string;
  name: string;
  component: React.ComponentType<Record<string, unknown>>;
  defaultProps: Record<string, unknown>;
  category?: 'layout' | 'content';
  propSchema?: PropFieldDef[];
}

const registryList: RegistryItem[] = [
  { id: 'Page', name: 'Page', component: Page as React.ComponentType<Record<string, unknown>>, defaultProps: {}, category: 'layout' },
  { id: 'Box', name: 'Box', component: Box as React.ComponentType<Record<string, unknown>>, defaultProps: {}, category: 'layout' },
  { id: 'Stack', name: 'Stack', component: Stack as React.ComponentType<Record<string, unknown>>, defaultProps: { gap: 2 }, category: 'layout' },
  { id: 'Grid', name: 'Grid', component: Grid as React.ComponentType<Record<string, unknown>>, defaultProps: { columns: 3, gap: 4 }, category: 'layout' },
  { id: 'Container', name: 'Container', component: Container as React.ComponentType<Record<string, unknown>>, defaultProps: { maxWidth: 'lg' }, category: 'layout' },
  {
    id: 'Button',
    name: 'Button',
    component: Button as React.ComponentType<Record<string, unknown>>,
    defaultProps: { children: 'Button', variant: 'primary', size: 'md' },
    category: 'content',
    propSchema: [
      { key: 'children', label: 'Label', type: 'text' },
      { key: 'variant', label: 'Variant', type: 'select', options: [{ value: 'primary', label: 'Primary' }, { value: 'secondary', label: 'Secondary' }, { value: 'ghost', label: 'Ghost' }, { value: 'outline', label: 'Outline' }, { value: 'danger', label: 'Danger' }, { value: 'success', label: 'Success' }] },
      { key: 'size', label: 'Size', type: 'select', options: [{ value: 'sm', label: 'Small' }, { value: 'md', label: 'Medium' }, { value: 'lg', label: 'Large' }] },
    ],
  },
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
  { id: 'Pagination', name: 'Pagination', component: Pagination as React.ComponentType<Record<string, unknown>>, defaultProps: { page: 1, totalPages: 10 }, category: 'content' },
  {
    id: 'Modal',
    name: 'Modal',
    component: Modal as React.ComponentType<Record<string, unknown>>,
    defaultProps: { isOpen: false, title: 'Modal', size: 'md', closeOnOverlayClick: true, showCloseButton: true },
    category: 'content',
    propSchema: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'size', label: 'Size', type: 'select', options: [{ value: 'sm', label: 'Small' }, { value: 'md', label: 'Medium' }, { value: 'lg', label: 'Large' }, { value: 'full', label: 'Full' }] },
    ],
  },
  {
    id: 'Tooltip',
    name: 'Tooltip',
    component: Tooltip as React.ComponentType<Record<string, unknown>>,
    defaultProps: { content: 'Tooltip text', placement: 'top' },
    category: 'content',
    propSchema: [
      { key: 'content', label: 'Content', type: 'text' },
      { key: 'placement', label: 'Placement', type: 'select', options: [{ value: 'top', label: 'Top' }, { value: 'bottom', label: 'Bottom' }, { value: 'left', label: 'Left' }, { value: 'right', label: 'Right' }] },
    ],
  },
  {
    id: 'Dropdown',
    name: 'Dropdown',
    component: (({ triggerLabel, children, ...p }: Record<string, unknown>) => (
      <Dropdown
        {...p}
        trigger={<Button size="sm" variant="outline">{(triggerLabel as string) ?? 'Menu'}</Button>}
      >
        {children as React.ReactNode}
      </Dropdown>
    )) as React.ComponentType<Record<string, unknown>>,
    defaultProps: { triggerLabel: 'Menu', placement: 'bottom-start' },
    category: 'content',
  },
  {
    id: 'DropdownItem',
    name: 'Dropdown item',
    component: DropdownItem as React.ComponentType<Record<string, unknown>>,
    defaultProps: { children: 'Item' },
    category: 'content',
  },
  {
    id: 'Tabs',
    name: 'Tabs',
    component: Tabs as React.ComponentType<Record<string, unknown>>,
    defaultProps: { value: '1' },
    category: 'content',
  },
  { id: 'TabList', name: 'Tab list', component: TabList as React.ComponentType<Record<string, unknown>>, defaultProps: {}, category: 'content' },
  { id: 'Tab', name: 'Tab', component: Tab as React.ComponentType<Record<string, unknown>>, defaultProps: { value: '1', children: 'Tab 1' }, category: 'content' },
  { id: 'TabPanel', name: 'Tab panel', component: TabPanel as React.ComponentType<Record<string, unknown>>, defaultProps: { value: '1', children: 'Panel content' }, category: 'content' },
  {
    id: 'Accordion',
    name: 'Accordion',
    component: Accordion as React.ComponentType<Record<string, unknown>>,
    defaultProps: { variant: 'default', allowMultiple: false },
    category: 'content',
    propSchema: [
      { key: 'variant', label: 'Variant', type: 'select', options: [{ value: 'default', label: 'Default' }, { value: 'bordered', label: 'Bordered' }, { value: 'separated', label: 'Separated' }] },
      { key: 'allowMultiple', label: 'Allow multiple', type: 'boolean' },
    ],
  },
  { id: 'AccordionItem', name: 'Accordion item', component: AccordionItem as React.ComponentType<Record<string, unknown>>, defaultProps: { value: '1' }, category: 'content' },
  { id: 'AccordionTrigger', name: 'Accordion trigger', component: AccordionTrigger as React.ComponentType<Record<string, unknown>>, defaultProps: { children: 'Section' }, category: 'content' },
  { id: 'AccordionContent', name: 'Accordion content', component: AccordionContent as React.ComponentType<Record<string, unknown>>, defaultProps: { children: 'Content' }, category: 'content' },
  { id: 'Table', name: 'Table', component: Table as React.ComponentType<Record<string, unknown>>, defaultProps: {}, category: 'content' },
  { id: 'TableHead', name: 'Table head', component: TableHead as React.ComponentType<Record<string, unknown>>, defaultProps: {}, category: 'content' },
  { id: 'TableBody', name: 'Table body', component: TableBody as React.ComponentType<Record<string, unknown>>, defaultProps: {}, category: 'content' },
  { id: 'TableRow', name: 'Table row', component: TableRow as React.ComponentType<Record<string, unknown>>, defaultProps: {}, category: 'content' },
  { id: 'TableHeaderCell', name: 'Table header cell', component: TableHeaderCell as React.ComponentType<Record<string, unknown>>, defaultProps: { children: 'Header' }, category: 'content' },
  { id: 'TableCell', name: 'Table cell', component: TableCell as React.ComponentType<Record<string, unknown>>, defaultProps: { children: 'Cell' }, category: 'content' },
];

export const registry = registryList;

/** Map of type -> { component, defaultProps } for UIRenderer */
export const uiRegistry: UIRegistry = registryList.reduce<UIRegistry>((acc, item) => {
  acc[item.id] = { component: item.component, defaultProps: item.defaultProps };
  return acc;
}, {});
