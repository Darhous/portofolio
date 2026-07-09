import type { AnchorHTMLAttributes, PropsWithChildren } from "react";

type ExternalLinkProps = PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>;

export function ExternalLink({ children, ...props }: ExternalLinkProps) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
