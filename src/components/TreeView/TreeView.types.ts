export interface TreeNodeData {
  id: string;
  label: React.ReactNode;
  children?: TreeNodeData[];
  icon?: React.ReactNode;
  /** Optional badge/count next to label */
  badge?: React.ReactNode;
}

export interface TreeViewProps {
  /** Tree data (nested via children) */
  items: TreeNodeData[];
  /** Controlled: set of expanded node ids */
  expandedIds?: Set<string>;
  /** Controlled: callback when expand/collapse */
  onExpandedChange?: (expandedIds: Set<string>) => void;
  /** Selected node id (single selection) */
  selectedId?: string | null;
  onSelect?: (id: string, node: TreeNodeData) => void;
  className?: string;
}

export interface TreeNodeProps {
  node: TreeNodeData;
  level: number;
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
  selectedId: string | null;
  onSelect: (id: string, node: TreeNodeData) => void;
}
