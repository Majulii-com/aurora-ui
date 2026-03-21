import React, { useCallback, useMemo } from 'react';
import type { UINode, UIRegistry } from '../schema/types';
import {
  resolveBindings,
  collectTwoWayBindings,
  injectStateHandlers,
} from './bindings';
import { Accordion, AccordionItem, AccordionTrigger } from '../components/Accordion';
import { Button } from '../components/Button';
import { cn } from '../utils';

import {
  SCHEMA_PLAYGROUND_DRAG_ADD_TYPE,
  SCHEMA_PLAYGROUND_DRAG_MOVE_TYPE,
} from './schemaDndConstants';

export type EditableSchemaRendererProps = {
  registry: UIRegistry;
  parentType?: string;
  node: UINode;
  selectedId: string | null;
  appData: Record<string, unknown>;
  setData: (path: string, value: unknown) => void;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onDrop: (parentId: string, type: string, defaultProps: Record<string, unknown>) => void;
  onMoveNode: (nodeId: string, targetParentId: string, index?: number) => void;
  onUpdateNode: (id: string, props: Record<string, unknown>) => void;
  onPlaygroundAction: (
    nodeId: string,
    componentType: string,
    eventName: string,
    action: string,
    message?: string,
    payload?: Record<string, unknown>
  ) => void;
};

const LAYOUT_TYPES = new Set(['Page', 'Box', 'Stack', 'Grid', 'Container']);
const VALUE_TYPES = new Set(['Input', 'Textarea', 'Select']);
const CHECKED_TYPES = new Set(['Checkbox', 'Switch']);

function wrapAccordionForPlayground(
  type: string,
  parentType: string | undefined,
  finalProps: Record<string, unknown>,
  inner: React.ReactElement
): React.ReactElement {
  if (type === 'AccordionItem' && parentType !== 'Accordion') {
    const v = String(finalProps.value ?? '1');
    return <Accordion defaultValue={v}>{inner}</Accordion>;
  }
  if (type === 'AccordionTrigger' && parentType !== 'AccordionItem') {
    const v = '1';
    return (
      <Accordion defaultValue={v}>
        <AccordionItem value={v}>{inner}</AccordionItem>
      </Accordion>
    );
  }
  if (type === 'AccordionContent' && parentType !== 'AccordionItem') {
    const v = '1';
    return (
      <Accordion defaultValue={v}>
        <AccordionItem value={v}>
          <AccordionTrigger>Section</AccordionTrigger>
          {inner}
        </AccordionItem>
      </Accordion>
    );
  }
  return inner;
}

