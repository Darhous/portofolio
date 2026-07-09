import { siteConfig } from "../config/site";

export type Locale = "en" | "ar";

export type Localized<T = string> = Record<Locale, T>;

export const profile = {
  name: "Ahmed Darhous",
  location: {
    en: "Cairo, Egypt",
    ar: "القاهرة، مصر",
  },
  headline: {
    en: "Executive Leader | MBA Candidate (AUC) | Corporate Security & Risk Governance | AI-Driven Operations & Intelligence | Legal Expert",
    ar: "قائد تنفيذي | مرشح MBA في الجامعة الأمريكية بالقاهرة | حوكمة المخاطر والأمن المؤسسي | عمليات وذكاء مدعوم بالذكاء الاصطناعي | خبير قانوني",
  },
  shortTitle: {
    en: "Risk Governance, Corporate Security, Legal-Tech, and AI Operations",
    ar: "حوكمة المخاطر، الأمن المؤسسي، التقنية القانونية، وعمليات الذكاء الاصطناعي",
  },
  summary: {
    en: "Ahmed Darhous operates at the intersection of law enforcement discipline, legal authority, and AI-powered intelligence. With 9+ years as a commissioned police officer, he has led crisis deployments exceeding 200 personnel, sensitive investigations, enterprise risk work, and operational intelligence initiatives.",
    ar: "يعمل أحمد درهوس عند تقاطع الانضباط الأمني، السلطة القانونية، والذكاء التشغيلي المدعوم بالذكاء الاصطناعي. يمتلك خبرة تتجاوز 9 سنوات كضابط شرطة، قاد خلالها انتشارًا ميدانيًا لأكثر من 200 فرد، وتحقيقات حساسة، وأعمال مخاطر مؤسسية، ومبادرات ذكاء تشغيلي.",
  },
  principle: {
    en: "Security is no longer a function. It is a strategic advantage.",
    ar: "الأمن لم يعد وظيفة مستقلة. الأمن أصبح ميزة استراتيجية.",
  },
  cta: {
    primary: {
      en: "Download CV",
      ar: "تحميل السيرة الذاتية",
    },
    secondary: {
      en: "Start a Conversation",
      ar: "ابدأ التواصل",
    },
  },
  contacts: siteConfig.contact,
} as const;

export const expertise = [
  {
    title: { en: "Corporate Security & Risk Governance", ar: "الأمن المؤسسي وحوكمة المخاطر" },
    body: {
      en: "Critical-asset protection, compliance frameworks, executive security coordination, crisis response, and operational resilience in high-risk environments.",
      ar: "حماية الأصول الحرجة، أطر الامتثال، تنسيق أمن القيادات، الاستجابة للأزمات، ومرونة التشغيل في البيئات عالية المخاطر.",
    },
  },
  {
    title: { en: "Legal Authority & Criminal Law", ar: "السلطة القانونية والقانون الجنائي" },
    body: {
      en: "Bachelor of Law and Police Sciences, postgraduate legal study, criminal investigation practice, evidence workflows, and current research around deepfake crimes and criminal liability.",
      ar: "ليسانس القانون وعلوم الشرطة، دراسات قانونية عليا، خبرة تحقيق جنائي، مسارات الأدلة، وبحث قائم حول جرائم التزييف العميق والمسؤولية الجنائية.",
    },
  },
  {
    title: { en: "AI & Intelligence Engineering", ar: "هندسة الذكاء الاصطناعي والذكاء التشغيلي" },
    body: {
      en: "Python automation, OSINT monitoring, LLM workflows, prompt engineering, AI-assisted analysis, and Guardian-Nexus HR and Security ERP architecture.",
      ar: "أتمتة Python، مراقبة المصادر المفتوحة، مسارات LLM، هندسة الأوامر، التحليل المدعوم بالذكاء الاصطناعي، ومعمارية Guardian-Nexus للموارد البشرية والأمن.",
    },
  },
  {
    title: { en: "Digital Products & Bilingual Systems", ar: "المنتجات الرقمية والأنظمة ثنائية اللغة" },
    body: {
      en: "React, Next.js, TypeScript, Python, Arabic-first platforms, RTL interfaces, learning systems, legal-research tools, and operational dashboards.",
      ar: "React وNext.js وTypeScript وPython، منصات عربية أولًا، واجهات RTL، أنظمة تعليم، أدوات بحث قانوني، ولوحات تشغيل.",
    },
  },
] as const;

