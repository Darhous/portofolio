import { Download, Mail, Phone } from "lucide-react";
import { siteConfig } from "../config/site";
import { ExternalLink } from "./ExternalLink";
import { SocialLinks } from "./SocialLinks";

export function ContactSection() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="section-kicker">Open Channel</div>
      <div className="contact-grid">
        <div>
          <h2 id="contact-title">Contact Ahmed Darhous</h2>
          <p>
            For portfolio discussions, legal-tech research, product systems, automation, or
            security-focused digital operations, use the official contact channels below.
          </p>
        </div>
        <div className="contact-panel">
          <ExternalLink className="contact-method" href={siteConfig.contact.email}>
            <Mail aria-hidden="true" />
            <span>Email</span>
          </ExternalLink>
          <ExternalLink className="contact-method" href={siteConfig.contact.phone}>
            <Phone aria-hidden="true" />
            <span>Phone</span>
          </ExternalLink>
          <a className="contact-method" href={siteConfig.assets.cv} download>
            <Download aria-hidden="true" />
            <span>Download CV</span>
          </a>
        </div>
      </div>
      <SocialLinks variant="labels" />
    </section>
  );
}
