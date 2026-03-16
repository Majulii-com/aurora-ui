export interface CodeBlockProps {
  /** Code string (each line can be separated by \n) */
  code?: string;
  /** Or pass lines explicitly */
  lines?: string[];
  /** Language hint for styling (e.g. 'sql', 'javascript') */
  language?: string;
  /** Show line numbers */
  showLineNumbers?: boolean;
  className?: string;
}
