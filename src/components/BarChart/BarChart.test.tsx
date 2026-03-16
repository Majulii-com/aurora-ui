import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BarChart } from './BarChart';

const data = [
  { label: 'A', value: 10 },
  { label: 'B', value: 20 },
];

describe('BarChart', () => {
  it('renders chart with data', () => {
    const { container } = render(<BarChart data={data} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('shows no data message when data is empty', () => {
    render(<BarChart data={[]} />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });
});
