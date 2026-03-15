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
  Modal,
  Dropdown,
  DropdownItem,
  Badge,
  Avatar,
  Spinner,
  Alert,
  Pagination,
} from '@majulii/aurora-ui';

export interface RegistryItem {
  id: string;
  name: string;
  component: React.ComponentType<Record<string, unknown>>;
  defaultProps: Record<string, unknown>;
}

export const registry: RegistryItem[] = [
  {
    id: 'Button',
    name: 'Button',
    component: Button as React.ComponentType<Record<string, unknown>>,
    defaultProps: { children: 'Button', variant: 'primary', size: 'md' },
  },
  {
    id: 'Input',
    name: 'Input',
    component: Input as React.ComponentType<Record<string, unknown>>,
    defaultProps: { placeholder: 'Placeholder' },
  },
  {
    id: 'Textarea',
    name: 'Textarea',
    component: Textarea as React.ComponentType<Record<string, unknown>>,
    defaultProps: { placeholder: 'Placeholder', rows: 3 },
  },
  {
    id: 'Checkbox',
    name: 'Checkbox',
    component: Checkbox as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: 'Checkbox' },
  },
  {
    id: 'Radio',
    name: 'Radio',
    component: Radio as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: 'Radio', name: 'radio-demo' },
  },
  {
    id: 'Select',
    name: 'Select',
    component: Select as React.ComponentType<Record<string, unknown>>,
    defaultProps: {
      options: [
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B' },
      ],
      placeholder: 'Select...',
    },
  },
  {
    id: 'Switch',
    name: 'Switch',
    component: Switch as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: 'Switch' },
  },
  {
    id: 'Card',
    name: 'Card',
    component: ({ children, ...p }: Record<string, unknown>) => (
      <Card {...p}>
        <CardHeader>Card header</CardHeader>
        <CardBody>{children ?? 'Card body'}</CardBody>
        <CardFooter>
          <Button size="sm">Action</Button>
        </CardFooter>
      </Card>
    ),
    defaultProps: {},
  },
  {
    id: 'Badge',
    name: 'Badge',
    component: Badge as React.ComponentType<Record<string, unknown>>,
    defaultProps: { children: 'Badge', variant: 'primary' },
  },
  {
    id: 'Avatar',
    name: 'Avatar',
    component: Avatar as React.ComponentType<Record<string, unknown>>,
    defaultProps: { name: 'JD' },
  },
  {
    id: 'Spinner',
    name: 'Spinner',
    component: Spinner as React.ComponentType<Record<string, unknown>>,
    defaultProps: {},
  },
  {
    id: 'Alert',
    name: 'Alert',
    component: Alert as React.ComponentType<Record<string, unknown>>,
    defaultProps: { title: 'Alert', children: 'Alert message.', variant: 'info' },
  },
  {
    id: 'Pagination',
    name: 'Pagination',
    component: Pagination as React.ComponentType<Record<string, unknown>>,
    defaultProps: { page: 1, totalPages: 10, onPageChange: () => {} },
  },
];
