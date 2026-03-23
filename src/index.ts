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

export { MultiSelect } from './components/MultiSelect';
export type { MultiSelectProps, MultiSelectOption, MultiSelectSize } from './components/MultiSelect';

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

export { GenDataTable } from './components/GenDataTable/GenDataTable';
export type { GenTableColumn, GenDataTableDSLProps } from './components/GenDataTable/GenDataTable';

export { TreeTable } from './components/TreeTable';
export type { TreeTableProps, TreeTableRow } from './components/TreeTable';
export { GenText } from './components/GenText/GenText';
export type { GenTextProps, GenTextVariant } from './components/GenText';
export { GenSpinner } from './components/GenSpinner/GenSpinner';
export type { GenSpinnerProps } from './components/GenSpinner';

/** Shared typings for DSL-stylable Aurora components (see `docs/AURORA_UI_BIBLE.md#14-conventions-for-new-components`). */
export type { AuroraDslRootDiv, AuroraDslRootSpan } from './types/auroraDslComponent';

export { Slider } from './components/Slider';
export type { SliderProps, SliderSize } from './components/Slider';

export { SegmentedControl } from './components/SegmentedControl';
export type { SegmentedControlProps, SegmentedOption, SegmentedControlSize } from './components/SegmentedControl';

export { Stepper } from './components/Stepper';
export type { StepperProps, StepperStep } from './components/Stepper';

export { DateField } from './components/DateField';
export type { DateFieldProps, DateFieldType } from './components/DateField';

export { FileUpload } from './components/FileUpload';
export type { FileUploadProps } from './components/FileUpload';

export { CopyButton } from './components/CopyButton';
export type { CopyButtonProps } from './components/CopyButton';

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
export {
  LUCIDE_ICON_NAMES,
  LUCIDE_ICON_NAME_SET,
  LEGACY_ICON_ALIASES,
  resolveIconName,
  isValidIconName,
} from './icons/iconNames';

export { StatCard } from './components/StatCard';
export type { StatCardProps, StatCardTrend } from './components/StatCard';

export { BarChart } from './components/BarChart';
export type { BarChartProps, BarChartDatum, BarChartDirection } from './components/BarChart';

export { LineChart } from './components/LineChart';
export type { LineChartProps, LineChartDatum, LineChartSeries } from './components/LineChart';

export { PieChart } from './components/PieChart';
export type { PieChartProps, PieChartDatum } from './components/PieChart';

export { AreaChart } from './components/AreaChart';
export type { AreaChartProps, AreaChartDatum, AreaChartSeries } from './components/AreaChart';

export { ScatterChart } from './components/ScatterChart';
export type { ScatterChartProps, ScatterChartPoint } from './components/ScatterChart';

export { RadarChart } from './components/RadarChart';
export type { RadarChartProps, RadarChartRow } from './components/RadarChart';

export { RadialBarChart } from './components/RadialBarChart';
export type { RadialBarChartProps, RadialBarDatum } from './components/RadialBarChart';

export { TreemapChart } from './components/TreemapChart';
export type { TreemapChartProps, TreemapNode } from './components/TreemapChart';

export { FunnelChart } from './components/FunnelChart';
export type { FunnelChartProps, FunnelDatum } from './components/FunnelChart';

export { ComposedChart } from './components/ComposedChart';
export type { ComposedChartProps, ComposedSeriesConfig, ComposedSeriesType } from './components/ComposedChart';

export { SankeyChart } from './components/SankeyChart';
export type { SankeyChartProps, SankeyNodeDatum, SankeyLinkDatum } from './components/SankeyChart';

export type { InteractiveChartProps } from './components/charts/chartInteraction.types';

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
export type {
  GenUINode,
  GenUIDocument,
  UIState,
  ActionDef,
  ActionChainDef,
  ActionType,
  ExpressionContext,
} from './schema';
export { ACTION_TYPES, GenUIDocumentSchema, parseGenUIDocument } from './schema';
export type { ValidatedGenDocument } from './schema';

// Runtime (bindings + SchemaRuntime for host apps)
export {
  getAtPath,
  setAtPath,
  resolveBindings,
  collectTwoWayBindings,
  injectStateHandlers,
  STATE_HANDLER_NAMES,
} from './runtime/core/bindings';
export { SchemaRuntime } from './runtime/schema-ui/SchemaRuntime';
export type { SchemaRuntimeProps } from './runtime/schema-ui/SchemaRuntime';

