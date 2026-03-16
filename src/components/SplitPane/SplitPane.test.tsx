import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SplitPane } from './SplitPane';

describe('SplitPane', () => {
  it('renders both children', () => {
    render(
      <SplitPane>
        <div>Left</div>
        <div>Right</div>
      </SplitPane>
    );
    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
  });

  it('renders a separator', () => {
    const { container } = render(
      <SplitPane>
        <div>A</div>
        <div>B</div>
      </SplitPane>
    );
    expect(container.querySelector('[role="separator"]')).toBeInTheDocument();
  });
});
