import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { ExternalLink } from "./ExternalLink";
import { featuredProjects, type Project } from "../data/projects";
import { getAccent } from "../data/accents";
import { getProjectImage } from "../data/projectImages";
import { useInView } from "../hooks/useInView";
import type { Locale } from "../data/profile";
import { uiCopy } from "../data/content";

type ProjectsSectionProps = {
  locale: Locale;
  projects?: Project[];
  startIndex?: number;
  showHeader?: boolean;
};

function FeatureRow({ project, index, locale, copy }: { project: Project; index: number; locale: Locale; copy: Record<string, string> }) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <article
      className={`feature-row${inView ? " is-visible" : ""}`}
      ref={ref}
      style={{ "--accent": getAccent(project.category), transitionDelay: `${Math.min(index * 70, 350)}ms` } as CSSProperties}
    >
      <div className="feature-row__visual" aria-hidden="true">
        <span className="feature-row__index">{String(index + 1).padStart(2, "0")}</span>
        <img src={getProjectImage(project.slug)} alt="" loading="lazy" width="1200" height="1500" />
      </div>

      <div className="feature-row__content">
        <div className="feature-row__meta">
          <span>{project.category}</span>
          <span>{project.status}</span>
          <span>{project.year}</span>
        </div>
        <h3>
          <Link to={`/projects/${project.slug}`}>{project.name}</Link>
        </h3>
        <p>{project.description[locale]}</p>
        <p className="feature-row__impact">{project.impact[locale]}</p>

        {project.tech.length > 0 ? (
          <div className="tag-cloud tag-cloud--small">
            {project.tech.slice(0, 5).map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        ) : null}

        <div className="feature-row__actions">
          <Link className="text-link" to={`/projects/${project.slug}`}>
            {copy.viewCaseStudy}
            <ArrowUpRight aria-hidden="true" size={15} />
          </Link>
          {project.repo ? (
            <ExternalLink className="text-link" href={project.repo}>
              {copy.repository}
            </ExternalLink>
          ) : null}
          {project.live ? (
            <ExternalLink className="text-link" href={project.live}>
              {copy.liveProject}
            </ExternalLink>
          ) : null}
          {!project.repo && !project.live ? <span className="text-link text-link--muted">{copy.privateProject}</span> : null}
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection({ locale, projects = featuredProjects, startIndex = 0, showHeader = true }: ProjectsSectionProps) {
  const copy = uiCopy[locale];

  return (
    <section
      className="page-section projects-section"
      id={showHeader ? "projects" : undefined}
      aria-labelledby={showHeader ? "projects-title" : undefined}
    >
      {showHeader ? (
        <SectionHeader kicker={copy.projectsKicker} title={copy.projectsTitle} body={copy.projectsBody}>
          <Link className="secondary-action section-header__cta" to="/projects">
            {copy.viewAllProjects}
          </Link>
        </SectionHeader>
      ) : (
        <div className="section-header section-header--minimal">
          <p className="section-kicker">{copy.moreProjectsKicker}</p>
          <Link className="secondary-action section-header__cta" to="/projects">
            {copy.viewAllProjects}
          </Link>
        </div>
      )}

      <div className="feature-list">
        {projects.map((project, index) => (
          <FeatureRow key={project.id} project={project} index={startIndex + index} locale={locale} copy={copy} />
        ))}
      </div>
    </section>
  );
}
