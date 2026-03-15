import type { HTMLAttributes } from 'react';

export type AccordionVariant = 'default' | 'bordered' | 'separated';

export interface AccordionContextValue {
  expanded: string | null;
  setExpanded: (value: string | null) => void;
  variant: AccordionVariant;
  allowMultiple?: boolean;
}

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  defaultValue?: string | string[] | null;
  value?: string | string[] | null;
  onChange?: (value: string | string[] | null) => void;
  variant?: AccordionVariant;
  allowMultiple?: boolean;
}

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}
export interface AccordionTriggerProps extends HTMLAttributes<HTMLButtonElement> {}
export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {}
