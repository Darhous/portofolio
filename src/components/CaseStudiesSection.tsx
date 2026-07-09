import { projects } from "../data/projects";
import type { Locale } from "../data/profile";
import { uiCopy } from "../data/content";
import { SectionHeader } from "./SectionHeader";

type CaseStudiesSectionProps = {
  locale: Locale;
};

export function CaseStudiesSection({ locale }: CaseStudiesSectionProps) {
  const copy = uiCopy[locale];
  const caseStudies = projects.filter((project) => project.caseStudy).slice(0, 3);

  return (
    <section className="page-section case-studies-section" aria-labelledby="case-studies-title">
      <SectionHeader kicker={copy.caseStudiesKicker} title={copy.caseStudiesTitle} />
      <div className="case-grid">
        {caseStudies.map((project) => (
          <article className="case-card" key={project.name}>
            <span>{project.category}</span>
            <h3>{project.name}</h3>
            <dl>
              <div>
                <dt>{copy.problem}</dt>
                <dd>{project.caseStudy?.problem[locale]}</dd>
              </div>
              <div>
                <dt>{copy.approach}</dt>
                <dd>{project.caseStudy?.approach[locale]}</dd>
              </div>
              <div>
                <dt>{copy.result}</dt>
                <dd>{project.caseStudy?.result[locale]}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
