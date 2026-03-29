/**
 * Shared limits for schema-driven UI trees (static + generative renderers).
 * Aligns with {@link DEFAULT_GEN_LIMITS} in `runtime/gen/genLimits.ts`.
 */

export const DEFAULT_MAX_UI_TREE_DEPTH = 64;

/** Max `id` length compared for cycle detection (DoS guard). */
export const MAX_SCHEMA_NODE_ID_LENGTH = 256;
