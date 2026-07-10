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
    title: "Ahmed Darhous | Corporate Security, Legal-Tech & AI Operations",
    description:
      "Ahmed Darhous portfolio: corporate security and risk governance, legal research, AI-driven operations, and software products, built from CV and GitHub evidence.",
  },
  ar: {
    title: "أحمد درهوس | الأمن المؤسسي والتقنية القانونية وعمليات الذكاء الاصطناعي",
    description:
      "بورتفوليو أحمد درهوس: الأمن المؤسسي وحوكمة المخاطر، البحث القانوني، عمليات مدعومة بالذكاء الاصطناعي، ومنتجات برمجية، مبني على أدلة من السيرة الذاتية وGitHub.",
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
