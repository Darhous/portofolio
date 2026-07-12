import { useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getAccent } from "../../data/accents";
import { getProjectImage } from "../../data/projectImages";
import type { Project } from "../../data/projects";
import { useNarrowViewport, useReducedMotion } from "../../hooks/useReducedMotion";

type ScrollMarqueeProps = {
  projects: Project[];
};

function monogram(name: string): string {
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

function MarqueeRow({ projects, direction, narrow }: { projects: Project[]; direction: 1 | -1; narrow: boolean }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });
  const reach = narrow ? 3 : 8;
  const x = useTransform(scrollYProgress, [0, 1], [`${direction * -reach}%`, `${direction * reach}%`]);
  const doubled = [...projects, ...projects];

  return (
    <div className="marquee-row" ref={rowRef}>
      <motion.div className="marquee-row__track" style={{ x }}>
        {doubled.map((project, index) => (
          <div
            key={`${project.id}-${index}`}
            className="marquee-tile"
            style={{ "--accent": getAccent(project.category) } as CSSProperties}
          >
            <img src={getProjectImage(project.slug)} alt="" loading="lazy" width="1200" height="1500" />
            <span className="marquee-tile__name">{project.name}</span>
            <span className="marquee-tile__category">{project.category}</span>
          </div>
        ))}
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
      <div className="marquee-static" aria-hidden="true">
        {projects.slice(0, 8).map((project) => (
          <span key={project.id} className="marquee-static__item" style={{ "--accent": getAccent(project.category) } as CSSProperties}>
            {monogram(project.name)}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="marquee" aria-hidden="true">
      <MarqueeRow projects={rowA} direction={1} narrow={narrow} />
      <MarqueeRow projects={rowB} direction={-1} narrow={narrow} />
    </div>
  );
}
