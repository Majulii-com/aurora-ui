export type SplitPaneDirection = 'horizontal' | 'vertical';

export interface SplitPaneProps {
  /** Layout direction: horizontal = left/right, vertical = top/bottom */
  direction?: SplitPaneDirection;
  /** Default size of first pane as fraction (0–1), e.g. 0.3 = 30% */
  defaultSize?: number;
  /** Minimum size of first pane (px or %) */
  minSize?: number | string;
  /** Maximum size of first pane (px or %) */
  maxSize?: number | string;
  className?: string;
  children: [React.ReactNode, React.ReactNode];
}
