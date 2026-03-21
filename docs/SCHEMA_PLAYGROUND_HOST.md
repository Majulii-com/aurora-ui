# Schema playground host (library exports)

The **visual schema playground** (drag-drop canvas, `appData`, routes, events) is implemented in **`@majulii/aurora-ui`**, not in the demo app. The playground under `playground/` only:

- Composes layout (sidebar, panels, theme).
- Supplies a **`UIRegistry`** (`ComponentRegistry.tsx` → `uiRegistry`) listing which `type` strings map to which components.
- Wires **`EditableSchemaRenderer`** with that registry.

Any other app can do the same imports:

| Export | Role |
|--------|------|
| **`PlaygroundProvider`** / **`usePlayground`** | Schema tree + `appData` + routes + selection + `emitPlaygroundEvent` |
| **`EditableSchemaRenderer`** | Renders a `UINode` tree with `__bind` resolution, two-way handlers, DnD — pass your **`registry`** |
| **`SCHEMA_PLAYGROUND_DRAG_ADD_TYPE`** / **`SCHEMA_PLAYGROUND_DRAG_MOVE_TYPE`** | MIME types for palette / reorder |
| **`defaultAppReducer`** / **`INITIAL_APP_STATE`** | Serializable `SET_PATH` / `REPLACE_STATE` for `appData` |
| **`fetchGenDslChatReply`** | Optional Gen DSL assistant (pass **`chatApiUrl`** from your env) |
| **`useJsonPreviewPane`** | Resizable JSON vs preview pane (Generative DSL demo) |

Bindings and path updates use the same **`getAtPath` / `setAtPath` / `resolveBindings`** as **`SchemaRuntime`**.

See also: `GENERATIVE_UI.md` (Gen JSON DSL), `COMPONENT_DSL_CONVENTIONS.md` (component styling contract).
