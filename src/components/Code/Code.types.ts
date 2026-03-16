export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  /** Inline (single line) vs block (multi-line with block styling) */
  block?: boolean;
  children?: React.ReactNode;
}
