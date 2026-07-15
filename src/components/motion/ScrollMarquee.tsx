import { useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { getAccent } from "../../data/accents";
import { getProjectImage } from "../../data/projectImages";
import type { Project } from "../../data/projects";
import { useNarrowViewport, useReducedMotion } from "../../hooks/useReducedMotion";

type ScrollMarqueeProps = {
  projects: Project[];
};

function MarqueeRow({ projects, direction, narrow }: { projects: Project[]; direction: 1 | -1; narrow: boolean }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });
  const reach = narrow ? 3 : 8;
  const x = useTransform(scrollYProgress, [0, 1], [`${direction * -reach}%`, `${direction * reach}%`]);
  // Doubled for a seamless visual loop; the second copy is decorative only
  // (aria-hidden + untabbable) so keyboard/screen-reader users hit each
  // project once, not twice.
  const doubled = [...projects, ...projects];

  return (
    <div className="marquee-row" ref={rowRef}>
      <motion.div className="marquee-row__track" style={{ x }}>
        {doubled.map((project, index) => {
          const isDuplicate = index >= projects.length;
          return (
            <Link
              key={`${project.id}-${index}`}
              to={`/projects/${project.slug}`}
              className="marquee-tile"
              style={{ "--accent": getAccent(project.category) } as CSSProperties}
              tabIndex={isDuplicate ? -1 : undefined}
              aria-hidden={isDuplicate ? true : undefined}
            >
              <img src={getProjectImage(project.slug)} alt="" loading="lazy" width="1200" height="1500" />
              <span className="marquee-tile__name">{project.name}</span>
              <span className="marquee-tile__category">{project.category}</span>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}

export function ScrollMarquee({ projects }: ScrollMarqueeProps) {
  const reducedMotion = useReducedMotion();
  const narrow = useNarrowViewport();
  const rowA = projects.filter((_, index) => index % 2 === 0);
  const rowB = projects.filter((_, index) => index % 2 === 1);

  if (reducedMotion) {
    return (
      <div className="marquee-static">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.slug}`}
            className="marquee-static__item"
            style={{ "--accent": getAccent(project.category) } as CSSProperties}
          >
            <span className="marquee-static__name">{project.name}</span>
            <span className="marquee-static__category">{project.category}</span>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="marquee">
      <MarqueeRow projects={rowA} direction={1} narrow={narrow} />
      <MarqueeRow projects={rowB} direction={-1} narrow={narrow} />
    </div>
  );
}
