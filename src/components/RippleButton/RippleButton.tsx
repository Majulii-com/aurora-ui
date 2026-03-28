import { forwardRef } from 'react';
import { Button } from '../Button/Button';
import type { ButtonProps } from '../Button/Button.types';

/**
 * Primary actions with **press ripple** enabled by default (Magic UI / Uiverse-style engagement).
 * @see https://magicui.design/docs/components/ripple-button
 */
export const RippleButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ripple = true, ...rest }, ref) => <Button ref={ref} ripple={ripple} {...rest} />
);

RippleButton.displayName = 'RippleButton';
