import { expertise } from "../data/profile";
import type { Locale } from "../data/profile";
import { uiCopy } from "../data/content";
import { SectionHeader } from "./SectionHeader";

type ExpertiseSectionProps = {
  locale: Locale;
};

export function ExpertiseSection({ locale }: ExpertiseSectionProps) {
  const copy = uiCopy[locale];

  return (
    <section className="page-section" id="expertise" aria-labelledby="expertise-title">
      <SectionHeader kicker={copy.expertiseKicker} title={copy.expertiseTitle} />
      <div className="expertise-grid">
        {expertise.map((item) => (
          <article className="expertise-item" key={item.title.en}>
            <h3>{item.title[locale]}</h3>
            <p>{item.body[locale]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
