/** Node/tsx resolves the ESM entry as `dynamic.mjs`; types ship as `dynamic.d.ts` on `lucide-react/dynamic`. */
declare module 'lucide-react/dynamic.mjs' {
  export { DynamicIcon, dynamicIconImports, iconNames } from 'lucide-react/dynamic';
  export type { IconName } from 'lucide-react/dynamic';
}
