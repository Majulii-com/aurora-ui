export type SliderSize = 'sm' | 'md' | 'lg';

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  size?: SliderSize;
  label?: React.ReactNode;
  /** Show current value next to the track */
  showValue?: boolean;
}
