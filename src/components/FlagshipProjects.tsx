import { SectionHeader } from "./SectionHeader";
import { StickyProjectStack } from "./motion/StickyProjectStack";
import { featuredProjects } from "../data/projects";
import { FLAGSHIP_COUNT } from "../data/flagship";
import type { Locale } from "../data/profile";
import { uiCopy } from "../data/content";

type FlagshipProjectsProps = {
  locale: Locale;
};

export function FlagshipProjects({ locale }: FlagshipProjectsProps) {
  const copy = uiCopy[locale];
  const flagship = featuredProjects.slice(0, FLAGSHIP_COUNT);

  return (
    <section className="page-section flagship-section" id="flagship" aria-labelledby="projects-title">
      <SectionHeader kicker={copy.projectsKicker} title={copy.projectsTitle} body={copy.projectsBody} />
      <StickyProjectStack projects={flagship} locale={locale} />
    </section>
  );
}
