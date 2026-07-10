import { experience } from "../data/profile";
import type { Locale } from "../data/profile";
import { uiCopy } from "../data/content";
import { SectionHeader } from "./SectionHeader";

type ExperienceSectionProps = {
  locale: Locale;
};

export function ExperienceSection({ locale }: ExperienceSectionProps) {
  const copy = uiCopy[locale];

  return (
    <section className="page-section" id="experience" aria-labelledby="experience-title">
      <SectionHeader kicker={copy.experienceKicker} title={copy.experienceTitle} />
      <div className="resume-block">
        {experience.map((item) => (
          <div className="resume-role" key={`${item.role.en}-${item.period.en}`}>
            <div className="resume-role__head">
              <h3>{item.role[locale]}</h3>
              <time>{item.period[locale]}</time>
            </div>
            <p className="resume-role__org">{item.organization[locale]}</p>
            <ul className="clean-list clean-list--single">
              {item.highlights[locale].map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
