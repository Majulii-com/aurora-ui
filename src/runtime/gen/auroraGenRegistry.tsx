import type { ComponentType } from 'react';
import React from 'react';
import { cn } from '../../utils';
import { Box } from '../../components/Box';
import { Stack } from '../../components/Stack';
import { Grid } from '../../components/Grid';
import { Container } from '../../components/Container';
import { Page } from '../../components/Page';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { Select } from '../../components/Select';
import { Checkbox } from '../../components/Checkbox';
import { Radio } from '../../components/Radio';
import { Switch } from '../../components/Switch';
import { Slider } from '../../components/Slider';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { Label } from '../../components/Label';
import { Tabs, TabList, Tab, TabPanel } from '../../components/Tabs';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../../components/Accordion';
import { Breadcrumb, BreadcrumbItem } from '../../components/Breadcrumb';
import { Link } from '../../components/Link';
import { ShowWhen } from '../../components/ShowWhen';
import { Card, CardHeader, CardBody, CardFooter } from '../../components/Card';
import { Modal } from '../../components/Modal';
import { Drawer } from '../../components/Drawer';
import { Tooltip } from '../../components/Tooltip';
import { DropdownItem } from '../../components/Dropdown';
import { Pagination } from '../../components/Pagination';
import { Badge } from '../../components/Badge';
import { Avatar } from '../../components/Avatar';
import { Divider } from '../../components/Divider';
import { Progress } from '../../components/Progress';
import { Skeleton } from '../../components/Skeleton';
import { EmptyState } from '../../components/EmptyState';
import { Image } from '../../components/Image';
import { Kbd } from '../../components/Kbd';
import { Code } from '../../components/Code';
import { CodeBlock } from '../../components/CodeBlock';
import { Icon } from '../../components/Icon';
import { TreeView } from '../../components/TreeView';
import { SplitPane } from '../../components/SplitPane';
import { StatCard } from '../../components/StatCard';
import { BarChart } from '../../components/BarChart';
import { LineChart } from '../../components/LineChart';
import { PieChart } from '../../components/PieChart';
import { AreaChart } from '../../components/AreaChart';
import { ScatterChart } from '../../components/ScatterChart';
import { RadarChart } from '../../components/RadarChart';
import { RadialBarChart } from '../../components/RadialBarChart';
import { TreemapChart } from '../../components/TreemapChart';
import { FunnelChart } from '../../components/FunnelChart';
import { ComposedChart } from '../../components/ComposedChart';
import { SankeyChart } from '../../components/SankeyChart';
/** Import implementation files so TS/Vite resolve without relying on `index` re-exports (avoids IDE 2307 on some setups). */
import { GenText } from '../../components/GenText/GenText';
import { GenDataTable } from '../../components/GenDataTable/GenDataTable';
import { GenSpinner } from '../../components/GenSpinner/GenSpinner';
import { MultiSelect } from '../../components/MultiSelect/MultiSelect';
import { TreeTable } from '../../components/TreeTable/TreeTable';
import { SegmentedControl } from '../../components/SegmentedControl';
import { Stepper } from '../../components/Stepper';
import { DateField } from '../../components/DateField';
import { FileUpload } from '../../components/FileUpload';
import { CopyButton } from '../../components/CopyButton';
import {
  GenFragment,
  GenDropdown,
  GenPopover,
  GenIconButtonAdd,
} from './genRegistryWrappers';

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
    <Stack
      direction="row"
      gap={gap}
      align="center"
      className={cn('w-full min-w-0', className as string | undefined)}
      {...rest}
    >
      {children as React.ReactNode}
    </Stack>
  );
}

/**
 * Full default registry: **any `type` here** can be nested under **any** layout or container
 * (`Stack`, `Box`, `Card`, `TabPanel`, `ShowWhen`, `Fragment`, …) via `children` in JSON.
 * See `docs/AURORA_UI_BIBLE.md` §5 (registry) and §13 (DSL props).
 */
