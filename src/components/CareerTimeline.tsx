import { useEffect, useRef, useState, type CSSProperties } from "react";
import { SectionHeader } from "./SectionHeader";
import { uiCopy } from "../data/content";
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";
import type { Locale, Localized } from "../data/profile";

type Milestone = {
  year: string;
  label: Localized<string>;
  org: Localized<string>;
};

const milestones: Milestone[] = [
  {
    year: "2017",
    label: { en: "Bachelor of Law & Police Sciences", ar: "ليسانس الحقوق وعلوم الشرطة" },
    org: { en: "Police Academy", ar: "أكاديمية الشرطة" },
  },
  {
    year: "2018",
    label: { en: "Criminal Investigation Officer", ar: "ضابط تحقيق جنائي" },
    org: { en: "Ministry of Interior", ar: "وزارة الداخلية" },
  },
  {
    year: "2024",
    label: { en: "MBA in progress", ar: "دراسة ماجستير إدارة الأعمال" },
    org: { en: "The American University in Cairo", ar: "الجامعة الأمريكية بالقاهرة" },
  },
  {
    year: "2025",
    label: { en: "30+ self-taught software projects shipped", ar: "أكثر من 30 مشروعًا برمجيًا تم إطلاقه ذاتيًا" },
    org: { en: "Off duty, entirely self-built", ar: "في وقته الخاص، بمجهود ذاتي بالكامل" },
  },
];

function TimelineItem({ milestone, index, locale }: { milestone: Milestone; index: number; locale: Locale }) {
  const { ref, inView } = useInView<HTMLLIElement>();
  return (
    <li
      ref={ref}
      className={`career-timeline__item${inView ? " is-visible" : ""}`}
      style={{ "--index": index } as CSSProperties}
    >
      <span className="career-timeline__year">{milestone.year}</span>
      <span className="career-timeline__label">{milestone.label[locale]}</span>
      <span className="career-timeline__org">{milestone.org[locale]}</span>
    </li>
  );
}

type CareerTimelineProps = {
  locale: Locale;
};

export function CareerTimeline({ locale }: CareerTimelineProps) {
  const copy = uiCopy[locale];
  const reducedMotion = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    let frame: number | undefined;

    function measure() {
      const el = listRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const raw = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      setProgress(Math.min(1, Math.max(0, raw)));
      frame = undefined;
    }

    function onScroll() {
      if (frame !== undefined) return;
      frame = requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== undefined) cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return (
    <section className="page-section career-timeline-section" aria-labelledby="timeline-title">
      <SectionHeader kicker={copy.timelineKicker} title={copy.timelineTitle} />
      <ol className="career-timeline" ref={listRef}>
        {!reducedMotion ? (
          <span className="career-timeline__pulse" aria-hidden="true" style={{ left: `${progress * 100}%` }} />
        ) : null}
        {milestones.map((milestone, index) => (
          <TimelineItem key={milestone.year} milestone={milestone} index={index} locale={locale} />
        ))}
      </ol>
    </section>
  );
}
