# Reducer + Store Architecture: Plan for AI-Generated Complex UI

This document describes the **reducer-based app state** approach so that:

1. **AI** can generate any UI from existing components and define **all user interactions** via a single, predictable state model.
2. **State** is the single source of truth; **reducer** is the only place that updates state; **UI** binds to state and dispatches actions.
3. **Any interaction** (button click → show table, open modal, update form, run sequence) is expressed as **actions** that the reducer turns into state updates; the UI reacts automatically.

---

## 1. Why reducer + store?

| Goal | How reducer + store helps |
|------|---------------------------|
| **Single source of truth** | All app/UI data lives in one state object. No scattered setState; one store. |
| **Predictable updates** | Only the reducer can change state. Same (state, action) → same new state. |
| **Serializable** | Actions are plain objects `{ type, payload }`. Can log, replay, send to server, or generate from AI. |
| **AI-friendly** | AI outputs: initial state + schema (with __bind to state paths) + which actions to dispatch. No need for AI to write imperative code. |
| **Extensible** | New behavior = new action types + new reducer cases. Schema and bindings stay the same. |

---

## 2. State shape (single store)

One **app state** object holds everything that drives the UI (visibility, form values, modal open, table data, etc.):

```ts
// AppState = whatever shape your app needs. Typically:
type AppState = Record<string, unknown>;

// Example shape (AI or developer defines this):
{
  ui: {
    showTable: boolean;
    showModal: boolean;
    activeTab: string;
  };
  form: {
    name: string;
    email: string;
  };
  table: {
    page: number;
    sort: { columnId: string; direction: 'asc' | 'desc' };
    rows: Array<...>;
  };
  // ... any domain data
}
```

- **Schema** (UI tree) is **separate**: it describes *which* components to render and *where* they read/write state (via `__bind`).
- **State** holds only **data**; **schema** holds **structure**. Reducer updates state; schema can be static or also updated (e.g. `updateNode` for builder) outside the main app reducer.

---

## 3. Actions (serializable)

Every state change is triggered by an **action**:

```ts
type AppAction =
  | { type: 'SET_PATH'; payload: { path: string; value: unknown } }
  | { type: 'REPLACE_STATE'; payload: Record<string, unknown> }
  | { type: 'OPEN_MODAL'; payload?: { id?: string } }
  | { type: 'CLOSE_MODAL' }
  | { type: 'TOGGLE_TABLE' }
  // ... any domain action
  ;
```

- **SET_PATH**: Generic “set one path in state.” Fits any shape. Example: `{ type: 'SET_PATH', payload: { path: 'ui.showTable', value: true } }`.
- **REPLACE_STATE**: Replace entire state (e.g. load from JSON, reset). Used by playground “Apply JSON” or hydration.
- **Domain actions** (OPEN_MODAL, TOGGLE_TABLE, etc.) are optional; they make intent explicit and reducer can map them to state changes. AI can generate either SET_PATH or domain actions.

---

## 4. Reducer (single place that updates state)

```ts
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_PATH':
      return setAtPath(state, action.payload.path, action.payload.value) as AppState;
    case 'REPLACE_STATE':
      return { ...action.payload };
    case 'OPEN_MODAL':
      return setAtPath(state, 'ui.showModal', true) as AppState;
    case 'CLOSE_MODAL':
      return setAtPath(state, 'ui.showModal', false) as AppState;
    case 'TOGGLE_TABLE':
      return setAtPath(state, 'ui.showTable', !getAtPath(state, 'ui.showTable')) as AppState;
    default:
      return state;
  }
}
```

- **Pure function**: (state, action) → new state. No side effects inside.
- **Default reducer** can handle only SET_PATH (+ REPLACE_STATE); then AI/app never need to define custom action types—they just dispatch SET_PATH. Domain actions are for clarity and reuse.

---

## 5. Data flow (how UI updates)

1. **Initial state** is set once (e.g. from AI-generated JSON or default).
2. **Schema** describes the component tree. Props use `__bind` to **read** from state (e.g. `when: { __bind: "ui.showTable" }`, `isOpen: { __bind: "modal.open" }`).
3. **User does something** (click, type, etc.) → runtime **dispatches** an action (e.g. `dispatch({ type: 'SET_PATH', payload: { path: 'ui.showTable', value: true } })`).
4. **Reducer** runs → produces **new state**.
5. **Store** updates (e.g. React state or subscription) → **re-render**.
6. **Bindings** resolve again from new state → **UI reflects new state** (table appears, modal opens, etc.).

