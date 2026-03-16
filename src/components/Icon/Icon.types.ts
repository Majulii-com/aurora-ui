import type { IconProps } from '../../icons/AddIcon';

export type IconName =
  | 'add'
  | 'search'
  | 'close'
  | 'run'
  | 'save'
  | 'export'
  | 'settings'
  | 'menu'
  | 'chevron-down'
  | 'chevron-right'
  | 'refresh'
  | 'maximize'
  | 'more'; // ellipsis / more vert

export interface IconPropsWithName extends Omit<IconProps, 'ref'> {
  name: IconName;
}
