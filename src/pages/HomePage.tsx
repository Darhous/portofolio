import { lazy, Suspense } from "react";
import { useOutletContext } from "react-router-dom";
import { Hero } from "../components/Hero";
import { CareerTimeline } from "../components/CareerTimeline";
import { SectionHeader } from "../components/SectionHeader";
import { AboutSection } from "../components/AboutSection";
import { TechStackSection } from "../components/TechStackSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { CaseStudiesSection } from "../components/CaseStudiesSection";
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
const ExpertiseSection = lazy(() => import("../components/ExpertiseSection").then((m) => ({ default: m.ExpertiseSection })));
const FlagshipProjects = lazy(() => import("../components/FlagshipProjects").then((m) => ({ default: m.FlagshipProjects })));
const CVSection = lazy(() => import("../components/CVSection").then((m) => ({ default: m.CVSection })));

const META = {
  en: {
    title: "Ahmed Darhous | Security Operations & Crisis Management",
    description:
      "Ahmed Darhous: Security Operations Manager, Crisis Management Specialist, and MBA Candidate. Portfolio built from his CV and verified GitHub project evidence.",
  },
  ar: {
    title: "أحمد درهوس | العمليات الأمنية وإدارة الأزمات",
    description:
      "أحمد درهوس: مدير عمليات أمنية، أخصائي إدارة أزمات، ومرشح ماجستير إدارة أعمال. بورتفوليو مبني على سيرته الذاتية وأدلة موثقة من GitHub.",
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
        <CareerTimeline locale={locale} />
      </div>
      <div data-identity="builder">
        <div className="page-section marquee-intro">
          <SectionHeader kicker={copy.marqueeKicker} title={copy.marqueeTitle} />
        </div>
        <Suspense fallback={null}>
          <ScrollMarquee projects={projects} />
        </Suspense>
      </div>
      <AboutSection locale={locale} />
      <div data-identity="officer">
        <Suspense fallback={null}>
          <ExpertiseSection locale={locale} />
        </Suspense>
      </div>
      <div data-identity="builder">
        <TechStackSection locale={locale} />
      </div>
      <div data-identity="officer">
        <ExperienceSection locale={locale} />
      </div>
      <div data-identity="builder">
        <Suspense fallback={null}>
          <FlagshipProjects locale={locale} />
        </Suspense>
        <ProjectsSection locale={locale} projects={remainingFeatured} startIndex={FLAGSHIP_COUNT} showHeader={false} />
        <CaseStudiesSection locale={locale} />
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
