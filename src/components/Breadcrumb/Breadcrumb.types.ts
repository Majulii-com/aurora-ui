export interface BreadcrumbItemProps {
  href?: string;
  current?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional separator between items (default: /) */
  separator?: React.ReactNode;
  children?: React.ReactNode;
}
