# Host app integration: using the lib in a bigger application

The **playground is for testing**. In production, this library lives inside a **bigger application** where **AI generates complex UIs and user interactions**. This doc describes how that application should integrate the lib so AI-driven schema + state + actions work end-to-end.

---

## 1. Roles

| Piece | Who owns it | Purpose |
|-------|-------------|---------|
| **UI definition** (schema + initialState) | AI or your backend | What to show and initial state. Serializable JSON. |
| **State** (app data) | Your app | Single source of truth. Reducer or your own store (Redux, Zustand, etc.). |
| **Registry** (type → component) | Your app | Map schema `type` to React components (Aurora + your custom). |
| **Action handling** | Your app | When user clicks/submits: run setData, navigate, fetch, submit, etc. |
| **Rendering** | Lib | `SchemaRuntime` (or `UIRenderer` + your binding layer) turns schema + state into React UI. |

Your app: **owns state, registry, and actions**. The lib: **components + schema runtime** (bindings, renderer, optional reducer helpers).

**Lib exports for host apps:** From `@majulii/aurora-ui` you get `SchemaRuntime`, `getAtPath`, `setAtPath`, `resolveBindings`, `collectTwoWayBindings`, `injectStateHandlers`, `STATE_HANDLER_NAMES`, plus all components and `UINode` / `UIRegistry` types. Use `SchemaRuntime` with your `schema`, `registry`, `appData`, `setData`, and `onAction` to render AI-generated UIs.

---

## 2. Data flow in the host app

1. **Load UI definition**  
   From API, file, or user: get `{ schema, initialState }`.  
   - Set your app state to `initialState` (e.g. dispatch `REPLACE_STATE` or your equivalent).  
   - Keep `schema` in app state or in a ref; it’s the tree to render.

2. **Render**  
   - Current schema (one page or current route’s page).  
   - Current state (appData).  
   - `SchemaRuntime` (from the lib) with: `schema`, `registry`, `appData`, `setData`, `onAction`.

3. **User interaction**  
   - Clicks, form changes, etc. are handled by the runtime: it resolves `__bind`, injects two-way handlers that call `setData`, and for clicks with `onClickAction` it calls `onAction(nodeId, componentType, eventName, action, message?, payload?)`.

4. **Your `onAction`**  
   - `action === 'setData'` and payload `{ path, value }` → call `setData(path, value)` (or dispatch `SET_PATH`).  
   - `action === 'navigate'` and payload `{ path }` → your router (e.g. `navigate(path)`).  
   - `action === 'toast'` / `alert` / `log` → your feedback layer.  
   - Custom actions (`submit`, `fetch`, `openModal`, etc.) → your handlers; they can read state and call `setData` / navigate as needed.

So: **state** drives what’s on screen; **schema** describes the tree; **setData** and **onAction** are the only ways the UI changes state or triggers navigation/side effects.

---

## 3. What to implement in the host app

### 3.1 State (reducer or existing store)

- One **app state** object (e.g. `{ ui: {}, form: {}, ... }`).  
- **setData(path, value)**  
  - Either: `dispatch({ type: 'SET_PATH', payload: { path, value } })` with a reducer that uses `setAtPath` (use **`defaultAppReducer`** from `@majulii/aurora-ui`, or your own).  
  - Or: update your Redux/Zustand store so that a path-based update is exposed as `setData(path, value)`.  
- **Replace state** (e.g. when loading a new AI definition): set entire state from `initialState`.

### 3.2 Registry

- Build a **UIRegistry**: object mapping `type` string → `{ component, defaultProps }`.  
- Include all Aurora components you need (Button, Input, Modal, Table, ShowWhen, etc.) and **your own** components (e.g. `DataTable`, `Chart`) so the schema can reference them by `type`.

### 3.3 Action runner (onAction)

- Single function: `onAction(nodeId, componentType, eventName, action, message?, payload?)`.  
- Branch on `action`:  
  - **setData** → `setData(payload.path, payload.value)`.  
  - **navigate** → your router.  
  - **toast** / **alert** / **log** → your UI/logging.  
  - **sequence** → run each step (each step is an action + payload).  
  - **updateNode** → only if you keep “editable schema” in state (e.g. builder mode); otherwise ignore or map to setData.  
  - **Custom** (e.g. submit, fetch) → your registered handlers; they receive payload and a context (e.g. `{ appData, setData, navigate }`).

### 3.4 Where the definition comes from

