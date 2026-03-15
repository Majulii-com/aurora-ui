# Playground action schema (AI-ready callbacks)

Components can declare **serializable** event actions in `props`. No functions in JSON—only action types and payloads. The playground (or your app) runs these at runtime.

## Props on any component

| Prop | Type | Description |
|------|------|-------------|
| `onClickAction` | `'log' \| 'toast' \| 'alert' \| 'updateNode' \| 'sequence'` | What runs when the user clicks. |
| `onClickMessage` | `string` | Optional message for `log`, `toast`, `alert`. |
| `onClickPayload` | `object` | Required for `updateNode` and `sequence`; shape depends on action. |

## Action types

### `log`
- **Payload:** none (use `onClickMessage`).
- **Runtime:** `console.log` and entry in Events panel.

### `toast`
- **Payload:** none (use `onClickMessage`).
- **Runtime:** Show toast with message.

### `alert`
- **Payload:** none (use `onClickMessage`).
- **Runtime:** `window.alert(message)`.

### `updateNode`
- **Payload:** `{ nodeId: string, props: Record<string, unknown> }`
- **Runtime:** Merge `props` into the target node's props (e.g. change label, disable, set loading).
- **Example:** Button click updates another component's text or state.

```json
{
  "type": "Button",
  "props": {
    "children": "Submit",
    "onClickAction": "updateNode",
    "onClickPayload": {
      "nodeId": "n-status",
      "props": { "children": "Loading…", "disabled": true }
    }
  },
  "children": []
}
```

### `sequence`
- **Payload:** `{ steps: Array<{ action: string, message?: string, payload?: object }> }`
- **Runtime:** Run each step in order. Steps can be `log`, `toast`, `alert`, `updateNode`.
- **Example:** Update a label, then show a toast.

```json
{
  "type": "Button",
  "props": {
    "children": "Save",
    "onClickAction": "sequence",
    "onClickPayload": {
      "steps": [
        { "action": "updateNode", "payload": { "nodeId": "n-status", "props": { "children": "Saving…" } } },
        { "action": "toast", "message": "Saved!" }
      ]
    }
  },
  "children": []
}
```

## For full-site / production runtime

These action types are not implemented in the playground but fit the same schema so one runtime can power a full website (see `FULL_SITE_ARCHITECTURE.md`):

| Action     | Payload | Purpose |
|-----------|---------|---------|
| `navigate` | `{ path: string }` | Go to route (e.g. router.push). |
| `submit`   | `{ formId?: string, api?: string, method?: string }` | Submit form or call API. |
| `fetch`    | `{ key: string, url: string, targetPath: string }` | Load data and write to data context. |
| `setData`  | `{ path: string, value: unknown }` | Write value at path in app data. |

Register handlers for these in your app's action runner; schema format stays the same.

---

## For AI / code generation

- Use **node `id`** (e.g. `n-xxx`) from the schema for `updateNode.payload.nodeId`. In the playground, node ids are visible in the Events log and in the "Target component" dropdown when configuring "Update another component".
- To build app-like flows: use **sequence** with multiple **updateNode** and **toast** steps so one click updates several components and gives feedback.
- In your app, map these same action types to your real handlers (e.g. `updateNode` → your state setter, `toast` → your notification system).
