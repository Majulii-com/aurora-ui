export type LinkVariant = 'default' | 'primary' | 'muted' | 'underline';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: LinkVariant;
  /** When true, adds target="_blank" and rel="noopener noreferrer" */
  external?: boolean;
}