- **API**: e.g. `GET /api/ui-definition` returns `{ schema, initialState }`; on load, set state from `initialState` and set current schema from `schema`.  
- **File / paste**: same JSON; user or admin loads it and you call the same “load definition” logic.  
- **AI**: your backend or client calls an AI that returns `{ schema, initialState }`; you use it the same way.  

No change to the runtime: you always render **one schema** and **one state**, and handle actions in `onAction`.

---

## 4. Using the lib in the host app

### 4.1 Components and base renderer

- Import **components** from `@majulii/aurora-ui` (Button, Input, Modal, Table, ShowWhen, etc.).  
- Import **UIRenderer** if you only need “schema → React” with no bindings (e.g. static screens).  
- For **full behavior** (__bind, two-way, actions), use **SchemaRuntime** (see below).

### 4.2 Bindings and SchemaRuntime (from the lib)

The lib can export:

- **Binding helpers**: `getAtPath`, `setAtPath`, `resolveBindings`, `collectTwoWayBindings`, `injectStateHandlers`.  
- **SchemaRuntime**: a component that takes `schema`, `registry`, `appData`, `setData`, `onAction` and renders the tree with bindings and click actions wired.

Then in your app:

```tsx
import { SchemaRuntime } from '@majulii/aurora-ui';
import { useAppStore } from './store'; // your state
import { registry } from './registry';  // your registry (Aurora + custom)

function App() {
  const { schema, appData, setData } = useAppStore();
  const handleAction = useCallback((nodeId, componentType, eventName, action, message?, payload?) => {
    if (action === 'setData' && payload?.path != null) setData(payload.path, payload.value);
    else if (action === 'navigate' && payload?.path) navigate(payload.path);
    else if (customHandlers[action]) customHandlers[action](payload, { appData, setData, navigate });
    // ... toast, sequence, etc.
  }, [setData, appData, navigate]);

  return (
    <SchemaRuntime
      schema={schema}
      registry={registry}
      appData={appData}
      setData={setData}
      onAction={handleAction}
    />
  );
}
```

If the lib does not yet export `SchemaRuntime`, you can build a small wrapper: use the same logic as the playground’s `EditableSchemaRenderer` (resolve bindings, inject handlers, wire onClick to a single `onAction` callback) but **without** drag-drop and selection; use that wrapper with `UIRenderer`-style recursion and your registry.

### 4.3 Reducer (optional but recommended)

- Use a **reducer** for app state so every change is an **action** (e.g. `SET_PATH`, `REPLACE_STATE`).  
- Your `setData` then just dispatches `{ type: 'SET_PATH', payload: { path, value } }`.  
- Same pattern as in the playground and in REDUCER_STORE_ARCHITECTURE.md; your “bigger app” can use the same reducer or plug into Redux with an adapter.

---

## 5. Multi-route (full site) setup

- Keep **routes**: e.g. `{ "/": schemaHome, "/dashboard": schemaDashboard }`.  
- **Current route** from your router (e.g. React Router’s `location.pathname`).  
- **Current schema** = `routes[currentPath]` (or a default).  
- **navigate** action in schema → your router’s `navigate(path)`.  
- Still one **state** (appData) and one **onAction**; only the schema tree changes per route.

---

## 6. Custom components and custom actions

- **Custom components**: add them to the **registry** with a `type` (e.g. `MyDataTable`). Schema can then use `{ "type": "MyDataTable", "props": { ... } }`.  
- **Custom actions**: in `onAction`, if `action` is not built-in, call your handler (e.g. `submit`, `fetch`). The handler receives payload and a context (appData, setData, navigate) so it can update state or redirect after API calls.

This keeps the schema **fully serializable** while your app remains in control of all real behavior.

---

## 7. Summary: how the bigger app uses the lib

1. **Playground** = testing only; production = your app.  
2. **State** = your app (reducer or Redux/Zustand); expose **setData(path, value)** and optional replace-state for loading definitions.  
3. **Registry** = Aurora components + your custom components.  
4. **Definition** = from AI/API/file: `{ schema, initialState }`; load into state and schema.  
5. **Render** = `SchemaRuntime`(schema, registry, appData, setData, onAction) from the lib (or your own binding + render layer that does the same).  
6. **onAction** = implement setData, navigate, toast, sequence, and custom actions so every UI interaction is handled in one place.  

With this, **AI can drive any complex UI and user interactions** inside your bigger application using the same UI definition format (schema + state + actions) and the lib’s components and runtime.
