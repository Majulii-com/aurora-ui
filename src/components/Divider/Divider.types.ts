export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
  /** Optional label in the middle of the line */
  label?: React.ReactNode;
}
