import React from 'react';
import { Input } from '../Input';
import { Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from '../Table';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { TreeTableProps, TreeTableRow } from './TreeTable.types';

type NodeMeta = { row: TreeTableRow; depth: number; hasChildren: boolean };

function buildChildrenMap(rows: TreeTableRow[]) {
  const children = new Map<string | null, TreeTableRow[]>();
  const byId = new Map<string, TreeTableRow>();
  for (const r of rows) {
    byId.set(r.id, r);
    const pid = r.parentId ?? null;
    if (!children.has(pid)) children.set(pid, []);
    children.get(pid)!.push(r);
  }
  return { children, byId };
}

function flattenVisible(children: Map<string | null, TreeTableRow[]>, expanded: Set<string>): NodeMeta[] {
  const out: NodeMeta[] = [];

  function walk(pid: string | null, depth: number) {
    const list = children.get(pid) ?? [];
    for (const row of list) {
      const sub = children.get(row.id) ?? [];
      const hasChildren = sub.length > 0;
      out.push({ row, depth, hasChildren });
      if (hasChildren && expanded.has(row.id)) {
        walk(row.id, depth + 1);
      }
    }
  }

  walk(null, 0);
  return out;
}

export function TreeTable({
  columns,
  rows,
  treeColumnKey,
  defaultExpandAll = true,
  className,
  tableClassName,
  tableWrapperClassName,
  filter,
  onFilterChange,
  filterPlaceholder = 'Filter rows…',
  filterRowClassName,
  filterClassName,
  plain,
}: TreeTableProps) {
  const ent = useAuroraSurface(plain);
  const safeRows = Array.isArray(rows) ? rows : [];
  const treeKey = treeColumnKey ?? columns[0]?.key ?? 'name';

  const { children } = React.useMemo(() => buildChildrenMap(safeRows), [safeRows]);

  const [expanded, setExpanded] = React.useState<Set<string>>(() => {
    if (!defaultExpandAll) return new Set();
    const s = new Set<string>();
    for (const r of safeRows) {
      const sub = children.get(r.id) ?? [];
      if (sub.length > 0) s.add(r.id);
    }
    return s;
  });

  React.useEffect(() => {
    if (!defaultExpandAll) return;
    const s = new Set<string>();
    for (const r of safeRows) {
      if ((children.get(r.id) ?? []).length > 0) s.add(r.id);
    }
    setExpanded(s);
  }, [safeRows, children, defaultExpandAll]);

  const filteredRows = React.useMemo(() => {
    if (!filter?.trim()) return safeRows;
    const q = filter.toLowerCase();
    const ids = new Set<string>();
    const byId = new Map(safeRows.map((r) => [r.id, r]));

    function includeWithAncestors(id: string) {
      let cur: string | undefined = id;
      while (cur) {
        ids.add(cur);
        const p = byId.get(cur)?.parentId as string | null | undefined;
        cur = p ?? undefined;
      }
    }

    for (const r of safeRows) {
      const match = columns.some((c) => {
        if (c.key === 'id' || c.key === 'parentId') return false;
        return String(r[c.key] ?? '')
          .toLowerCase()
          .includes(q);
      });
      if (match) includeWithAncestors(r.id);
    }

    return safeRows.filter((r) => ids.has(r.id));
  }, [safeRows, filter, columns]);

  const { children: childrenFiltered } = React.useMemo(() => buildChildrenMap(filteredRows), [filteredRows]);

  const visible = React.useMemo(() => flattenVisible(childrenFiltered, expanded), [childrenFiltered, expanded]);

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className={cn('w-full min-w-0', ent.isAurora && ent.tableSurface, className)}>
      {onFilterChange ? (
        <div className={cn('mb-4 w-full max-w-md py-0.5', filterRowClassName)}>
          <Input
            className={cn('w-full', filterClassName)}
            placeholder={filterPlaceholder}
            value={filter ?? ''}
            onChange={(e) => onFilterChange(e.target.value)}
          />
        </div>
      ) : null}
      <Table
        skipOuterChrome={ent.isAurora}
        className={tableClassName}
        plain={plain}
        wrapperClassName={cn('w-full min-w-0', tableWrapperClassName)}
      >
        <TableHead>
          <TableRow>
            {columns.map((c) => (
              <TableHeaderCell key={c.key}>{c.label}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {visible.map(({ row, depth, hasChildren }) => (
            <TableRow key={row.id}>
              {columns.map((c) => {
                const isTree = c.key === treeKey;
                const cell = String(row[c.key] ?? '');
                return (
                  <TableCell key={c.key}>
                    {isTree ? (
                      <div className="flex items-center gap-1 min-w-0" style={{ paddingLeft: depth * 16 }}>
                        <button
                          type="button"
                          aria-label={hasChildren ? (expanded.has(row.id) ? 'Collapse' : 'Expand') : 'Leaf'}
                          className={cn(
                            'shrink-0 w-6 h-6 inline-flex items-center justify-center rounded-md',
                            'text-slate-500 hover:bg-stone-100 dark:hover:bg-stone-700',
                            !hasChildren && 'invisible'
                          )}
                          onClick={() => hasChildren && toggle(row.id)}
                          disabled={!hasChildren}
                        >
                          <svg
                            className={cn('w-4 h-4 transition-transform', hasChildren && expanded.has(row.id) && 'rotate-90')}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        <span className="truncate text-[15px]">{cell}</span>
                      </div>
                    ) : (
                      <span className="text-[15px]">{cell}</span>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
