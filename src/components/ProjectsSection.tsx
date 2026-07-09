import { ExternalLink } from "./ExternalLink";
import { SectionHeader } from "./SectionHeader";
import { projects } from "../data/projects";
import type { Locale } from "../data/profile";
import { uiCopy } from "../data/content";

type ProjectsSectionProps = {
  locale: Locale;
};

export function ProjectsSection({ locale }: ProjectsSectionProps) {
  const copy = uiCopy[locale];

  return (
    <section className="page-section projects-section" id="projects" aria-labelledby="projects-title">
      <SectionHeader kicker={copy.projectsKicker} title={copy.projectsTitle} body={copy.projectsBody} />
      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.name}>
            <div className="project-card__meta">
              <span>{project.category}</span>
              <span>{project.status}</span>
            </div>
            <h3>{project.name}</h3>
            <p>{project.description[locale]}</p>
            <p className="project-impact">{project.impact[locale]}</p>
            <div className="tag-cloud tag-cloud--small">
              {project.tech.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <div className="project-actions">
              {project.repo ? (
                <ExternalLink href={project.repo}>{copy.repository}</ExternalLink>
              ) : (
                <span>{copy.privateProject}</span>
              )}
              {project.live ? <ExternalLink href={project.live}>{copy.liveProject}</ExternalLink> : null}
              <small>
                {copy.source}: {project.source}
              </small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
