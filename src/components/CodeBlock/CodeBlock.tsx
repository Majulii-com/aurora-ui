import { cn } from '../../utils';
import type { CodeBlockProps } from './CodeBlock.types';

export function CodeBlock({
  code,
  lines: linesProp,
  language,
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const lines =
    linesProp ??
    (code != null ? code.split('\n') : []);

  return (
    <div
      className={cn(
        'rounded-lg bg-gray-900 dark:bg-gray-950 text-gray-100 overflow-x-auto font-mono text-sm',
        className
      )}
      data-language={language}
    >
      <table className="w-full border-collapse">
        <tbody>
          {lines.map((line, i) => (
            <tr key={i} className="hover:bg-white/5">
              {showLineNumbers && (
                <td
                  className="w-10 shrink-0 select-none pr-4 text-right text-gray-500 border-r border-gray-700 py-0.5 pl-3"
                  aria-hidden
                >
                  {i + 1}
                </td>
              )}
              <td className="py-0.5 pr-4 pl-3 whitespace-pre">{line || ' '}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
