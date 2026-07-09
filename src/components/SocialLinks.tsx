import { socialLinks } from "../config/site";
import { ExternalLink } from "./ExternalLink";

type SocialLinksProps = {
  variant?: "icons" | "labels";
};

export function SocialLinks({ variant = "icons" }: SocialLinksProps) {
  return (
    <ul className={`social-links social-links--${variant}`} aria-label="Social links">
      {socialLinks.map(({ key, label, href, icon: Icon }) => (
        <li key={key}>
          <ExternalLink className="social-link" href={href} aria-label={label} title={label}>
            <Icon aria-hidden="true" size={variant === "icons" ? 18 : 16} strokeWidth={1.8} />
            {variant === "labels" ? <span>{label}</span> : null}
          </ExternalLink>
        </li>
      ))}
    </ul>
  );
}
