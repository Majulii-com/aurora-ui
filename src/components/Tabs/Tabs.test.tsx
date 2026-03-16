import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';

describe('Tabs', () => {
  it('renders tab list and panels', () => {
    render(
      <Tabs value="1" onChange={() => {}}>
        <TabList>
          <Tab value="1">Tab 1</Tab>
          <Tab value="2">Tab 2</Tab>
        </TabList>
        <TabPanel value="1">Panel 1 content</TabPanel>
        <TabPanel value="2">Panel 2 content</TabPanel>
      </Tabs>
    );
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /tab 1/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /tab 2/i })).toBeInTheDocument();
    expect(screen.getByText('Panel 1 content')).toBeInTheDocument();
  });

  it('shows only the active panel', () => {
    render(
      <Tabs value="2" onChange={() => {}}>
        <TabList>
          <Tab value="1">Tab 1</Tab>
          <Tab value="2">Tab 2</Tab>
        </TabList>
        <TabPanel value="1">Panel 1</TabPanel>
        <TabPanel value="2">Panel 2</TabPanel>
      </Tabs>
    );
    expect(screen.queryByText('Panel 1')).not.toBeInTheDocument();
    expect(screen.getByText('Panel 2')).toBeInTheDocument();
  });

  it('calls onChange when tab is clicked', () => {
    const onChange = vi.fn();
    render(
      <Tabs value="1" onChange={onChange}>
        <TabList>
          <Tab value="1">Tab 1</Tab>
          <Tab value="2">Tab 2</Tab>
        </TabList>
        <TabPanel value="1">P1</TabPanel>
        <TabPanel value="2">P2</TabPanel>
      </Tabs>
    );
    fireEvent.click(screen.getByRole('tab', { name: /tab 2/i }));
    expect(onChange).toHaveBeenCalledWith('2');
  });
});
