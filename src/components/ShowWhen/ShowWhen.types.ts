export interface ShowWhenProps {
  /** When true, children are rendered; when false, nothing is rendered. Resolved by runtime from __bind / __eq. */
  when?: boolean;
  children?: React.ReactNode;
}
