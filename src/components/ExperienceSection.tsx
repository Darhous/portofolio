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
    <section className="page-section" id="journey" aria-labelledby="journey-title">
      <SectionHeader kicker={copy.journeyKicker} title={copy.journeyTitle} />
      <div className="resume-block">
        {experience.map((item) => {
          const isCurrent = item.period.en.toLowerCase().includes("present");
          return (
            <div className={`resume-role${isCurrent ? " is-current" : ""}`} key={`${item.role.en}-${item.period.en}`}>
              <div className="resume-role__head">
                <h3>{item.role[locale]}</h3>
                <time>
                  {item.period[locale]}
                  {isCurrent ? <span className="resume-role__badge">{copy.journeyCurrent}</span> : null}
                </time>
              </div>
              <p className="resume-role__org">{item.organization[locale]}</p>
              <ul className="clean-list clean-list--single">
                {item.highlights[locale].map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
