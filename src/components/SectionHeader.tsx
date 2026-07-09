import type { PropsWithChildren } from "react";

type SectionHeaderProps = PropsWithChildren<{
  kicker: string;
  title: string;
  body?: string;
}>;

export function SectionHeader({ kicker, title, body, children }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <p className="section-kicker">{kicker}</p>
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
      {children}
    </div>
  );
}