export const auroraGenUIRegistry: Record<string, GenRegistryEntry> = {
  /** No DOM — group nodes for flexible composition */
  Fragment: { component: GenFragment as unknown as ComponentType<Record<string, unknown>> },

  Box: { component: Box as unknown as ComponentType<Record<string, unknown>> },
  Stack: {
    component: Stack as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: {
      gap: 4,
      className: 'w-full min-w-0',
    },
  },
  Row: { component: GenRow as unknown as ComponentType<Record<string, unknown>> },
  Grid: { component: Grid as unknown as ComponentType<Record<string, unknown>> },
  Container: { component: Container as unknown as ComponentType<Record<string, unknown>> },
  Page: { component: Page as unknown as ComponentType<Record<string, unknown>> },

  Text: { component: GenText as unknown as ComponentType<Record<string, unknown>> },
  Input: { component: Input as unknown as ComponentType<Record<string, unknown>> },
  Textarea: { component: Textarea as unknown as ComponentType<Record<string, unknown>> },
  Select: {
    component: Select as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: {
      options: [
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B' },
      ],
    },
  },
  MultiSelect: {
    component: MultiSelect as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: {
      options: [
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B' },
        { value: 'c', label: 'Option C' },
      ],
      value: [],
      onChange: () => {},
      placeholder: 'Choose…',
    },
  },
  Checkbox: { component: Checkbox as unknown as ComponentType<Record<string, unknown>> },
  Radio: { component: Radio as unknown as ComponentType<Record<string, unknown>>, defaultProps: { name: 'gen-radio' } },
  Switch: { component: Switch as unknown as ComponentType<Record<string, unknown>> },
  Slider: {
    component: Slider as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: { min: 0, max: 100, value: 50, showValue: true },
  },
  SegmentedControl: {
    component: SegmentedControl as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: {
      options: [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
      ],
      value: 'a',
      onChange: () => {},
      'aria-label': 'Segmented',
    },
  },
  Stepper: {
    component: Stepper as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: {
      steps: [
        { id: '1', title: 'Cart', description: 'Review' },
        { id: '2', title: 'Pay', description: 'Billing' },
        { id: '3', title: 'Done', description: 'Receipt' },
      ],
      activeIndex: 1,
    },
  },
  DateField: {
    component: DateField as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: { type: 'date', label: 'Date' },
  },
  FileUpload: {
    component: FileUpload as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: { title: 'Upload files', onFilesChange: () => {} },
  },
  CopyButton: {
    component: CopyButton as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: { textToCopy: 'hello@example.com', children: 'Copy email' },
  },
  Label: { component: Label as unknown as ComponentType<Record<string, unknown>> },
  Button: { component: Button as unknown as ComponentType<Record<string, unknown>> },

  Card: { component: Card as unknown as ComponentType<Record<string, unknown>> },
  CardHeader: { component: CardHeader as unknown as ComponentType<Record<string, unknown>>, defaultProps: { children: 'Header' } },
  CardBody: { component: CardBody as unknown as ComponentType<Record<string, unknown>> },
  CardFooter: { component: CardFooter as unknown as ComponentType<Record<string, unknown>> },

  Modal: {
    component: Modal as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: { isOpen: false, onClose: () => {}, title: 'Dialog', size: 'md' },
  },
  Drawer: {
    component: Drawer as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: { isOpen: false, onClose: () => {}, title: 'Drawer', placement: 'right' },
  },
  Tooltip: {
    component: Tooltip as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: { content: 'Tooltip' },
  },
  /** Uses `triggerLabel` + default Button; menu items are `children` (e.g. `DropdownItem`) */
  Dropdown: {
    component: GenDropdown as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: { triggerLabel: 'Menu', placement: 'bottom-start' },
  },
  DropdownItem: { component: DropdownItem as unknown as ComponentType<Record<string, unknown>>, defaultProps: { children: 'Item' } },
  Popover: {
    component: GenPopover as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: { triggerLabel: 'Open', placement: 'bottom-start' },
  },

  Alert: { component: Alert as unknown as ComponentType<Record<string, unknown>> },
  Badge: { component: Badge as unknown as ComponentType<Record<string, unknown>>, defaultProps: { children: 'Badge', variant: 'primary' } },
  Avatar: { component: Avatar as unknown as ComponentType<Record<string, unknown>>, defaultProps: { name: '?' } },
  Spinner: { component: GenSpinner as unknown as ComponentType<Record<string, unknown>> },
  Progress: { component: Progress as unknown as ComponentType<Record<string, unknown>>, defaultProps: { value: 50, max: 100 } },
  Skeleton: { component: Skeleton as unknown as ComponentType<Record<string, unknown>> },
  EmptyState: {
    component: EmptyState as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: { title: 'Nothing here', description: 'Add content to get started.' },
  },
  Divider: { component: Divider as unknown as ComponentType<Record<string, unknown>> },

  Tabs: {
    component: Tabs as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: { value: '1', onChange: () => {} },
  },
  TabList: { component: TabList as unknown as ComponentType<Record<string, unknown>> },
  Tab: { component: Tab as unknown as ComponentType<Record<string, unknown>> },
  TabPanel: { component: TabPanel as unknown as ComponentType<Record<string, unknown>> },

  Accordion: {
    component: Accordion as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: { variant: 'default', allowMultiple: false },
  },
  AccordionItem: { component: AccordionItem as unknown as ComponentType<Record<string, unknown>>, defaultProps: { value: '1' } },
  AccordionTrigger: {
    component: AccordionTrigger as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: { children: 'Section' },
  },
  AccordionContent: { component: AccordionContent as unknown as ComponentType<Record<string, unknown>>, defaultProps: { children: 'Content' } },

  Breadcrumb: { component: Breadcrumb as unknown as ComponentType<Record<string, unknown>> },
  BreadcrumbItem: { component: BreadcrumbItem as unknown as ComponentType<Record<string, unknown>>, defaultProps: { children: 'Home' } },
  Link: { component: Link as unknown as ComponentType<Record<string, unknown>>, defaultProps: { href: '#', children: 'Link' } },
  Pagination: {
    component: Pagination as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: { page: 1, totalPages: 5, onPageChange: () => {} },
  },

  Table: {
    component: GenDataTable as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: { className: 'w-full min-w-0' },
  },
  TreeTable: {
    component: TreeTable as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: {
      className: 'w-full min-w-0',
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
  },
  TreeView: {
    component: TreeView as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: {
      items: [
        { id: '1', label: 'Folder', children: [{ id: '1-1', label: 'File' }] },
      ],
    },
  },
  SplitPane: {
    component: SplitPane as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: { direction: 'horizontal', defaultSize: 0.4 },
  },

  Image: {
    component: Image as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: { src: 'https://picsum.photos/seed/aurora/800/400', alt: '' },
  },
  Kbd: { component: Kbd as unknown as ComponentType<Record<string, unknown>>, defaultProps: { children: '⌘K' } },
  Code: { component: Code as unknown as ComponentType<Record<string, unknown>>, defaultProps: { children: 'code' } },
  CodeBlock: {
    component: CodeBlock as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: { code: '// example', showLineNumbers: true },
  },
  Icon: { component: Icon as unknown as ComponentType<Record<string, unknown>>, defaultProps: { name: 'search' } },
  IconButton: {
    component: GenIconButtonAdd as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: { 'aria-label': 'Action' },
  },

  StatCard: {
    component: StatCard as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: { title: 'Metric', value: '—', trend: 'neutral', trendLabel: '' },
  },
  BarChart: {
    component: BarChart as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: {
      data: [
        { label: 'A', value: 10 },
        { label: 'B', value: 24 },
      ],
      height: 180,
    },
  },
  LineChart: {
    component: LineChart as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: {
      data: [
        { x: 'Mon', y: 2 },
        { x: 'Tue', y: 5 },
      ],
      height: 180,
    },
  },
  PieChart: {
    component: PieChart as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: {
      data: [
        { label: 'A', value: 40 },
        { label: 'B', value: 60 },
      ],
    },
  },
  AreaChart: {
    component: AreaChart as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: {
      data: [
        { x: 'Mon', y: 2 },
        { x: 'Tue', y: 5 },
      ],
      height: 180,
    },
  },
  ScatterChart: {
    component: ScatterChart as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: {
      data: [
        { x: 10, y: 20, label: 'A' },
        { x: 30, y: 8, label: 'B' },
      ],
      height: 200,
    },
  },
  RadarChart: {
    component: RadarChart as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: {
      data: [
        { subject: 'Speed', A: 80, B: 50 },
        { subject: 'Reliability', A: 70, B: 90 },
        { subject: 'Comfort', A: 60, B: 70 },
      ],
      height: 220,
    },
  },
  RadialBarChart: {
    component: RadialBarChart as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: {
      data: [
        { name: 'A', value: 40 },
        { name: 'B', value: 30 },
        { name: 'C', value: 30 },
      ],
      height: 220,
    },
  },
  TreemapChart: {
    component: TreemapChart as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: {
      data: {
        name: 'Root',
        children: [
          { name: 'Alpha', size: 400 },
          { name: 'Beta', size: 300 },
          { name: 'Gamma', size: 200 },
        ],
      },
      height: 200,
    },
  },
  FunnelChart: {
    component: FunnelChart as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: {
      data: [
        { name: 'Visitors', value: 1000 },
        { name: 'Leads', value: 400 },
        { name: 'Sales', value: 120 },
      ],
      height: 220,
    },
  },
  ComposedChart: {
    component: ComposedChart as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: {
      indexKey: 'month',
      data: [
        { month: 'Jan', revenue: 40, profit: 12 },
        { month: 'Feb', revenue: 55, profit: 18 },
      ],
      series: [
        { type: 'bar', dataKey: 'revenue', name: 'Revenue' },
        { type: 'line', dataKey: 'profit', name: 'Profit' },
      ],
      height: 200,
    },
  },
  SankeyChart: {
    component: SankeyChart as unknown as ComponentType<Record<string, unknown>>,
    defaultProps: {
      nodes: [{ name: 'A' }, { name: 'B' }, { name: 'C' }],
      links: [
        { source: 0, target: 1, value: 10 },
        { source: 1, target: 2, value: 10 },
      ],
      height: 220,
    },
  },

  ShowWhen: { component: ShowWhen as unknown as ComponentType<Record<string, unknown>> },
};

/** For {@link lintGenUIDocument} registry checks */
export const auroraGenUIRegistryTypes = new Set(Object.keys(auroraGenUIRegistry));
