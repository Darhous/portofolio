import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import type { Locale } from "../data/profile";
import { uiCopy } from "../data/content";
import { getAccent } from "../data/accents";
import { SectionHeader } from "./SectionHeader";

type CaseStudiesSectionProps = {
  locale: Locale;
};

export function CaseStudiesSection({ locale }: CaseStudiesSectionProps) {
  const copy = uiCopy[locale];
  const caseStudies = projects.filter((project) => project.featured && project.caseStudy).slice(0, 3);

  return (
    <section className="page-section case-studies-section" aria-labelledby="case-studies-title">
      <SectionHeader kicker={copy.caseStudiesKicker} title={copy.caseStudiesTitle} />
      <div className="case-grid">
        {caseStudies.map((project) => (
          <article
            className="case-card"
            key={project.id}
            style={{ "--accent": getAccent(project.category) } as CSSProperties}
          >
            <span>{project.category}</span>
            <h3>
              <Link to={`/projects/${project.slug}`}>{project.name}</Link>
            </h3>
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
                <dd>{project.caseStudy?.result?.[locale] ?? project.caseStudy?.results?.[locale][0]}</dd>
              </div>
            </dl>
            <Link className="case-card__link" to={`/projects/${project.slug}`}>
              {copy.viewCaseStudy}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
