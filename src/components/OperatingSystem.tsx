import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { operatingSystem } from "../data/operatingSystem";
import { uiCopy } from "../data/content";
import type { Locale } from "../data/profile";

type OperatingSystemProps = {
  locale: Locale;
};

export function OperatingSystem({ locale }: OperatingSystemProps) {
  const copy = uiCopy[locale];

  return (
    <section className="page-section operating-system" id="system" aria-labelledby="system-title">
      <SectionHeader kicker={copy.systemKicker} title={copy.systemTitle} body={copy.systemBody} />
      <div className="operating-system__grid">
        <div className="operating-system__line" aria-hidden="true" />
        {operatingSystem.map((pillar) => (
          <a
            key={pillar.key}
            className="operating-system__pillar"
            data-pillar={pillar.key}
            href={pillar.linkHref}
          >
            <span className="operating-system__node" aria-hidden="true" />
            <h3>{pillar.title[locale]}</h3>
            <p>{pillar.body[locale]}</p>
            <span className="operating-system__link">
              {pillar.linkLabel[locale]}
              <ArrowUpRight aria-hidden="true" size={14} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
