import type { Localized } from "./profile";
import type { StoryPillar } from "./personalStory";

export type Pillar = {
  key: StoryPillar;
  title: Localized<string>;
  body: Localized<string>;
  linkLabel: Localized<string>;
  linkHref: string;
};

/**
 * Same four pillar keys as personalStory.ts's stages — this section is the
 * "what it adds up to" companion to that section's "how it happened."
 */
export const operatingSystem: Pillar[] = [
  {
    key: "discipline",
    title: { en: "Discipline", ar: "الانضباط" },
    body: {
      en: "Operational responsibility over live deployments, rosters, and field readiness — where systems fail at the handoffs, not the plan. That same structure shows up in how work gets scoped, staged, and shipped.",
      ar: "مسؤولية تشغيلية عن انتشارات حية وجداول وجاهزية ميدانية — حيث الأنظمة بتفشل عند نقاط التسليم مش في الخطة. نفس البنية دي بتظهر في طريقة تحديد نطاق الشغل ومراحله وإطلاقه.",
    },
    linkLabel: { en: "See the professional journey", ar: "شوف المسار المهني" },
    linkHref: "#journey",
  },
  {
    key: "evidence",
    title: { en: "Evidence", ar: "الإثبات" },
    body: {
      en: "Legal and investigative training that treats a conclusion as worthless until it's traceable — the same standard applied to research, validation, and automated testing before anything ships.",
      ar: "تدريب قانوني وتحقيقي بيعتبر أي استنتاج مالوش قيمة لحد ما يتتبع لمصدره — نفس المعيار ده بيتطبق على البحث والتحقق والاختبار الآلي قبل إطلاق أي حاجة.",
    },
    linkLabel: { en: "See the flagship case studies", ar: "شوف دراسات الحالة الرئيسية" },
    linkHref: "#flagship",
  },
  {
    key: "strategy",
    title: { en: "Strategy", ar: "الاستراتيجية" },
    body: {
      en: "MBA-level strategic management studies that connect goals, users, risk, and long-term value — a lens for deciding what's worth building, not just how to build it.",
      ar: "دراسة إدارة استراتيجية على مستوى الماجستير بتربط الأهداف والمستخدمين والمخاطر والقيمة طويلة المدى — رؤية لتحديد إيه اللي يستاهل يتبني، مش بس إزاي يتبني.",
    },
    linkLabel: { en: "See education & credentials", ar: "شوف التعليم والاعتمادات" },
    linkHref: "#education",
  },
  {
    key: "execution",
    title: { en: "Execution", ar: "التنفيذ" },
    body: {
      en: "Thirty-plus shipped projects — the point where the other three disciplines get tested against a real interface, database, deployment pipeline, and user.",
      ar: "أكثر من ثلاثين مشروعًا تم إطلاقه فعليًا — النقطة اللي بتتاختبر فيها المبادئ التلاتة التانية قدام واجهة حقيقية وقاعدة بيانات ومسار نشر ومستخدم فعلي.",
    },
    linkLabel: { en: "See the shipped stack", ar: "شوف الأدوات المستخدمة فعليًا" },
    linkHref: "#stack",
  },
];
