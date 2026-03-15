/**
 * A single node in the UI schema tree.
 * Deterministic, serializable, and composable — suitable for Playground and AI generation.
 */
export interface UINode {
  /** Component type (maps to a registered component) */
  type: string;
  /** Props passed to the component */
  props?: Record<string, unknown>;
  /** Nested nodes (for layouts and containers) */
  children?: UINode[];
  /** Optional stable id for editing (excluded when serializing for storage/AI) */
  id?: string;
}

/**
 * Root schema: a single UINode (often a layout like Page or Box) whose children form the UI tree.
 */
export type UISchema = UINode;

import type { ComponentType } from 'react';

/**
 * Registry entry: maps a schema type to a React component and optional default props.
 */
export interface UIRegistryEntry {
  component: ComponentType<Record<string, unknown>>;
  defaultProps?: Record<string, unknown>;
}

/**
 * Registry map: type string -> component + defaultProps.
 * Used by UIRenderer to resolve schema nodes to components.
 */
export type UIRegistry = Record<string, UIRegistryEntry>;
