import { useOutletContext } from "react-router-dom";
import { Hero } from "../components/Hero";
import { AboutSection } from "../components/AboutSection";
import { ExpertiseSection } from "../components/ExpertiseSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { CaseStudiesSection } from "../components/CaseStudiesSection";
import { CVSection } from "../components/CVSection";
import { ContactSection } from "../components/ContactSection";
import { usePageMeta } from "../hooks/usePageMeta";
import type { OutletContext } from "../layouts/RootLayout";

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
  usePageMeta({ ...META[locale], path: "/" });

  return (
    <>
      <Hero locale={locale} />
      <AboutSection locale={locale} />
      <ExpertiseSection locale={locale} />
      <ExperienceSection locale={locale} />
      <ProjectsSection locale={locale} />
      <CaseStudiesSection locale={locale} />
      <CVSection locale={locale} />
      <ContactSection locale={locale} />
    </>
  );
}