export function EditableSchemaRenderer({
  registry,
  parentType,
  node,
  selectedId,
  appData,
  setData,
  onSelect,
  onRemove,
  onDrop,
  onMoveNode,
  onUpdateNode,
  onPlaygroundAction,
}: EditableSchemaRendererProps) {
  const isSelected = selectedId === node.id;
  const isLayout = LAYOUT_TYPES.has(node.type);
  const canMove = Boolean(node.id && node.id !== 'root');

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!node.id) return;
      const moveId = e.dataTransfer.getData(SCHEMA_PLAYGROUND_DRAG_MOVE_TYPE);
      if (moveId) {
        if (isLayout && moveId !== node.id) onMoveNode(moveId, node.id);
        return;
      }
      const raw = e.dataTransfer.getData(SCHEMA_PLAYGROUND_DRAG_ADD_TYPE);
      if (!raw) return;
      try {
        const { type, defaultProps } = JSON.parse(raw) as {
          type: string;
          defaultProps?: Record<string, unknown>;
        };
        onDrop(node.id, type, defaultProps ?? {});
      } catch {
        /* ignore */
      }
    },
    [node.id, isLayout, onDrop, onMoveNode]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const isMoving = e.dataTransfer.types.includes(SCHEMA_PLAYGROUND_DRAG_MOVE_TYPE);
      e.dataTransfer.dropEffect = isMoving && isLayout ? 'move' : 'copy';
    },
    [isLayout]
  );

  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      if (!canMove) return;
      e.stopPropagation();
      e.dataTransfer.setData(SCHEMA_PLAYGROUND_DRAG_MOVE_TYPE, node.id!);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', node.type);
    },
    [canMove, node.id, node.type]
  );

  const entry = registry[node.type];
  if (!entry) {
    return (
      <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-700 rounded text-sm">
        Unknown component: {node.type}
      </div>
    );
  }

  const { component: Component, defaultProps = {} } = entry;
  const rawProps = { ...defaultProps, ...node.props } as Record<string, unknown>;

  const resolvedProps = useMemo(
    () => resolveBindings(rawProps, appData) as Record<string, unknown>,
    [rawProps, appData]
  );
  const twoWayBindings = useMemo(
    () => collectTwoWayBindings(node.props as Record<string, unknown>),
    [node.props]
  );
  const propsWithHandlers = useMemo(
    () => injectStateHandlers(resolvedProps, twoWayBindings, setData),
    [resolvedProps, twoWayBindings, setData]
  );

  const props = propsWithHandlers;
  const childNodes = node.children ?? [];

  const childProps = {
    registry,
    selectedId,
    appData,
    setData,
    onSelect,
    onRemove,
    onDrop,
    onMoveNode,
    onUpdateNode,
    onPlaygroundAction,
  };

  const renderedChildren = childNodes.map((child) => (
    <EditableSchemaRenderer key={child.id} {...childProps} parentType={node.type} node={child} />
  ));

  const { children: _propChildren, ...restProps } = props;
  let finalProps = restProps as Record<string, unknown>;
  if (node.id && VALUE_TYPES.has(node.type) && !twoWayBindings.value) {
    const value = (node.props?.value as string) ?? (resolvedProps.value as string) ?? '';
    finalProps = {
      ...finalProps,
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        onUpdateNode(node.id!, { value: e.target.value });
      },
    };
  }
  if (node.id && CHECKED_TYPES.has(node.type) && !twoWayBindings.checked) {
    const checked = (node.props?.checked as boolean) ?? (resolvedProps.checked as boolean) ?? false;
    finalProps = {
      ...finalProps,
      checked,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        onUpdateNode(node.id!, { checked: e.target.checked });
      },
    };
  }
  const rawAction = node.props?.onClickAction as string | undefined;
  const onClickAction =
    (rawAction === '__custom' ? (node.props?.onClickCustomAction as string) : rawAction) ?? rawAction;
  if (node.id && onClickAction && typeof onClickAction === 'string') {
    const message = node.props?.onClickMessage as string | undefined;
    const payload = node.props?.onClickPayload as Record<string, unknown> | undefined;
    const existingOnClick = finalProps.onClick as ((e: React.MouseEvent) => void) | undefined;
    finalProps = {
      ...finalProps,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        onPlaygroundAction(node.id!, node.type, 'onClick', onClickAction, message, payload);
        existingOnClick?.(e);
      },
    };
  }
  const children = renderedChildren.length > 0 ? renderedChildren : (props.children as React.ReactNode);

  if (isLayout && childNodes.length === 0) {
    return (
      <div
        className={cn(
          'relative rounded-lg -m-1 p-1 min-h-[48px] border border-dashed border-gray-300 dark:border-gray-600',
          isSelected && 'ring-2 ring-primary-500 ring-offset-1'
        )}
        onClick={(e) => {
          e.stopPropagation();
          if (node.id) onSelect(node.id);
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div
          className={cn(
            'flex items-center gap-1 mb-0.5 opacity-0 hover:opacity-100',
            canMove && 'cursor-grab active:cursor-grabbing'
          )}
          draggable={canMove}
          onDragStart={handleDragStart}
        >
          <span className="text-xs font-medium text-gray-500">{node.type}</span>
          {node.id && node.id !== 'root' && (
            <Button
              size="sm"
              variant="ghost"
              className="!p-0.5 min-w-0 h-6 text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(node.id!);
              }}
            >
              Remove
            </Button>
          )}
        </div>
        <div className="text-xs text-gray-400 text-center py-6 rounded">Drop components here</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative rounded-lg -m-1 p-1',
        isLayout && 'border border-dashed border-transparent hover:border-gray-300 dark:hover:border-gray-600',
        isSelected && 'ring-2 ring-primary-500 ring-offset-1'
      )}
      onClick={(e) => {
        e.stopPropagation();
        if (node.id) onSelect(node.id);
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div
        className={cn(
          'flex items-center gap-1 mb-0.5 opacity-0 hover:opacity-100 focus-within:opacity-100 group',
          canMove && 'cursor-grab active:cursor-grabbing'
        )}
        draggable={canMove}
        onDragStart={handleDragStart}
      >
        <span className="text-xs font-medium text-gray-500 truncate">{node.type}</span>
        {node.id && node.id !== 'root' && (
          <Button
            size="sm"
            variant="ghost"
            className="!p-0.5 min-w-0 h-6 text-red-500 hover:text-red-600"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(node.id!);
            }}
          >
            Remove
          </Button>
        )}
      </div>
      <div className="rounded">
        {wrapAccordionForPlayground(
          node.type,
          parentType,
          finalProps,
          <Component {...finalProps}>{children}</Component>
        )}
      </div>
    </div>
  );
}
