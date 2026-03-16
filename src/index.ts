import './styles.css';

// Components
export { Button } from './components/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button';

export { Input } from './components/Input';
export type { InputProps, InputSize } from './components/Input';

export { Textarea } from './components/Textarea';
export type { TextareaProps, TextareaSize } from './components/Textarea';

export { Checkbox } from './components/Checkbox';
export type { CheckboxProps, CheckboxSize } from './components/Checkbox';

export { Radio } from './components/Radio';
export type { RadioProps, RadioSize } from './components/Radio';

export { Select } from './components/Select';
export type { SelectProps, SelectOption, SelectSize } from './components/Select';

export { Switch } from './components/Switch';
export type { SwitchProps, SwitchSize } from './components/Switch';

export { Card, CardHeader, CardBody, CardFooter } from './components/Card';
export type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps, CardVariant } from './components/Card';

export { Modal } from './components/Modal';
export type { ModalProps } from './components/Modal';

export { Tooltip } from './components/Tooltip';
export type { TooltipProps, TooltipPlacement } from './components/Tooltip';

export { Dropdown, DropdownItem } from './components/Dropdown';
export type { DropdownProps, DropdownItemProps } from './components/Dropdown';

export { Tabs, TabList, Tab, TabPanel } from './components/Tabs';
export type { TabsProps, TabListProps, TabProps, TabPanelProps, TabsVariant } from './components/Tabs';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/Accordion';
export type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
  AccordionVariant,
} from './components/Accordion';

export { Badge } from './components/Badge';
export type { BadgeProps, BadgeVariant, BadgeSize } from './components/Badge';

export { Avatar } from './components/Avatar';
export type { AvatarProps, AvatarSize } from './components/Avatar';

export { Spinner } from './components/Spinner';
export type { SpinnerProps, SpinnerSize } from './components/Spinner';

export { Alert } from './components/Alert';
export type { AlertProps, AlertVariant } from './components/Alert';

export {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from './components/Table';
export type {
  TableProps,
  TableHeadProps,
  TableBodyProps,
  TableRowProps,
  TableHeaderCellProps,
  TableCellProps,
} from './components/Table';

export { Pagination } from './components/Pagination';
export type { PaginationProps } from './components/Pagination';

export { Box } from './components/Box';
export type { BoxProps } from './components/Box';

export { Stack } from './components/Stack';
export type { StackProps } from './components/Stack';

export { Grid } from './components/Grid';
export type { GridProps } from './components/Grid';

export { Container } from './components/Container';
export type { ContainerProps } from './components/Container';

export { Page } from './components/Page';
export type { PageProps } from './components/Page';

export { ShowWhen } from './components/ShowWhen';
export type { ShowWhenProps } from './components/ShowWhen';

export { Divider } from './components/Divider';
export type { DividerProps } from './components/Divider';

export { Progress } from './components/Progress';
export type { ProgressProps, ProgressVariant, ProgressSize } from './components/Progress';

export { Skeleton } from './components/Skeleton';
export type { SkeletonProps } from './components/Skeleton';

export { Drawer } from './components/Drawer';
export type { DrawerProps, DrawerPlacement, DrawerSize } from './components/Drawer';

export { Breadcrumb, BreadcrumbItem } from './components/Breadcrumb';
export type { BreadcrumbProps, BreadcrumbItemProps } from './components/Breadcrumb';

export { Link } from './components/Link';
export type { LinkProps, LinkVariant } from './components/Link';

export { Image } from './components/Image';
export type { ImageProps } from './components/Image';

export { Kbd } from './components/Kbd';
export type { KbdProps } from './components/Kbd';

export { Code } from './components/Code';
export type { CodeProps } from './components/Code';

export { EmptyState } from './components/EmptyState';
export type { EmptyStateProps } from './components/EmptyState';

export { Slider } from './components/Slider';
export type { SliderProps, SliderSize } from './components/Slider';

export { Label } from './components/Label';
export type { LabelProps } from './components/Label';

export { TreeView } from './components/TreeView';
export type { TreeViewProps, TreeNodeData, TreeNodeProps } from './components/TreeView';

export { SplitPane } from './components/SplitPane';
export type { SplitPaneProps, SplitPaneDirection } from './components/SplitPane';

export { Popover } from './components/Popover';
export type { PopoverProps, PopoverPlacement } from './components/Popover';

export { IconButton } from './components/IconButton';
export type { IconButtonProps, IconButtonVariant, IconButtonSize } from './components/IconButton';

export { CodeBlock } from './components/CodeBlock';
export type { CodeBlockProps } from './components/CodeBlock';

export { Icon } from './components/Icon';
export type { IconPropsWithName, IconName } from './components/Icon';

export { StatCard } from './components/StatCard';
export type { StatCardProps, StatCardTrend } from './components/StatCard';

export { BarChart } from './components/BarChart';
export type { BarChartProps, BarChartDatum, BarChartDirection } from './components/BarChart';

export { LineChart } from './components/LineChart';
export type { LineChartProps, LineChartDatum, LineChartSeries } from './components/LineChart';

export { PieChart } from './components/PieChart';
export type { PieChartProps, PieChartDatum } from './components/PieChart';

export {
  Chat,
  ChatHeader,
  ChatMessages,
  ChatMessage,
  ChatInput,
  ChatOptionCard,
  ChatSuggestions,
  ChatWelcome,
} from './components/Chat';
export type {
  ChatProps,
  ChatHeaderProps,
  ChatMessagesProps,
  ChatMessageProps,
  ChatInputProps,
  ChatOptionCardProps,
  ChatSuggestionsProps,
  ChatMessageData,
  ChatMessageRole,
} from './components/Chat';
export type { ChatWelcomeProps } from './components/Chat';

// Schema & UI Renderer (AI-ready)
export { UIRenderer } from './schema';
export type { UINode, UISchema, UIRegistry, UIRegistryEntry, UIRendererProps } from './schema';

// Runtime (bindings + SchemaRuntime for host apps)
export {
  getAtPath,
  setAtPath,
  resolveBindings,
  collectTwoWayBindings,
  injectStateHandlers,
  STATE_HANDLER_NAMES,
} from './runtime/bindings';
export { SchemaRuntime } from './runtime/SchemaRuntime';
export type { SchemaRuntimeProps } from './runtime/SchemaRuntime';

// Hooks
export {
  useToggle,
  useDisclosure,
  useClipboard,
  useDebounce,
  useClickOutside,
  useLocalStorage,
  useMediaQuery,
} from './hooks';
export type { UseDisclosureReturn, UseClipboardReturn } from './hooks';

// Icons
export { AddIcon, SearchIcon, CloseIcon } from './icons';
export type { IconProps } from './icons';

// Theme
export { ThemeProvider, useTheme } from './theme';
export type { ThemeMode, ThemeProviderProps } from './theme';
export { lightColors, darkColors } from './theme';
export type { ThemeColors } from './theme';

// Utils
export { cn, compose, pipe, variant, createVariant } from './utils';
export type { VariantMap } from './utils';
export { canUseDOM, getActiveElement, isFocusable, focusElement } from './utils';
