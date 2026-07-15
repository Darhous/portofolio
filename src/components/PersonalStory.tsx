import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { personalStory } from "../data/personalStory";
import { uiCopy } from "../data/content";
import { useNarrowViewport, useReducedMotion } from "../hooks/useReducedMotion";
import type { Locale } from "../data/profile";

type PersonalStoryProps = {
  locale: Locale;
};

const PILLAR_LABEL: Record<string, Record<Locale, string>> = {
  evidence: { en: "Evidence", ar: "الإثبات" },
  discipline: { en: "Discipline", ar: "الانضباط" },
  strategy: { en: "Strategy", ar: "الاستراتيجية" },
  execution: { en: "Execution", ar: "التنفيذ" },
};

function StoryStatic({ locale }: { locale: Locale }) {
  return (
    <ol className="story-static">
      {personalStory.map((stage) => (
        <li key={stage.year} className="story-static__item" data-pillar={stage.pillar}>
          <span className="story-static__year">{stage.year}</span>
          <h3>{stage.title[locale]}</h3>
          <p className="story-static__org">{stage.org[locale]}</p>
          <p>{stage.summary[locale]}</p>
          <p className="story-static__lesson">{stage.lesson[locale]}</p>
        </li>
      ))}
    </ol>
  );
}

export function PersonalStory({ locale }: PersonalStoryProps) {
  const copy = uiCopy[locale];
  const reducedMotion = useReducedMotion();
  const narrow = useNarrowViewport();
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    let frame: number | undefined;

    function measure() {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const progress = total > 0 ? scrolled / total : 0;
      const index = Math.min(personalStory.length - 1, Math.floor(progress * personalStory.length));
      setActive(index);
      frame = undefined;
    }

    function onScroll() {
      if (frame !== undefined) return;
      frame = requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== undefined) cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return (
    <section className="page-section story-section" id="story" aria-labelledby="story-title">
      <SectionHeader kicker={copy.storyKicker} title={copy.storyTitle} />

      {reducedMotion ? (
        <StoryStatic locale={locale} />
      ) : (
        <div
          className="story-scroller"
          ref={containerRef}
          style={{ height: `${personalStory.length * (narrow ? 62 : 100)}vh` }}
        >
          <div className="story-sticky">
            <div className="story-rail" aria-hidden="true">
              {personalStory.map((stage, index) => (
                <span key={stage.year} className={`story-rail__dot${index === active ? " is-active" : ""}`} />
              ))}
            </div>
            {personalStory.map((stage, index) => (
              <article
                key={stage.year}
                className={`story-stage${index === active ? " is-active" : ""}`}
                data-pillar={stage.pillar}
                aria-hidden={index === active ? undefined : true}
              >
                <span className="story-stage__pillar">{PILLAR_LABEL[stage.pillar][locale]}</span>
                <span className="story-stage__year">{stage.year}</span>
                <h3>{stage.title[locale]}</h3>
                <p className="story-stage__org">{stage.org[locale]}</p>
                <p className="story-stage__summary">{stage.summary[locale]}</p>
                <p className="story-stage__lesson">
                  <span>{copy.storyLesson}</span>
                  {stage.lesson[locale]}
                </p>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
