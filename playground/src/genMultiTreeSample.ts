/** MultiSelect + TreeTable — uses `bind` on MultiSelect for string[] state */
export const GEN_MULTI_TREE_SAMPLE = `{
  "version": "1",
  "state": {
    "tags": ["a"]
  },
  "ui": {
    "type": "Stack",
    "props": { "gap": 6, "className": "w-full" },
    "children": [
      {
        "type": "Text",
        "props": { "children": "Multi-select & tree table", "variant": "title" }
      },
      {
        "type": "MultiSelect",
        "props": {
          "label": "Tags",
          "placeholder": "Pick one or more…",
          "options": [
            { "value": "a", "label": "Alpha" },
            { "value": "b", "label": "Beta" },
            { "value": "c", "label": "Gamma" }
          ],
          "bind": "tags"
        }
      },
      {
        "type": "TreeTable",
        "props": {
          "columns": [
            { "key": "name", "label": "Name" },
            { "key": "role", "label": "Role" }
          ],
          "rows": [
            { "id": "1", "name": "Engineering", "role": "Dept" },
            { "id": "2", "parentId": "1", "name": "Platform", "role": "Team" },
            { "id": "3", "parentId": "2", "name": "API", "role": "Squad" }
          ],
          "defaultExpandAll": true
        }
      }
    ]
  }
}`;
