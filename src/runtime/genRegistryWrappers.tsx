/**
 * Small DSL-friendly wrappers so components that need non-JSON props (e.g. Dropdown `trigger`)
 * still compose naturally with `children` from the Gen UI tree.
 */
import React from 'react';
import { Button } from '../components/Button';
import { Dropdown } from '../components/Dropdown';
import { Popover } from '../components/Popover';
import { Icon } from '../components/Icon';
import { IconButton } from '../components/IconButton';

/** Groups nodes without an extra DOM box — use for layout grouping in JSON. */
export function GenFragment({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

export function GenDropdown(props: Record<string, unknown>) {
  const { triggerLabel = 'Menu', children, trigger: _ignore, ...rest } = props;
  return (
    <Dropdown
      {...(rest as Omit<React.ComponentProps<typeof Dropdown>, 'trigger' | 'children'>)}
      trigger={
        <Button variant="outline" size="sm">
          {String(triggerLabel)}
        </Button>
      }
    >
      {children as React.ReactNode}
    </Dropdown>
  );
}

export function GenPopover(props: Record<string, unknown>) {
  const { triggerLabel = 'Open', children, trigger: _ignore, ...rest } = props;
  return (
    <Popover
      {...(rest as Omit<React.ComponentProps<typeof Popover>, 'trigger' | 'children'>)}
      trigger={
        <Button variant="outline" size="sm">
          {String(triggerLabel)}
        </Button>
      }
    >
      {children as React.ReactNode}
    </Popover>
  );
}

/** IconButton with a default add icon when JSON doesn’t pass a custom subtree. */
export function GenIconButtonAdd(props: Record<string, unknown>) {
  const { children, ...rest } = props;
  return (
    <IconButton {...(rest as unknown as React.ComponentProps<typeof IconButton>)}>
      {(children as React.ReactNode) ?? <Icon name="add" size={20} />}
    </IconButton>
  );
}
