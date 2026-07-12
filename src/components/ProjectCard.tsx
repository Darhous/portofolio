import type { CSSProperties, MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ExternalLink } from "./ExternalLink";
import type { Project } from "../data/projects";
import type { Locale } from "../data/profile";
import { uiCopy } from "../data/content";
import { getAccent } from "../data/accents";
import { getProjectImage } from "../data/projectImages";
import { useInView } from "../hooks/useInView";
import { useTilt } from "../hooks/useTilt";
import { useViewTransitionName } from "../hooks/useViewTransitionName";
import { withViewTransition } from "../lib/viewTransition";

type ProjectCardProps = {
  project: Project;
  locale: Locale;
};

export function ProjectCard({ project, locale }: ProjectCardProps) {
  const copy = uiCopy[locale];
  const { ref: inViewRef, inView } = useInView<HTMLElement>();
  const tiltRef = useTilt<HTMLElement>(6);
  const visualRef = useViewTransitionName<HTMLImageElement>(`project-visual-${project.slug}`);
  const navigate = useNavigate();

  function openCaseStudy(event: MouseEvent) {
    event.preventDefault();
    withViewTransition(() => navigate(`/projects/${project.slug}`));
  }

  return (
    <article
      className={`project-card${inView ? " is-visible" : ""}`}
      ref={(node) => {
        inViewRef.current = node;
        tiltRef.current = node;
      }}
      style={{ "--accent": getAccent(project.category) } as CSSProperties}
    >
      <div className="project-card__sheen" aria-hidden="true" />
      <div className="project-card__visual" aria-hidden="true">
        <img ref={visualRef} src={getProjectImage(project.slug)} alt="" loading="lazy" width="1200" height="1500" />
      </div>
      <div className="project-card__meta">
        <span>{project.category}</span>
        <span>{project.status}</span>
        <span>{project.year}</span>
      </div>
      <h3>
        <Link to={`/projects/${project.slug}`} onClick={openCaseStudy}>
          {project.name}
        </Link>
      </h3>
      <p>{project.description[locale]}</p>
      <p className="project-impact">{project.impact[locale]}</p>
      {project.tech.length > 0 ? (
        <div className="tag-cloud tag-cloud--small">
          {project.tech.slice(0, 6).map((tech) => (
            <Link key={tech} to={`/projects?q=${encodeURIComponent(tech)}`}>
              {tech}
            </Link>
          ))}
        </div>
      ) : null}
      <div className="project-actions">
        <Link to={`/projects/${project.slug}`} className="project-actions__case" onClick={openCaseStudy}>
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
