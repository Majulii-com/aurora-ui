import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from './StatCard';

describe('StatCard', () => {
  it('renders title and value', () => {
    render(<StatCard title="Revenue" value="$42k" />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$42k')).toBeInTheDocument();
  });

  it('renders trend label when provided', () => {
    render(<StatCard title="Users" value="100" trend="up" trendLabel="+10%" />);
    expect(screen.getByText('+10%')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<StatCard title="KPI" value="50" subtitle="Last 30 days" />);
    expect(screen.getByText('Last 30 days')).toBeInTheDocument();
  });
});
