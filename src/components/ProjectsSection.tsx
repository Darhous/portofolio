import { Link } from "react-router-dom";
import { SectionHeader } from "./SectionHeader";
import { ProjectCard } from "./ProjectCard";
import { featuredProjects } from "../data/projects";
import type { Locale } from "../data/profile";
import { uiCopy } from "../data/content";

type ProjectsSectionProps = {
  locale: Locale;
};

export function ProjectsSection({ locale }: ProjectsSectionProps) {
  const copy = uiCopy[locale];

  return (
    <section className="page-section projects-section" id="projects" aria-labelledby="projects-title">
      <SectionHeader kicker={copy.projectsKicker} title={copy.projectsTitle} body={copy.projectsBody}>
        <Link className="secondary-action section-header__cta" to="/projects">
          {copy.viewAllProjects}
        </Link>
      </SectionHeader>
      <div className="projects-grid">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} locale={locale} />
        ))}
      </div>
    </section>
  );
}