So: **reducer + store** decide *what* the state is; **schema + __bind** decide *how* that state is shown and which interactions dispatch which actions.

---

## 6. Mapping current “setData” and schema actions to reducer

| Current | With reducer |
|--------|---------------|
| `setData(path, value)` | `dispatch({ type: 'SET_PATH', payload: { path, value } })` |
| `setAppData(fullState)` | `dispatch({ type: 'REPLACE_STATE', payload: fullState })` |
| Schema `onClickAction: "setData"` + payload `{ path, value }` | Same; runtime calls `dispatch({ type: 'SET_PATH', payload })` |
| Two-way binding (e.g. input change) | Handler calls `dispatch({ type: 'SET_PATH', payload: { path, value } })` |

- **updateNode** (change schema node props) and **navigate** (change route) can stay as **separate** mechanisms (builder/shell), or be represented as actions in a larger store that includes `schema` and `route` if you want one unified reducer. For “AI generates any UI and user can do anything,” keeping **app state** in the reducer and schema/route in the rest of the playground is enough: all *data-driven* UI (visibility, form, modals, tables) goes through the reducer.

---

## 7. What AI generates (schema + state + actions)

So that **AI can come up with any UI and any interaction**:

1. **Initial state** (JSON): e.g. `{ "ui": { "showTable": false, "showModal": false }, "form": {} }`.
2. **Schema** (JSON): Tree of components. Props use `__bind` to state paths; click handlers use `onClickAction` (e.g. `setData`) and `onClickPayload` (e.g. `{ path: "ui.showTable", value: true }`).
3. **Reducer**: Use the **default** reducer (SET_PATH + REPLACE_STATE) so AI doesn’t need to generate reducer code. Optionally, app can add custom action types and reducer cases for richer semantics.

No imperative code from AI—only **data** (state + schema + action payloads). The runtime (playground or production) has one reducer and one store; it dispatches actions from schema-driven events and re-renders from state.

---

## 8. Best approach summary

| Layer | Responsibility |
|-------|----------------|
| **Store** | Holds single app state (object). Updated only via reducer. |
| **Reducer** | (state, action) → new state. Handles SET_PATH, REPLACE_STATE, and optional domain actions. |
| **Dispatch** | Receives action, runs reducer, updates store, triggers re-render. |
| **Schema** | Describes UI tree. Binds to state with __bind; triggers dispatch via onClickAction + payload. |
| **Runtime** | Resolves __bind from store; injects two-way handlers that dispatch SET_PATH; runs sequences / custom handlers that can dispatch. |

Result: **Any UI** from existing components, **any interaction** (button click → show table, open modal, update form, etc.) as **reducer actions**; state updates in one place, UI updates accordingly. AI only needs to produce schema + initial state + action payloads.

---

## 9. Implementation checklist

- [x] Define `AppState` and `AppAction` types (e.g. in `playground/src/appStore.ts`).
- [x] Implement `defaultAppReducer` (SET_PATH using setAtPath, REPLACE_STATE).
- [x] In playground provider: replace `useState` for appData with `useReducer(defaultAppReducer, initialAppState)`.
- [x] Expose `setData` (dispatches SET_PATH) so schema actions and two-way bindings go through the reducer.
- [x] Keep `setAppData` as dispatch(REPLACE_STATE) for “Apply JSON” / load state.
- [x] Optional: allow custom reducer to be passed in via `PlaygroundProvider` prop `customReducer` (for production app with domain actions).
- [x] Data panel: “Load UI definition” accepts `{ schema, initialState }` and sets both (for AI-generated or saved definitions).
- [x] Bindings: support `__eq` in binding object so `when: { "__bind": "wizard.step", "__eq": 1 }` resolves to true only when path value equals `__eq` (wizard/stepper visibility).

**Real-life coverage:** The same reducer + store + schema model covers **all possible real-life scenarios**—visibility/modals, forms, tables (sort/filter/pagination), wizards, dashboards, e‑commerce, auth, CRUD, settings, empty/error states, and composite interactions. No scenario requires a different runtime; each is expressed with state paths + schema + actions. See **`REAL_LIFE_SCENARIOS.md`** for a catalog of scenarios and how each maps to state, schema patterns, and actions.

See `playground/src/appStore.ts` for the concrete reducer and action types; see `AI_UI_GENERATION_GUIDE.md` for how AI generates schema + state + interactions.
