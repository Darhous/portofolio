import { useRef, type CSSProperties, type MouseEvent } from "react";
import { motion, useScroll, useTransform, type MotionStyle } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ExternalLink } from "../ExternalLink";
import { getAccent } from "../../data/accents";
import { getProjectImage } from "../../data/projectImages";
import type { Project } from "../../data/projects";
import type { Locale } from "../../data/profile";
import { uiCopy } from "../../data/content";
import { useInView } from "../../hooks/useInView";
import { useNarrowViewport, useReducedMotion } from "../../hooks/useReducedMotion";
import { useViewTransitionName } from "../../hooks/useViewTransitionName";
import { withViewTransition } from "../../lib/viewTransition";

type StickyProjectStackProps = {
  projects: Project[];
  locale: Locale;
};

function StackCard({ project, index, total, locale }: { project: Project; index: number; total: number; locale: Locale }) {
  const copy = uiCopy[locale];
  const cardRef = useRef<HTMLDivElement>(null);
  const visualRef = useViewTransitionName<HTMLImageElement>(`project-visual-${project.slug}`);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - index) * 0.035]);
  const opacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0.6]);

  function openCaseStudy(event: MouseEvent) {
    event.preventDefault();
    withViewTransition(() => navigate(`/projects/${project.slug}`));
  }

  return (
    <div className="stack-card-wrapper" ref={cardRef} style={{ top: `${6 + index * 1.5}rem`, zIndex: index + 1 }}>
      <motion.article
        className="stack-card"
        style={{ scale, opacity, "--accent": getAccent(project.category) } as MotionStyle}
      >
        <div className="stack-card__index" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="stack-card__visual">
          <img ref={visualRef} src={getProjectImage(project.slug)} alt="" loading="lazy" width="1200" height="1500" />
        </div>
        <div className="stack-card__body">
          <div className="feature-row__meta">
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
          <p className="feature-row__impact">{project.impact[locale]}</p>
          {project.tech.length > 0 ? (
            <div className="tag-cloud tag-cloud--small">
              {project.tech.slice(0, 5).map((tech) => (
                <Link key={tech} to={`/projects?q=${encodeURIComponent(tech)}`}>
                  {tech}
                </Link>
              ))}
            </div>
          ) : null}
          <div className="feature-row__actions">
            <Link className="text-link" to={`/projects/${project.slug}`} onClick={openCaseStudy}>
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
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export function StickyProjectStack({ projects, locale }: StickyProjectStackProps) {
  const reducedMotion = useReducedMotion();
  const narrow = useNarrowViewport();

  if (reducedMotion) {
    return (
      <div className="stack-static">
        {projects.map((project, index) => (
          <StackCardStatic key={project.id} project={project} index={index} locale={locale} />
        ))}
      </div>
    );
  }

  // The pin-and-scale sticky effect (position: sticky + a continuously
  // scroll-recomputed opacity/scale per card) is unreliable on phones: iOS
  // Safari's dynamic address-bar resize keeps changing the viewport height
  // mid-scroll, which desyncs each card's independently-computed scroll
  // progress from its siblings' and leaves several cards visibly stacked on
  // top of each other instead of handing off cleanly. Rather than dropping
  // motion on mobile entirely, cards still animate in — just via
  // IntersectionObserver-driven CSS transitions (the same proven mechanism
  // ProjectCard/StatChip already use elsewhere), which re-evaluate against
  // whatever the current viewport actually is and can't desync like a
  // pixel-offset scroll calculation can.
  if (narrow) {
    return (
      <div className="stack-static">
        {projects.map((project, index) => (
          <StackCardReveal key={project.id} project={project} index={index} locale={locale} />
        ))}
      </div>
    );
  }

  const vhPerCard = 90;

  return (
    <div className="stack-container" style={{ height: `${projects.length * vhPerCard}vh` }}>
      {projects.map((project, index) => (
        <StackCard key={project.id} project={project} index={index} total={projects.length} locale={locale} />
      ))}
    </div>
  );
}

function StackCardStatic({ project, index, locale }: { project: Project; index: number; locale: Locale }) {
  const copy = uiCopy[locale];
  return (
    <article className="stack-card stack-card--static" style={{ "--accent": getAccent(project.category) } as CSSProperties}>
      <div className="stack-card__index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="stack-card__visual">
        <img src={getProjectImage(project.slug)} alt="" loading="lazy" width="1200" height="1500" />
      </div>
      <div className="stack-card__body">
        <div className="feature-row__meta">
          <span>{project.category}</span>
          <span>{project.status}</span>
          <span>{project.year}</span>
        </div>
        <h3>
          <Link to={`/projects/${project.slug}`}>{project.name}</Link>
        </h3>
        <p>{project.description[locale]}</p>
        <div className="feature-row__actions">
          <Link className="text-link" to={`/projects/${project.slug}`}>
            {copy.viewCaseStudy}
            <ArrowUpRight aria-hidden="true" size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}

function StackCardReveal({ project, index, locale }: { project: Project; index: number; locale: Locale }) {
  const copy = uiCopy[locale];
  const { ref, inView } = useInView<HTMLElement>();
  const navigate = useNavigate();

  function openCaseStudy(event: MouseEvent) {
    event.preventDefault();
    withViewTransition(() => navigate(`/projects/${project.slug}`));
  }

  return (
    <article
      className={`stack-card stack-card--static stack-card--reveal${inView ? " is-visible" : ""}`}
      ref={ref}
      style={{ "--accent": getAccent(project.category) } as CSSProperties}
    >
      <div className="stack-card__index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="stack-card__visual">
        <img src={getProjectImage(project.slug)} alt="" loading="lazy" width="1200" height="1500" />
      </div>
      <div className="stack-card__body">
        <div className="feature-row__meta">
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
        <p className="feature-row__impact">{project.impact[locale]}</p>
        {project.tech.length > 0 ? (
          <div className="tag-cloud tag-cloud--small">
            {project.tech.slice(0, 5).map((tech) => (
              <Link key={tech} to={`/projects?q=${encodeURIComponent(tech)}`}>
                {tech}
              </Link>
            ))}
          </div>
        ) : null}
        <div className="feature-row__actions">
          <Link className="text-link" to={`/projects/${project.slug}`} onClick={openCaseStudy}>
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
        </div>
      </div>
    </article>
  );
}
