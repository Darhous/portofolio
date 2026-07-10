import { ArrowRight, Download, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "../config/site";
import type { Locale } from "../data/profile";
import { uiCopy } from "../data/content";
import { ExternalLink } from "./ExternalLink";
import { SocialLinks } from "./SocialLinks";

type ContactSectionProps = {
  locale: Locale;
};

export function ContactSection({ locale }: ContactSectionProps) {
  const copy = uiCopy[locale];

  return (
    <section className="page-section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="section-kicker">{copy.contactKicker}</div>
      <div className="contact-grid">
        <div>
          <h2 id="contact-title">{copy.contactTitle}</h2>
          <p>{copy.contactBody}</p>
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
          <Link className="contact-method contact-method--cta" to="/contact">
            <span>{copy.contactFormLink}</span>
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
      <SocialLinks variant="labels" />
    </section>
  );
}
