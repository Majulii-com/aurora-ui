import type { AccordionProps, AccordionItemProps, AccordionTriggerProps, AccordionContentProps } from './Accordion.types';
export declare function Accordion({ defaultValue, value: controlledValue, onChange, variant, allowMultiple, className, children, ...rest }: AccordionProps): import("react/jsx-runtime").JSX.Element;
export declare function AccordionItem({ value, className, children, ...rest }: AccordionItemProps): import("react/jsx-runtime").JSX.Element;
export declare function AccordionTrigger({ className, children, ...rest }: AccordionTriggerProps): import("react/jsx-runtime").JSX.Element | null;
export declare function AccordionContent({ className, children, ...rest }: AccordionContentProps): import("react/jsx-runtime").JSX.Element | null;
