/** Bundled demos — keep in sync with `docs/examples/*.json` */
export const GEN_MINIMAL_SAMPLE = `{
  "version": "1",
  "state": { "name": "", "greeted": false },
  "actions": {
    "greet": { "type": "MERGE_STATE", "patch": { "greeted": true } }
  },
  "ui": {
    "type": "Stack",
    "props": { "gap": 4 },
    "children": [
      { "type": "Text", "props": { "children": "Generative UI (minimal)", "variant": "title" } },
      { "type": "Input", "props": { "bind": "name", "placeholder": "Your name" } },
      { "type": "Button", "props": { "children": "Submit", "onClickAction": "greet" } },
      {
        "type": "ShowWhen",
        "props": { "when": "{{state.greeted}}" },
        "children": [
          { "type": "Text", "props": { "children": "Thanks — state.greeted is true", "variant": "muted" } }
        ]
      }
    ]
  }
}`;

export const GEN_FORM_TABS_SAMPLE = `{
  "version": "1",
  "state": {
    "ui": { "activeTab": "profile" },
    "form": { "email": "", "bio": "" }
  },
  "actions": {
    "saveDraft": { "type": "SET_STATE", "path": "form.saved", "value": true }
  },
  "ui": {
    "type": "Stack",
    "props": { "gap": 6 },
    "children": [
      { "type": "Text", "props": { "children": "Tabs + form fields", "variant": "title" } },
      {
        "type": "Tabs",
        "props": { "tabBind": "ui.activeTab", "variant": "line" },
        "children": [
          {
            "type": "TabList",
            "children": [
              { "type": "Tab", "props": { "value": "profile", "children": "Profile" } },
              { "type": "Tab", "props": { "value": "settings", "children": "Settings" } }
            ]
          },
          {
            "type": "TabPanel",
            "props": { "value": "profile" },
            "children": [
              {
                "type": "Stack",
                "props": { "gap": 3 },
                "children": [
                  { "type": "Label", "props": { "children": "Email" } },
                  { "type": "Input", "props": { "bind": "form.email", "placeholder": "you@example.com" } }
                ]
              }
            ]
          },
          {
            "type": "TabPanel",
            "props": { "value": "settings" },
            "children": [
              { "type": "Textarea", "props": { "bind": "form.bio", "rows": 4, "placeholder": "Short bio" } }
            ]
          }
        ]
      },
      {
        "type": "Button",
        "props": { "children": "Mark saved", "variant": "secondary", "onClickAction": "saveDraft" }
      }
    ]
  }
}`;

/** Re-export for consumers that import from genSamples only */
export { GEN_API_TABLE_SAMPLE } from './genApiTableSample';
