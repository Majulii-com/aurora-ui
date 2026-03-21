import { Spinner } from '../Spinner';
import { Stack } from '../Stack';
import { cn } from '../../utils';
import type { GenSpinnerProps } from './GenSpinner.types';

export function GenSpinner({
  label,
  size = 'md',
  labelClassName,
  className,
  ...rest
}: GenSpinnerProps) {
  return (
    <Stack
      direction="row"
      gap={2}
      align="center"
      className={cn('text-gray-500 dark:text-gray-400', className)}
      {...rest}
    >
      <Spinner size={size} />
      {label ? <span className={cn('text-sm', labelClassName)}>{label}</span> : null}
    </Stack>
  );
}
