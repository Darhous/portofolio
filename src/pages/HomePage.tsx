import { lazy, Suspense } from "react";
import { useOutletContext } from "react-router-dom";
import { Hero } from "../components/Hero";
import { PersonalStory } from "../components/PersonalStory";
import { OperatingSystem } from "../components/OperatingSystem";
import { EvidenceNumbers } from "../components/EvidenceNumbers";
import { SectionHeader } from "../components/SectionHeader";
import { TechStackSection } from "../components/TechStackSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { EducationSection } from "../components/EducationSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { usePageMeta } from "../hooks/usePageMeta";
import { useIdentityShift } from "../hooks/useIdentityShift";
import { featuredProjects, projects } from "../data/projects";
import { FLAGSHIP_COUNT } from "../data/flagship";
import { uiCopy } from "../data/content";
import type { OutletContext } from "../layouts/RootLayout";

// Code-split framer-motion-dependent sections: none of them are needed for
// the initial hero render, so keeping them out of the main chunk avoids
// shipping animation-library weight to every visitor up front.
const ScrollMarquee = lazy(() => import("../components/motion/ScrollMarquee").then((m) => ({ default: m.ScrollMarquee })));
const FlagshipProjects = lazy(() => import("../components/FlagshipProjects").then((m) => ({ default: m.FlagshipProjects })));
const CVSection = lazy(() => import("../components/CVSection").then((m) => ({ default: m.CVSection })));

const META = {
  en: {
    title: "Ahmed Darhous | Officer, Investigator, Strategist, Builder",
    description:
      "Ahmed Darhous combines operational discipline, legal analysis, strategic thinking, and technical execution to build secure, practical digital systems. Portfolio built from his CV and verified GitHub project evidence.",
  },
  ar: {
    title: "أحمد درهوس | ضابط، محقق، استراتيجي، بانٍ",
    description:
      "يجمع أحمد درهوس بين الانضباط التشغيلي والتحليل القانوني والتفكير الاستراتيجي والتنفيذ التقني لبناء أنظمة رقمية آمنة وعملية. بورتفوليو مبني على سيرته الذاتية وأدلة موثقة من GitHub.",
  },
};

export function HomePage() {
  const { locale } = useOutletContext<OutletContext>();
  const copy = uiCopy[locale];
  usePageMeta({ ...META[locale], path: "/" });
  useIdentityShift();

  const remainingFeatured = featuredProjects.slice(FLAGSHIP_COUNT);

  return (
    <>
      <div data-identity="officer">
        <Hero locale={locale} />
      </div>

      <PersonalStory locale={locale} />
      <OperatingSystem locale={locale} />

      <div data-identity="builder">
        <EvidenceNumbers locale={locale} />
        <Suspense fallback={null}>
          <FlagshipProjects locale={locale} />
        </Suspense>
        <div className="page-section marquee-intro">
          <SectionHeader kicker={copy.marqueeKicker} title={copy.marqueeTitle} />
        </div>
        <Suspense fallback={null}>
          <ScrollMarquee projects={projects} />
        </Suspense>
        <ProjectsSection locale={locale} projects={remainingFeatured} startIndex={FLAGSHIP_COUNT} showHeader={false} />
      </div>

      <div data-identity="officer">
        <ExperienceSection locale={locale} />
        <EducationSection locale={locale} />
      </div>

      <div data-identity="builder">
        <TechStackSection locale={locale} />
      </div>

      <div data-identity="officer">
        <Suspense fallback={null}>
          <CVSection locale={locale} />
        </Suspense>
      </div>

      <ContactSection locale={locale} />
    </>
  );
}
