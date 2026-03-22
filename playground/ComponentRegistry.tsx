import React from 'react';
import {
  Button,
  Input,
  Textarea,
  Checkbox,
  Radio,
  Select,
  MultiSelect,
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
  TreeTable,
  ShowWhen,
  Divider,
  Progress,
  Skeleton,
  Drawer,
  Breadcrumb,
  BreadcrumbItem,
  Link,
  Image,
  Kbd,
  Code,
  EmptyState,
  Slider,
  Label,
  TreeView,
  SplitPane,
  Popover,
  IconButton,
  CodeBlock,
  Icon,
  StatCard,
  BarChart,
  LineChart,
  PieChart,
  Chat,
  ChatHeader,
  ChatMessages,
  ChatMessage,
  ChatInput,
  ChatOptionCard,
  ChatSuggestions,
  ChatWelcome,
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
  {
    id: 'MultiSelect',
    name: 'Multi select',
    component: MultiSelect as React.ComponentType<Record<string, unknown>>,
    defaultProps: {
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Beta' },
        { value: 'c', label: 'Gamma' },
      ],
      value: [] as string[],
      onChange: () => {},
      placeholder: 'Choose…',
      searchable: true,
    },
    category: 'content',
  },
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
  {
    id: 'Pagination',
    name: 'Pagination',
    component: Pagination as React.ComponentType<Record<string, unknown>>,
    defaultProps: { page: 1, totalPages: 10, onPageChange: () => {} },
    category: 'content',
  },
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
  {
    id: 'TreeTable',
    name: 'Tree table',
    component: TreeTable as React.ComponentType<Record<string, unknown>>,
    defaultProps: {
      columns: [
        { key: 'name', label: 'Name' },
        { key: 'role', label: 'Role' },
      ],
      rows: [
        { id: '1', name: 'Engineering', role: 'Dept' },
        { id: '2', parentId: '1', name: 'Platform', role: 'Team' },
        { id: '3', parentId: '2', name: 'API', role: 'Squad' },
      ],
      defaultExpandAll: true,
    },
    category: 'content',
  },
  { id: 'ShowWhen', name: 'Show when', component: ShowWhen as React.ComponentType<Record<string, unknown>>, defaultProps: { when: true }, category: 'layout' },
  { id: 'Divider', name: 'Divider', component: Divider as React.ComponentType<Record<string, unknown>>, defaultProps: {}, category: 'layout' },
  { id: 'Progress', name: 'Progress', component: Progress as React.ComponentType<Record<string, unknown>>, defaultProps: { value: 60, max: 100, showValue: true }, category: 'content' },
  { id: 'Skeleton', name: 'Skeleton', component: Skeleton as React.ComponentType<Record<string, unknown>>, defaultProps: { variant: 'rect' }, category: 'content' },
  { id: 'Drawer', name: 'Drawer', component: Drawer as React.ComponentType<Record<string, unknown>>, defaultProps: { isOpen: false, title: 'Drawer', placement: 'right' }, category: 'content' },
  { id: 'Breadcrumb', name: 'Breadcrumb', component: Breadcrumb as React.ComponentType<Record<string, unknown>>, defaultProps: {}, category: 'content' },
  { id: 'BreadcrumbItem', name: 'Breadcrumb item', component: BreadcrumbItem as React.ComponentType<Record<string, unknown>>, defaultProps: { children: 'Item' }, category: 'content' },
  { id: 'Link', name: 'Link', component: Link as React.ComponentType<Record<string, unknown>>, defaultProps: { children: 'Link', href: '#' }, category: 'content' },
  { id: 'Image', name: 'Image', component: Image as React.ComponentType<Record<string, unknown>>, defaultProps: { src: 'https://picsum.photos/400/200', alt: 'Placeholder' }, category: 'content' },
  { id: 'Kbd', name: 'Kbd', component: Kbd as React.ComponentType<Record<string, unknown>>, defaultProps: { children: '⌘' }, category: 'content' },
  { id: 'Code', name: 'Code', component: Code as React.ComponentType<Record<string, unknown>>, defaultProps: { children: 'code' }, category: 'content' },
  { id: 'EmptyState', name: 'Empty state', component: EmptyState as React.ComponentType<Record<string, unknown>>, defaultProps: { title: 'No data', description: 'Nothing to show here.' }, category: 'content' },
  { id: 'Slider', name: 'Slider', component: Slider as React.ComponentType<Record<string, unknown>>, defaultProps: { min: 0, max: 100, value: 50, showValue: true }, category: 'content' },
  { id: 'Label', name: 'Label', component: Label as React.ComponentType<Record<string, unknown>>, defaultProps: { children: 'Label' }, category: 'content' },
  {
    id: 'TreeView',
    name: 'Tree view',
    component: TreeView as React.ComponentType<Record<string, unknown>>,
    defaultProps: {
      items: [
        { id: '1', label: 'Folder 1', children: [{ id: '1-1', label: 'Item 1-1' }, { id: '1-2', label: 'Item 1-2' }] },
        { id: '2', label: 'Folder 2', children: [] },
      ],
    },
    category: 'content',
  },
  {
    id: 'SplitPane',
    name: 'Split pane',
    component: ((props: Record<string, unknown>) => (
      <SplitPane direction="horizontal" defaultSize={0.4}>
        <div className="p-4 bg-gray-100 dark:bg-gray-800">Left pane</div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700">Right pane</div>
      </SplitPane>
    )) as React.ComponentType<Record<string, unknown>>,
    defaultProps: {},
    category: 'layout',
  },
  {
    id: 'Popover',
    name: 'Popover',
    component: (({ triggerLabel, content, ...p }: Record<string, unknown>) => (
      <Popover trigger={<Button size="sm" variant="outline">{(triggerLabel as string) ?? 'Open'}</Button>} {...p}>
        {(content as string) ?? 'Popover content'}
      </Popover>
    )) as React.ComponentType<Record<string, unknown>>,
    defaultProps: { triggerLabel: 'Open', content: 'Popover content' },
    category: 'content',
  },
  {
    id: 'IconButton',
    name: 'Icon button',
    component: ((props: Record<string, unknown>) => (
      <IconButton aria-label="Action" {...props}>
        <Icon name="add" size={20} />
      </IconButton>
    )) as React.ComponentType<Record<string, unknown>>,
    defaultProps: {},
    category: 'content',
  },
  {
    id: 'CodeBlock',
    name: 'Code block',
    component: CodeBlock as React.ComponentType<Record<string, unknown>>,
    defaultProps: { code: 'SELECT * FROM users;\nWHERE id = 1;', showLineNumbers: true },
    category: 'content',
  },
  { id: 'Icon', name: 'Icon', component: Icon as React.ComponentType<Record<string, unknown>>, defaultProps: { name: 'search' }, category: 'content' },
  {
    id: 'StatCard',
    name: 'Stat card',
    component: StatCard as React.ComponentType<Record<string, unknown>>,
    defaultProps: { title: 'Revenue', value: '$42.5k', trend: 'up', trendLabel: '+12% vs last month' },
    category: 'content',
  },
  {
    id: 'BarChart',
    name: 'Bar chart',
    component: BarChart as React.ComponentType<Record<string, unknown>>,
    defaultProps: {
      data: [
        { label: 'Jan', value: 40 },
        { label: 'Feb', value: 65 },
        { label: 'Mar', value: 52 },
      ],
      height: 200,
    },
    category: 'content',
  },
  {
    id: 'LineChart',
    name: 'Line chart',
    component: LineChart as React.ComponentType<Record<string, unknown>>,
    defaultProps: {
      data: [
        { x: 'Jan', y: 30 },
        { x: 'Feb', y: 45 },
        { x: 'Mar', y: 38 },
        { x: 'Apr', y: 55 },
      ],
      height: 200,
    },
    category: 'content',
  },
  {
    id: 'PieChart',
    name: 'Pie chart',
    component: PieChart as React.ComponentType<Record<string, unknown>>,
    defaultProps: {
      data: [
        { label: 'A', value: 35 },
        { label: 'B', value: 45 },
        { label: 'C', value: 20 },
      ],
      donut: false,
    },
    category: 'content',
  },
  {
    id: 'Chat',
    name: 'Chat',
    component: ((props: Record<string, unknown>) => (
      <Chat height={400} {...props}>
        <ChatHeader title="AI Assist" subtitle="Ask anything" />
        <ChatMessages
          messages={[]}
          emptyContent={
            <ChatWelcome prompt="What would you like to explore?">
              <ChatOptionCard title="Re-engineer" description="Transform this for the future." onClick={() => {}} />
              <ChatOptionCard title="Pivot" description="Explore a new direction." onClick={() => {}} />
            </ChatWelcome>
          }
        />
        <ChatInput onSend={() => {}} placeholder="Type a message..." />
      </Chat>
    )) as React.ComponentType<Record<string, unknown>>,
    defaultProps: {},
    category: 'content',
  },
  { id: 'ChatHeader', name: 'Chat header', component: ChatHeader as React.ComponentType<Record<string, unknown>>, defaultProps: { title: 'Chat' }, category: 'content' },
  { id: 'ChatMessages', name: 'Chat messages', component: ChatMessages as React.ComponentType<Record<string, unknown>>, defaultProps: { messages: [] }, category: 'content' },
  { id: 'ChatMessage', name: 'Chat message', component: ChatMessage as React.ComponentType<Record<string, unknown>>, defaultProps: { message: { id: '1', role: 'user', content: 'Hello' } }, category: 'content' },
  { id: 'ChatInput', name: 'Chat input', component: ChatInput as React.ComponentType<Record<string, unknown>>, defaultProps: { placeholder: 'Type a message...' }, category: 'content' },
  { id: 'ChatOptionCard', name: 'Chat option card', component: ChatOptionCard as React.ComponentType<Record<string, unknown>>, defaultProps: { title: 'Option', description: 'Description' }, category: 'content' },
  { id: 'ChatSuggestions', name: 'Chat suggestions', component: ChatSuggestions as React.ComponentType<Record<string, unknown>>, defaultProps: { items: [{ label: 'Yes' }, { label: 'No' }] }, category: 'content' },
  { id: 'ChatWelcome', name: 'Chat welcome', component: ChatWelcome as React.ComponentType<Record<string, unknown>>, defaultProps: { prompt: 'What would you like to explore?' }, category: 'content' },
];

export const registry = registryList;

/** Map of type -> { component, defaultProps } for UIRenderer */
export const uiRegistry: UIRegistry = registryList.reduce<UIRegistry>((acc, item) => {
  acc[item.id] = { component: item.component, defaultProps: item.defaultProps };
  return acc;
}, {});
