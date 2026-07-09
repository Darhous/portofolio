import { Download, ExternalLink as ExternalLinkIcon, FileText } from "lucide-react";
import { siteConfig } from "../config/site";
import type { Locale } from "../data/profile";
import { profile } from "../data/profile";
import { uiCopy } from "../data/content";
import { ExternalLink } from "./ExternalLink";
import { SectionHeader } from "./SectionHeader";

type CVSectionProps = {
  locale: Locale;
};

export function CVSection({ locale }: CVSectionProps) {
  const copy = uiCopy[locale];

  return (
    <section className="page-section cv-section" id="cv" aria-labelledby="cv-title">
      <SectionHeader kicker={copy.cvKicker} title={copy.cvTitle} body={copy.cvBody} />
      <div className="cv-panel">
        <div className="cv-icon" aria-hidden="true">
          <FileText />
        </div>
        <div>
          <h3>{profile.name} - Profile.pdf</h3>
          <p>
            {copy.cvSource}: {profile.headline[locale]}
          </p>
        </div>
        <div className="cv-actions">
          <ExternalLink className="secondary-action" href={siteConfig.assets.cv}>
            <ExternalLinkIcon aria-hidden="true" size={18} />
            <span>{copy.openCv}</span>
          </ExternalLink>
          <a className="primary-action" href={siteConfig.assets.cv} download>
            <Download aria-hidden="true" size={18} />
            <span>{copy.downloadCv}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
