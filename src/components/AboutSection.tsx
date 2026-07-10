import { certificationGroups, competencyGroups, education, languages, profile } from "../data/profile";
import type { Locale } from "../data/profile";
import { uiCopy } from "../data/content";
import { SectionHeader } from "./SectionHeader";

type AboutSectionProps = {
  locale: Locale;
};

export function AboutSection({ locale }: AboutSectionProps) {
  const copy = uiCopy[locale];

  return (
    <section className="page-section about-section" id="about" aria-labelledby="about-title">
      <SectionHeader kicker={copy.aboutKicker} title={copy.aboutTitle} body={copy.aboutBody} />
      <div className="about-grid">
        <article className="statement-panel">
          <h3>{profile.shortTitle[locale]}</h3>
          <p>{profile.summary[locale]}</p>
        </article>
        <article className="compact-panel">
          <h3>{copy.skillsTitle}</h3>
          {competencyGroups.map((group) => (
            <div className="competency-group" key={group.title.en}>
              <h4>{group.title[locale]}</h4>
              <div className="tag-cloud tag-cloud--small">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </article>
        <article className="compact-panel">
          <h3>{copy.languagesTitle}</h3>
          <ul className="clean-list">
            {languages.map((language) => (
              <li key={language.name.en}>
                <strong>{language.name[locale]}</strong>
                <span>{language.level[locale]}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="compact-panel">
          <h3>{copy.certsTitle}</h3>
          {certificationGroups.map((group) => (
            <div className="competency-group" key={group.category.en}>
              <h4>{group.category[locale]}</h4>
              <ul className="clean-list clean-list--single">
                {group.items.map((item) => (
                  <li key={item.en}>{item[locale]}</li>
                ))}
              </ul>
            </div>
          ))}
        </article>
        <article className="compact-panel education-panel">
          <h3>{copy.credentialsTitle}</h3>
          <ul className="timeline-list">
            {education.map((item) => (
              <li key={`${item.school}-${item.period}`}>
                <strong>{item.school}</strong>
                <span>{item.credential[locale]}</span>
                <small>{item.period}</small>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
