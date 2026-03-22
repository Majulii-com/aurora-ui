type PayloadEntry = {
  dataKey?: string | number;
  name?: string;
  value?: string | number;
  color?: string;
  payload?: Record<string, unknown>;
};

export type AuroraTooltipContentProps = {
  active?: boolean;
  label?: string | number;
  payload?: PayloadEntry[];
};

/**
 * Styled tooltip for Recharts — shows label and each series row with emphasis on values.
 */
export function AuroraChartTooltipContent({
  active,
  label,
  payload,
}: AuroraTooltipContentProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-md border border-gray-200 bg-white px-3 py-2 text-xs shadow-lg dark:border-gray-600 dark:bg-gray-900">
      {label != null && label !== '' && (
        <p className="mb-1.5 font-medium text-gray-900 dark:text-gray-100">{String(label)}</p>
      )}
      <ul className="space-y-1">
        {(payload as PayloadEntry[]).map((p) => {
          const key = String(p.dataKey ?? p.name ?? '');
          const title = p.name ?? key;
          const v = p.value;
          const formatted =
            typeof v === 'number'
              ? v.toLocaleString(undefined, { maximumFractionDigits: 4 })
              : v != null
                ? String(v)
                : '—';
          return (
            <li key={key} className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
              <span
                className="inline-block h-2 w-2 shrink-0 rounded-sm"
                style={{ backgroundColor: p.color ?? 'currentColor' }}
              />
              <span className="min-w-0 flex-1 truncate">{title}</span>
              <span className="tabular-nums font-medium text-gray-900 dark:text-gray-50">{formatted}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
