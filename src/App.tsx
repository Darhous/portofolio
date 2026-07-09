import { useState } from "react";
import { ExternalLink } from "./components/ExternalLink";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { siteConfig } from "./config/site";
import "./styles.css";

type Locale = "en" | "ar";

const copy = {
  en: {
    language: "العربية",
    eyebrow: "Law, security, AI, and systems",
    title: "Ahmed Darhous builds disciplined digital operations.",
    body:
      "A bilingual portfolio foundation for a multidisciplinary profile spanning legal research, public security, automation, software products, and practical AI systems.",
    cv: "Download CV",
    repo: "Portfolio Repository",
  },
  ar: {
    language: "English",
    eyebrow: "القانون والأمن والذكاء الاصطناعي والأنظمة",
    title: "أحمد درهوس يبني عمليات رقمية منضبطة.",
    body:
      "أساس بورتفوليو ثنائي اللغة لهوية مهنية متعددة التخصصات تجمع بين البحث القانوني، الأمن العام، الأتمتة، المنتجات البرمجية، وأنظمة الذكاء الاصطناعي العملية.",
    cv: "تحميل السيرة الذاتية",
    repo: "مستودع البورتفوليو",
  },
} as const;

function App() {
  const [locale, setLocale] = useState<Locale>("en");
  const content = copy[locale];
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <div className="app-shell" dir={direction} lang={locale}>
      <header className="topbar" id="top">
        <a className="brand" href="#top" aria-label="Ahmed Darhous home">
          AD
        </a>
        <button
          className="language-toggle"
          type="button"
          onClick={() => setLocale((current) => (current === "en" ? "ar" : "en"))}
        >
          {content.language}
        </button>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">{content.eyebrow}</p>
            <h1 id="hero-title">{content.title}</h1>
            <p>{content.body}</p>
            <div className="hero-actions">
              <a className="primary-action" href={siteConfig.assets.cv} download>
                {content.cv}
              </a>
              <ExternalLink className="secondary-action" href={siteConfig.repository}>
                {content.repo}
              </ExternalLink>
            </div>
          </div>
          <div className="portrait-lockup" aria-label="Ahmed Darhous portrait">
            <img src={siteConfig.assets.portrait} alt="Ahmed Darhous" />
          </div>
        </section>

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
