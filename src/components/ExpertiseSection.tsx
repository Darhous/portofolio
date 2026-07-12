import { FadeIn } from "./motion/FadeIn";
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
    <section className="expertise-panel" id="expertise" aria-labelledby="expertise-title">
      <div className="page-section expertise-panel__inner">
        <SectionHeader kicker={copy.expertiseKicker} title={copy.expertiseTitle} />
        <ol className="expertise-list">
          {expertise.map((item, index) => (
            <FadeIn as="li" key={item.title.en} delay={index * 0.1} className="expertise-row">
              <span className="expertise-row__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="expertise-row__body">
                <h3>{item.title[locale]}</h3>
                <p>{item.body[locale]}</p>
              </div>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
