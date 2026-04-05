import type { HTMLAttributes, ReactNode } from "react";

export function Card({
  children,
  className = "",
  ...rest
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={`rounded-lg border border-border-subtle bg-surface-card shadow-sm ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
