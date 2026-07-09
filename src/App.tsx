import { useState } from "react";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ExpertiseSection } from "./components/ExpertiseSection";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Intro } from "./components/Intro";
import { ProjectsSection } from "./components/ProjectsSection";
import { navItems, uiCopy } from "./data/content";
import type { Locale } from "./data/profile";
import "./styles.css";

function App() {
  const [locale, setLocale] = useState<Locale>("en");
  const content = uiCopy[locale];
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <div className="app-shell" dir={direction} lang={locale}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Intro locale={locale} />
      <header className="topbar" id="top">
        <a className="brand" href="#top" aria-label="Ahmed Darhous home">
          AD
        </a>
        <nav className="main-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label[locale]}
            </a>
          ))}
        </nav>
        <button
          className="language-toggle"
          type="button"
          onClick={() => setLocale((current) => (current === "en" ? "ar" : "en"))}
        >
          {content.switchLanguage}
        </button>
      </header>

      <main id="main-content">
        <Hero locale={locale} />
        <AboutSection locale={locale} />
        <ExpertiseSection locale={locale} />
        <ExperienceSection locale={locale} />
        <ProjectsSection locale={locale} />
        <ContactSection locale={locale} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
