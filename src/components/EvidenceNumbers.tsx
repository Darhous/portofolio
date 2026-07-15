import type { CSSProperties } from "react";
import { SectionHeader } from "./SectionHeader";
import { StatChip } from "./StatChip";
import { projects } from "../data/projects";
import { techStack } from "../data/techStack";
import { uiCopy } from "../data/content";
import type { Locale } from "../data/profile";

type EvidenceNumbersProps = {
  locale: Locale;
};

export function EvidenceNumbers({ locale }: EvidenceNumbersProps) {
  const copy = uiCopy[locale];

  const items = [
    {
      value: `${projects.length}+`,
      label: {
        en: "Projects shipped across legal tech, education, commerce, automation, and security.",
        ar: "مشروعًا تم إطلاقه فعليًا عبر التقنية القانونية والتعليم والتجارة والأتمتة والأمن.",
      },
      pillar: "execution",
    },
    {
      value: "8+",
      label: {
        en: "Years in operational leadership — investigation, deployment coordination, and ministry liaison since 2018.",
        ar: "سنوات في القيادة التشغيلية — تحقيق وتنسيق انتشار واتصال وزاري منذ 2018.",
      },
      pillar: "discipline",
    },
    {
      value: String(techStack.length),
      label: {
        en: "Technologies actually shipped with, ranked by real usage — not a wishlist.",
        ar: "تقنية استُخدمت فعليًا في مشاريع مُطلَقة، مرتبة حسب الاستخدام الحقيقي — لا قائمة أمنيات.",
      },
      pillar: "evidence",
    },
    {
      value: "MBA",
      label: {
        en: "In progress at The American University in Cairo, alongside full operational duty.",
        ar: "قيد الدراسة بالجامعة الأمريكية بالقاهرة، بالتوازي مع الاستمرار في المهام التشغيلية الكاملة.",
      },
      pillar: "strategy",
    },
  ] as const;

  return (
    <section className="page-section evidence-numbers" id="evidence" aria-labelledby="evidence-title">
      <SectionHeader kicker={copy.evidenceKicker} title={copy.evidenceTitle} />
      <div className="evidence-numbers__grid">
        {items.map((item) => (
          <div
            key={item.label.en}
            className="evidence-numbers__item"
            style={{ "--accent": `var(--identity-${item.pillar})` } as CSSProperties}
          >
            <StatChip value={item.value} label={item.label[locale]} />
          </div>
        ))}
      </div>
    </section>
  );
}
