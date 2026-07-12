import { SectionHeader } from "./SectionHeader";
import { uiCopy } from "../data/content";
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

type CareerTimelineProps = {
  locale: Locale;
};

export function CareerTimeline({ locale }: CareerTimelineProps) {
  const copy = uiCopy[locale];

  return (
    <section className="page-section career-timeline-section" aria-labelledby="timeline-title">
      <SectionHeader kicker={copy.timelineKicker} title={copy.timelineTitle} />
      <ol className="career-timeline">
        {milestones.map((milestone) => (
          <li key={milestone.year} className="career-timeline__item">
            <span className="career-timeline__year">{milestone.year}</span>
            <span className="career-timeline__label">{milestone.label[locale]}</span>
            <span className="career-timeline__org">{milestone.org[locale]}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
