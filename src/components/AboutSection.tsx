import { certifications, education, languages, profile, skills } from "../data/profile";
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
          <div className="tag-cloud">
            {skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
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
          <ul className="clean-list clean-list--single">
            {certifications.map((cert) => (
              <li key={cert.en}>{cert[locale]}</li>
            ))}
          </ul>
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
