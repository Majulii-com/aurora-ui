import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { UINode } from '@majulii/aurora-ui';

function genId(): string {
  return `n-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function cloneNode(node: UINode): UINode {
  return {
    ...node,
    props: node.props ? { ...node.props } : undefined,
    children: node.children?.map(cloneNode),
  };
}

function mutateAt(root: UINode, id: string, fn: (node: UINode) => UINode): UINode {
  if (root.id === id) return fn(cloneNode(root));
  return {
    ...root,
    children: root.children?.map((c) => mutateAt(c, id, fn)),
  };
}

function removeNodeFromTree(root: UINode, id: string): UINode {
  if (root.id === id) return root;
  return {
    ...root,
    children: root.children
      ?.filter((c) => c.id !== id)
      .map((c) => removeNodeFromTree(c, id)),
  };
}

const DEFAULT_ROOT: UINode = {
  type: 'Page',
  id: 'root',
  props: {},
  children: [],
};

export interface PlaygroundState {
  schema: UINode;
  selectedId: string | null;
  addNode: (parentId: string | null, node: Omit<UINode, 'id'>) => void;
  updateNode: (id: string, props: Record<string, unknown>) => void;
  removeNode: (id: string) => void;
  select: (id: string | null) => void;
  setSchema: (schema: UINode) => void;
  getSerializableSchema: () => UINode;
}

const PlaygroundContext = createContext<PlaygroundState | null>(null);

export function PlaygroundProvider({ children }: { children: ReactNode }) {
  const [schema, setSchemaState] = useState<UINode>(() => cloneNode(DEFAULT_ROOT));
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const addNode = useCallback((parentId: string | null, node: Omit<UINode, 'id'>) => {
    const id = genId();
    const newNode: UINode = { ...node, id, children: node.children ?? [] };
    const targetId = parentId ?? schema.id ?? 'root';

    setSchemaState((prev) => {
      const root = cloneNode(prev);
      if (!root.children) root.children = [];
      if (targetId === root.id || targetId === 'root') {
        return { ...root, children: [...root.children, newNode] };
      }
      return mutateAt(root, targetId, (parent) => ({
        ...parent,
        children: [...(parent.children ?? []), newNode],
      }));
    });
    setSelectedId(id);
  }, [schema.id]);

  const updateNode = useCallback((id: string, props: Record<string, unknown>) => {
    setSchemaState((prev) => mutateAt(prev, id, (n) => ({ ...n, props: { ...n.props, ...props } })));
  }, []);

  const removeNode = useCallback((id: string) => {
    setSchemaState((prev) => {
      if (id === prev.id) return cloneNode(DEFAULT_ROOT);
      return removeNodeFromTree(prev, id);
    });
    setSelectedId((s) => (s === id ? null : s));
  }, []);

  const setSchema = useCallback((newSchema: UINode) => {
    setSchemaState(newSchema.id ? newSchema : { ...newSchema, id: 'root' });
  }, []);

  const getSerializableSchema = useCallback(() => {
    function stripIds(n: UINode): UINode {
      const { id: _id, ...rest } = n;
      return { ...rest, children: n.children?.map(stripIds) };
    }
    return stripIds(cloneNode(schema));
  }, [schema]);

  return (
    <PlaygroundContext.Provider
      value={{
        schema,
        selectedId,
        addNode,
        updateNode,
        removeNode,
        select: setSelectedId,
        setSchema,
        getSerializableSchema,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
}

export function usePlayground() {
  const ctx = useContext(PlaygroundContext);
  if (!ctx) throw new Error('usePlayground must be used within PlaygroundProvider');
  return ctx;
}
