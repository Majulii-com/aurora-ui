import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { BarChart } from './BarChart';

const data = [
  { label: 'A', value: 10 },
  { label: 'B', value: 20 },
];

describe('BarChart', () => {
  it('renders chart with data', () => {
    const { container } = render(<BarChart data={data} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(within(svg as HTMLElement).getByText('A')).toBeInTheDocument();
    expect(within(svg as HTMLElement).getByText('B')).toBeInTheDocument();
  });

  it('shows no data message when data is empty', () => {
    render(<BarChart data={[]} />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });
});
