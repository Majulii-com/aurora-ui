export type IconButtonVariant = 'ghost' | 'outline' | 'solid';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon to show (required for a11y; pair with aria-label) */
  'aria-label': string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  children?: React.ReactNode;
}
