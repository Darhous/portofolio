import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "./ExternalLink";
import type { Project } from "../data/projects";
import type { Locale } from "../data/profile";
import { uiCopy } from "../data/content";
import { getAccent } from "../data/accents";

type ProjectCardProps = {
  project: Project;
  locale: Locale;
};

export function ProjectCard({ project, locale }: ProjectCardProps) {
  const copy = uiCopy[locale];

  return (
    <article className="project-card" style={{ "--accent": getAccent(project.category) } as CSSProperties}>
      <div className="project-card__meta">
        <span>{project.category}</span>
        <span>{project.status}</span>
        <span>{project.year}</span>
      </div>
      <h3>
        <Link to={`/projects/${project.slug}`}>{project.name}</Link>
      </h3>
      <p>{project.description[locale]}</p>
      <p className="project-impact">{project.impact[locale]}</p>
      {project.tech.length > 0 ? (
        <div className="tag-cloud tag-cloud--small">
          {project.tech.slice(0, 6).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      ) : null}
      <div className="project-actions">
        <Link to={`/projects/${project.slug}`} className="project-actions__case">
          {copy.viewCaseStudy}
        </Link>
        {project.repo ? <ExternalLink href={project.repo}>{copy.repository}</ExternalLink> : null}
        {project.live ? <ExternalLink href={project.live}>{copy.liveProject}</ExternalLink> : null}
        {!project.repo && !project.live ? <span>{copy.privateProject}</span> : null}
        <small>
          {copy.source}: {project.source}
        </small>
      </div>
    </article>
  );
}
