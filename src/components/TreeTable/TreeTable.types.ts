import type { AuroraSurfaceProps } from '../../types/auroraSurface';
import type { GenTableColumn } from '../GenDataTable/GenDataTable';

/**
 * Flat row: `id` + optional `parentId` (null/omit = root). Other keys are column values.
 * Reserved: `id`, `parentId`, `_depth` (optional hint — ignored if tree is built from parentId).
 */
export type TreeTableRow = Record<string, unknown> & {
  id: string;
  parentId?: string | null;
};

export interface TreeTableProps extends AuroraSurfaceProps {
  columns: GenTableColumn[];
  rows: TreeTableRow[];
  /** Column that shows tree affordances (chevron + indent). Defaults to first column. */
  treeColumnKey?: string;
  /** Start with all rows expanded */
  defaultExpandAll?: boolean;
  className?: string;
  tableClassName?: string;
  tableWrapperClassName?: string;
  /** Optional global search across visible column values */
  filter?: string;
  onFilterChange?: (v: string) => void;
  filterPlaceholder?: string;
  filterRowClassName?: string;
  filterClassName?: string;
}