// Visual schema playground host (drag-drop canvas, appData, routes — consume like any host app)
export { PlaygroundProvider, usePlayground, findNodeInSchema } from './runtime/playground/schemaPlaygroundStore';
export type {
  SchemaPlaygroundState,
  SchemaPlaygroundEvent,
  SchemaPlaygroundActionContext,
  SchemaPlaygroundCustomHandler,
  PlaygroundEventAction,
  CustomAppReducer,
  PlaygroundState,
  PlaygroundEvent,
  ActionContext,
  CustomActionHandler,
} from './runtime/playground/schemaPlaygroundStore';
export { defaultAppReducer, INITIAL_APP_STATE } from './runtime/playground/appReducer';
export type { AppState, AppAction } from './runtime/playground/appReducer';
export { EditableSchemaRenderer } from './runtime/playground/EditableSchemaRenderer';
export type { EditableSchemaRendererProps } from './runtime/playground/EditableSchemaRenderer';
export {
  SCHEMA_PLAYGROUND_DRAG_ADD_TYPE,
  SCHEMA_PLAYGROUND_DRAG_MOVE_TYPE,
} from './runtime/playground/schemaDndConstants';
export { fetchGenDslChatReply } from './runtime/gen/genDslChatClient';
export type { GenDslChatContext } from './runtime/gen/genDslChatClient';
export { useJsonPreviewPane } from './runtime/hooks/useJsonPreviewPane';

// Generative JSON DSL runtime (Zod → GenUIRenderer → Zustand → declarative actions)
export {
  resolveValue,
  resolveDeep,
  sanitizeForLog,
  resolveNamedBindingMap,
} from './runtime/gen/expressions';
export { createRuntimeStore } from './runtime/gen/genStore';
export type { GenRuntimeStore, GenRuntimeState, GenRuntimeActions } from './runtime/gen/genStore';
export type { GenRuntimeStore as RuntimeStore } from './runtime/gen/genStore';
export type { GenRuntimeState as RuntimeStoreState } from './runtime/gen/genStore';
export type { GenRuntimeActions as RuntimeActions } from './runtime/gen/genStore';
export { setAtPathImmutable } from './runtime/core/genPaths';
export { runAction, runChain } from './runtime/gen/genInterpreter';
export type {
  InterpreterOptions,
  NavigateHandler,
  CustomHandler,
} from './runtime/gen/genInterpreter';
export type { EngineActionContext, EngineActionPhase, EngineErrorHandler } from './runtime/core/engineTypes';
export {
  GenUIProvider,
  useGenUI,
  useGenUIDocument,
  useGenUIState,
  useRunAction,
} from './runtime/gen/GenUIProvider';
export { GenUIRenderer } from './runtime/gen/GenUIRenderer';
export { PoweredByMajuliiBar } from './runtime/gen/PoweredByMajuliiBar';
export type { PoweredByMajuliiBarProps } from './runtime/gen/PoweredByMajuliiBar';
export { auroraGenUIRegistry, auroraGenUIRegistryTypes } from './runtime/gen/auroraGenRegistry';
export type { GenRegistryEntry } from './runtime/gen/auroraGenRegistry';
export { lintGenUIDocument, parseAndLintGenUIDocument, GEN_LINT_ACTION_PROP_KEYS } from './runtime/gen/genLint';
export type { GenLintIssue, GenLintResult, GenLintLevel, ParseAndLintResult } from './runtime/gen/genLint';
export {
  GEN_REGISTRY_TYPE_CATEGORY,
  GEN_REGISTRY_COMPONENT_CATEGORY_ORDER,
  getGenUIRegistryComponentCategory,
} from './runtime/gen/dslRegistryTaxonomy';
export type { GenUIRegistryComponentCategory } from './runtime/gen/dslRegistryTaxonomy';
export { GEN_UI_DSL_WIRING_ROWS } from './runtime/gen/dslRendererWiring';
export type { GenUIDslWiringRow } from './runtime/gen/dslRendererWiring';
export { DEFAULT_GEN_LIMITS } from './runtime/gen/genLimits';
export type { GenDocumentLimits } from './runtime/gen/genLimits';

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
export {
  ThemeProvider,
  AURORA_SCOPE_CLASS,
  useTheme,
  useAuroraAppearance,
  useAuroraSurface,
  /** @deprecated Use `useAuroraSurface` */
  useEnterpriseSurface,
  applyAppearanceVariables,
} from './theme';
export type { ThemeMode, ThemeProviderProps, AuroraAppearance } from './theme';
export { lightColors, darkColors } from './theme';
export type { ThemeColors } from './theme';

// Surface / appearance opt-out on components
export type { AuroraSurfaceProps } from './types/auroraSurface';

// Utils
export { cn, compose, pipe, variant, createVariant } from './utils';
export type { VariantMap } from './utils';
export { canUseDOM, getActiveElement, isFocusable, focusElement } from './utils';
