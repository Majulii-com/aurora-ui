import type { ReactNode } from 'react';
import type { AuroraSurfaceProps } from '../../types/auroraSurface';
import type { PopoverPlacement } from '../Popover/Popover.types';

export type MultiSelectOption = { value: string; label: string; disabled?: boolean };

export type MultiSelectSize = 'sm' | 'md' | 'lg';

export interface MultiSelectProps extends AuroraSurfaceProps {
  options: MultiSelectOption[];
  /** Selected option values */
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  label?: string;
  size?: MultiSelectSize;
  /** Search box inside the dropdown (filters options client-side) */
  searchable?: boolean;
  searchPlaceholder?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  errorMessage?: string;
  className?: string;
  /** Max height of the options list */
  maxListHeightClassName?: string;
  popoverPlacement?: PopoverPlacement;
  /** Custom render for the closed trigger summary (optional) */
  renderValue?: (selected: MultiSelectOption[]) => ReactNode;
}
