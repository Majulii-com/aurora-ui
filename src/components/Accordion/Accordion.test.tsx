import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion';

describe('Accordion', () => {
  it('renders items with trigger and content', () => {
    render(
      <Accordion defaultValue="1">
        <AccordionItem value="1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('toggles content when trigger is clicked', () => {
    render(
      <Accordion defaultValue="1">
        <AccordionItem value="1">
          <AccordionTrigger>Toggle</AccordionTrigger>
          <AccordionContent>Hidden content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText('Hidden content')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /toggle/i }));
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('calls onChange when item is toggled', () => {
    const onChange = vi.fn();
    render(
      <Accordion value="1" onChange={onChange}>
        <AccordionItem value="1">
          <AccordionTrigger>Item</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    fireEvent.click(screen.getByRole('button', { name: /item/i }));
    expect(onChange).toHaveBeenCalled();
  });
});
