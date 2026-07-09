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
      <div className="experience-list">
        {experience.map((item) => (
          <article className="experience-card" key={`${item.role.en}-${item.period.en}`}>
            <div>
              <h3>{item.role[locale]}</h3>
              <p>{item.organization[locale]}</p>
              <small>{item.period[locale]}</small>
            </div>
            <ul>
              {item.highlights[locale].map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
