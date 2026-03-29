/**
 * High-level grouping for default `auroraGenUIRegistry` types — used by docs / AI knowledge base.
 * When you add a new registry `type`, add a row here (or it falls back to {@link getGenUIRegistryComponentCategory} → `layout`).
 */

export type GenUIRegistryComponentCategory =
  | 'layout'
  | 'typography'
  | 'form'
  | 'actions'
  | 'surfaces'
  | 'overlays'
  | 'feedback'
  | 'navigation'
  | 'data'
  | 'charts'
  | 'media'
  | 'conditional';

/** Stable section order for generated docs */
export const GEN_REGISTRY_COMPONENT_CATEGORY_ORDER: readonly GenUIRegistryComponentCategory[] = [
  'layout',
  'typography',
  'form',
  'actions',
  'surfaces',
  'overlays',
  'feedback',
  'navigation',
  'data',
  'charts',
  'media',
  'conditional',
];

/** Explicit category per registry component `type` string */
export const GEN_REGISTRY_TYPE_CATEGORY: Record<string, GenUIRegistryComponentCategory> = {
  Fragment: 'layout',
  Box: 'layout',
  Stack: 'layout',
  Row: 'layout',
  Grid: 'layout',
  Container: 'layout',
  Page: 'layout',
  SplitPane: 'layout',
  ScrollArea: 'layout',
  AspectRatio: 'layout',
  Text: 'typography',
  Heading: 'typography',
  VisuallyHidden: 'typography',
  Label: 'typography',
  Link: 'typography',
  Breadcrumb: 'typography',
  BreadcrumbItem: 'typography',
  Kbd: 'typography',
  Code: 'typography',
  CodeBlock: 'typography',
  Input: 'form',
  Textarea: 'form',
  Select: 'form',
  MultiSelect: 'form',
  Checkbox: 'form',
  Radio: 'form',
  Switch: 'form',
  Slider: 'form',
  SegmentedControl: 'form',
  DateField: 'form',
  FileUpload: 'form',
  Button: 'actions',
  RippleButton: 'actions',
  IconButton: 'actions',
  Icon: 'actions',
  CopyButton: 'actions',
  Card: 'surfaces',
  CardHeader: 'surfaces',
  CardBody: 'surfaces',
  CardFooter: 'surfaces',
  Modal: 'surfaces',
  Drawer: 'surfaces',
  Alert: 'surfaces',
  Divider: 'surfaces',
  Tooltip: 'overlays',
  Dropdown: 'overlays',
  DropdownItem: 'overlays',
  Popover: 'overlays',
  Badge: 'feedback',
  Avatar: 'feedback',
  Spinner: 'feedback',
  Progress: 'feedback',
  Skeleton: 'feedback',
  EmptyState: 'feedback',
  Tabs: 'navigation',
  TabList: 'navigation',
  Tab: 'navigation',
  TabPanel: 'navigation',
  Pagination: 'navigation',
  Stepper: 'navigation',
  Accordion: 'navigation',
  AccordionItem: 'navigation',
  AccordionTrigger: 'navigation',
  AccordionContent: 'navigation',
  Collapsible: 'navigation',
  Table: 'data',
  TreeTable: 'data',
  TreeView: 'data',
  Image: 'media',
  ShowWhen: 'conditional',
  StatCard: 'charts',
  BarChart: 'charts',
  LineChart: 'charts',
  PieChart: 'charts',
  AreaChart: 'charts',
  ScatterChart: 'charts',
  RadarChart: 'charts',
  RadialBarChart: 'charts',
  TreemapChart: 'charts',
  FunnelChart: 'charts',
  ComposedChart: 'charts',
  SankeyChart: 'charts',
};

export function getGenUIRegistryComponentCategory(type: string): GenUIRegistryComponentCategory {
  return GEN_REGISTRY_TYPE_CATEGORY[type] ?? 'layout';
}
