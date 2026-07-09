import { ArrowUp, Download, Mail } from "lucide-react";
import { siteConfig } from "../config/site";
import { ExternalLink } from "./ExternalLink";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();
  const signatureIntro = siteConfig.signature.replace(siteConfig.owner, "").trim();

  return (
    <footer className="site-footer" dir="auto">
      <div className="footer-shell">
        <div className="footer-signature">
          <p>
            {signatureIntro}{" "}
            <ExternalLink href={siteConfig.contact.email}>{siteConfig.owner}</ExternalLink>
          </p>
          <small>
            © {year} {siteConfig.owner}. All rights reserved.
          </small>
        </div>

        <nav className="footer-actions" aria-label="Footer actions">
          <a className="footer-action" href={siteConfig.assets.cv} download>
            <Download aria-hidden="true" size={17} />
            <span>Download CV</span>
          </a>
          <ExternalLink className="footer-action" href={siteConfig.contact.email}>
            <Mail aria-hidden="true" size={17} />
            <span>Contact</span>
          </ExternalLink>
          <a className="footer-action" href="#top">
            <ArrowUp aria-hidden="true" size={17} />
            <span>Back To Top</span>
          </a>
        </nav>

        <SocialLinks />
      </div>
    </footer>
  );
}