export const experience = [
  {
    role: {
      en: "Executive Office Manager & Security Liaison",
      ar: "مدير مكتب تنفيذي ومنسق أمني",
    },
    organization: {
      en: "Government Security Organization (Egypt)",
      ar: "جهة أمنية حكومية - مصر",
    },
    period: {
      en: "August 2025 - Present",
      ar: "أغسطس 2025 - حتى الآن",
    },
    highlights: {
      en: [
        "Managed confidential governance workflows and inter-departmental intelligence coordination.",
        "Architected Guardian-Nexus, an AI-integrated HR and Security ERP concept for 200+ staff.",
        "Built AI-driven intelligence pipelines using Python automation, LLMs, and OSINT monitoring.",
      ],
      ar: [
        "إدارة مسارات حوكمة سرية وتنسيق معلوماتي بين الإدارات.",
        "تصميم Guardian-Nexus كنظام ERP للموارد البشرية والأمن مدعوم بالذكاء الاصطناعي لأكثر من 200 فرد.",
        "بناء مسارات ذكاء تشغيلي باستخدام Python وLLMs ومراقبة OSINT.",
      ],
    },
  },
  {
    role: {
      en: "Operations & Security Planning Lead",
      ar: "قائد تخطيط العمليات والأمن",
    },
    organization: {
      en: "Government Security Organization (Egypt)",
      ar: "جهة أمنية حكومية - مصر",
    },
    period: {
      en: "August 2023 - August 2025",
      ar: "أغسطس 2023 - أغسطس 2025",
    },
    highlights: {
      en: [
        "Orchestrated deployments of 200+ personnel across multi-jurisdictional operations.",
        "Developed crisis response playbooks and improved inter-agency coordination.",
        "Integrated OSINT alerts and AI-powered media analysis into intelligence workflows.",
      ],
      ar: [
        "تنسيق انتشار أكثر من 200 فرد في عمليات متعددة النطاقات.",
        "تطوير أدلة استجابة للأزمات وتحسين التنسيق بين الجهات.",
        "دمج تنبيهات OSINT وتحليل الوسائط بالذكاء الاصطناعي داخل مسارات الذكاء.",
      ],
    },
  },
  {
    role: {
      en: "Senior Risk Mitigation & Investigation Officer",
      ar: "ضابط أول تخفيف مخاطر وتحقيقات",
    },
    organization: {
      en: "Government Security Organization (Egypt)",
      ar: "جهة أمنية حكومية - مصر",
    },
    period: {
      en: "July 2018 - July 2023",
      ar: "يوليو 2018 - يوليو 2023",
    },
    highlights: {
      en: [
        "Conducted 150+ enterprise-level risk assessments and compliance audits.",
        "Led complex internal investigations involving fraud, misconduct, and security breaches.",
        "Delivered investigative best-practice and risk-awareness training to officer teams.",
      ],
      ar: [
        "تنفيذ أكثر من 150 تقييم مخاطر وتدقيق امتثال على مستوى مؤسسي.",
        "قيادة تحقيقات داخلية معقدة في الاحتيال والمخالفات والثغرات الأمنية.",
        "تقديم تدريب على أفضل ممارسات التحقيق والوعي بالمخاطر لفرق الضباط.",
      ],
    },
  },
] as const;

export const education = [
  {
    school: "The American University in Cairo",
    credential: {
      en: "MBA, Business Administration and Management",
      ar: "ماجستير إدارة الأعمال MBA، إدارة الأعمال",
    },
    period: "May 2024 - July 2027",
  },
  {
    school: "South Valley University",
    credential: {
      en: "Master's Degree, Criminal Law and Criminal Justice",
      ar: "ماجستير في القانون الجنائي والعدالة الجنائية",
    },
    period: "August 2025 - October 2026",
  },
  {
    school: "Police Academy of Egypt",
    credential: {
      en: "Diploma in Egyptian General Law",
      ar: "دبلوم في القانون العام المصري",
    },
    period: "October 2021 - October 2022",
  },
  {
    school: "Institut Français d'Egypte",
    credential: {
      en: "French legal/language study",
      ar: "دراسة قانونية ولغوية فرنسية",
    },
    period: "Documented in CV",
  },
] as const;

export const skills = [
  "Fraud Investigations",
  "Environment, Health, and Safety (EHS)",
  "Blockchain",
  "Python",
  "React",
  "Next.js",
  "TypeScript",
  "OSINT",
  "LLM Workflows",
  "Prompt Engineering",
  "Arabic RTL Interfaces",
  "Legal Research",
] as const;

export const languages = [
  { name: { en: "Arabic", ar: "العربية" }, level: { en: "Native or bilingual", ar: "لغة أم أو ثنائية" } },
  { name: { en: "English", ar: "الإنجليزية" }, level: { en: "Full professional", ar: "إجادة مهنية كاملة" } },
  { name: { en: "French", ar: "الفرنسية" }, level: { en: "Professional working", ar: "إجادة مهنية" } },
] as const;

export const certifications = [
  { en: "Logistics and Stores Management", ar: "إدارة اللوجستيات والمخازن" },
  { en: "First Aid Certification", ar: "شهادة الإسعافات الأولية" },
  { en: "Crisis and Disaster Management", ar: "إدارة الأزمات والكوارث" },
  { en: "Criminal Investigation Specialist Course", ar: "دورة متخصص تحقيق جنائي" },
  {
    en: "Behavioral Skills Development & Coping with Work Stress",
    ar: "تنمية المهارات السلوكية والتعامل مع ضغوط العمل",
  },
] as const;
