import type { Localized } from "./profile";

export type StoryPillar = "evidence" | "discipline" | "strategy" | "execution";

export type StoryStage = {
  year: string;
  pillar: StoryPillar;
  title: Localized<string>;
  org: Localized<string>;
  summary: Localized<string>;
  lesson: Localized<string>;
};

/**
 * Real, dated milestones pulled from `experience`/`education` in profile.ts.
 * The `summary` is factual; the `lesson` is honest interpretive framing —
 * how that stage shapes the way Ahmed builds systems today — not a new claim.
 */
export const personalStory: StoryStage[] = [
  {
    year: "2017",
    pillar: "evidence",
    title: { en: "Bachelor of Law & Police Sciences", ar: "ليسانس الحقوق وعلوم الشرطة" },
    org: { en: "Police Academy", ar: "أكاديمية الشرطة" },
    summary: {
      en: "Formal legal training in structured argument, procedure, and the rules of evidence.",
      ar: "تدريب قانوني رسمي على الحجة المنظمة، والإجراءات، وقواعد الإثبات.",
    },
    lesson: {
      en: "Law taught structured analysis: break an ambiguous problem into defined parts before acting on it.",
      ar: "علّمه القانون التحليل المنظم: تفكيك أي مشكلة غامضة لعناصر محددة قبل التصرف بناءً عليها.",
    },
  },
  {
    year: "2018",
    pillar: "evidence",
    title: { en: "Criminal Investigation Officer", ar: "ضابط تحقيق جنائي" },
    org: { en: "Ministry of Interior", ar: "وزارة الداخلية" },
    summary: {
      en: "Conducted high-level investigations, gathering intelligence and evidence for legal proceedings and risk assessments.",
      ar: "أجرى تحقيقات رفيعة المستوى، وجمع المعلومات والأدلة للإجراءات القانونية وتقييمات المخاطر.",
    },
    lesson: {
      en: "Investigation taught evidence-based reasoning: conclusions have to be traceable back to something verifiable, not assumed.",
      ar: "علّمه التحقيق التفكير المبني على الأدلة: أي استنتاج لا بد أن يكون قابلاً للتتبع إلى ما يمكن التحقق منه، لا مجرد افتراض.",
    },
  },
  {
    year: "2023",
    pillar: "discipline",
    title: { en: "Operations & Deployment Coordinator", ar: "منسق العمليات والانتشار" },
    org: { en: "Ministry of Interior", ar: "وزارة الداخلية" },
    summary: {
      en: "Directed daily operational plans and deployment rosters across multiple sectors, coordinating field operations for mission-critical tasks.",
      ar: "وجّه الخطط التشغيلية اليومية وجداول الانتشار عبر قطاعات متعددة، ونسّق العمليات الميدانية للمهام الحرجة.",
    },
    lesson: {
      en: "Coordinating live operations at scale taught discipline and accountability: systems fail at the handoffs, not the happy path.",
      ar: "تنسيق عمليات حية على نطاق واسع علّمه الانضباط والمساءلة: تفشل الأنظمة عند نقاط التسليم، لا في المسار المثالي.",
    },
  },
  {
    year: "2024",
    pillar: "strategy",
    title: { en: "MBA in Progress", ar: "دراسة ماجستير إدارة الأعمال" },
    org: { en: "The American University in Cairo", ar: "الجامعة الأمريكية بالقاهرة" },
    summary: {
      en: "Strategic management and business operations coursework, studied alongside continuing field responsibilities.",
      ar: "دراسة الإدارة الاستراتيجية وعمليات الأعمال، بالتوازي مع الاستمرار في المسؤوليات الميدانية.",
    },
    lesson: {
      en: "The MBA added a strategic lens: connecting goals, users, risk, and long-term value instead of optimizing one task in isolation.",
      ar: "أضافت دراسة الماجستير رؤية استراتيجية: ربط الأهداف والمستخدمين والمخاطر والقيمة طويلة المدى، بدل تحسين مهمة واحدة بمعزل عن الباقي.",
    },
  },
  {
    year: "2025",
    pillar: "execution",
    title: { en: "Senior Liaison & Officer Who Builds", ar: "ضابط أول اتصال — وضابط يبني" },
    org: { en: "Ministry of Interior · 30+ shipped projects off duty", ar: "وزارة الداخلية · أكثر من 30 مشروعًا خارج أوقات العمل" },
    summary: {
      en: "Primary coordination focal point for the Ministry, while independently designing and shipping thirty-plus software projects — legal-tech, automation, learning systems, and applied security engineering.",
      ar: "نقطة التنسيق الرئيسية للوزارة، مع تصميم وإطلاق أكثر من ثلاثين مشروعًا برمجيًا بشكل مستقل — تقنية قانونية، وأتمتة، وأنظمة تعليمية، وهندسة أمنية تطبيقية.",
    },
    lesson: {
      en: "Execution is where the other three disciplines get tested: a system that isn't shipped, secured, and maintained hasn't proven anything yet.",
      ar: "التنفيذ هو الاختبار الحقيقي للمبادئ الثلاثة الأخرى: النظام الذي لم يُطلق ولم يُؤمَّن ولم تُجرَ صيانته لم يُثبت شيئًا بعد.",
    },
  },
];
