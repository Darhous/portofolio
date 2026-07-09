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
    en: "Executive Security & Risk Leader | MBA Candidate (AUC) | AI Operations & Intelligence | Legal Expert | Oil & Gas · HSE · Asset Protection",
    ar: "قائد أمني وإداري تنفيذي | مرشح MBA في الجامعة الأمريكية بالقاهرة | عمليات ذكاء اصطناعي | خبير قانوني | نفط وغاز · السلامة المهنية · حماية الأصول",
  },
  shortTitle: {
    en: "Executive Security & Risk Leader — AI Operations and Legal-Tech Product Builder",
    ar: "قائد أمني وإداري تنفيذي — عمليات ذكاء اصطناعي وبناء منتجات التقنية القانونية",
  },
  summary: {
    en: "Executive security and risk leader with 9+ years as a commissioned police officer in Egypt. Led crisis deployments of 200+ personnel, conducted 150+ enterprise risk assessments, and achieved a 95%+ prosecution-readiness rate. Simultaneously built AI-driven intelligence pipelines, a proprietary Security ERP system, and multiple live digital products — combining law enforcement discipline, legal expertise, and applied AI in a single operating profile.",
    ar: "قائد أمني وإداري تنفيذي بخبرة تتجاوز 9 سنوات كضابط شرطة في مصر. قاد انتشارًا ميدانيًا يضم أكثر من 200 فرد، وأجرى أكثر من 150 تقييم مخاطر مؤسسي، وحقق معدل جاهزية قانونية يتجاوز 95%. بنى في الوقت ذاته مسارات ذكاء اصطناعي تشغيلية، ونظام ERP أمني خاصًا، ومنتجات رقمية حية — جامعًا انضباط تطبيق القانون والخبرة القانونية والذكاء الاصطناعي التطبيقي في هوية مهنية واحدة.",
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
      en: "Critical-asset protection, compliance frameworks, executive security coordination, crisis response, and operational resilience — including oil & gas, HSE, and high-risk industrial environments.",
      ar: "حماية الأصول الحرجة، أطر الامتثال، تنسيق أمن القيادات، الاستجابة للأزمات، ومرونة التشغيل — بما يشمل قطاعي النفط والغاز، والسلامة المهنية، والبيئات الصناعية عالية المخاطر.",
    },
  },
  {
    title: { en: "Legal Authority & Criminal Law", ar: "السلطة القانونية والقانون الجنائي" },
    body: {
      en: "Bachelor of Law and Police Sciences, postgraduate legal studies, criminal investigation practice, evidence workflows, and current research on deepfake crimes and criminal liability in the digital age.",
      ar: "ليسانس القانون وعلوم الشرطة، دراسات قانونية عليا، خبرة تحقيق جنائي، مسارات الأدلة، وبحث قائم حول جرائم التزييف العميق والمسؤولية الجنائية في العصر الرقمي.",
    },
  },
  {
    title: { en: "AI & Intelligence Engineering", ar: "هندسة الذكاء الاصطناعي والاستخبارات" },
    body: {
      en: "Python automation, OSINT monitoring, LLM workflows, prompt engineering, AI-assisted analysis, and the Guardian-Nexus HR and Security ERP — purpose-built for real operational environments.",
      ar: "أتمتة Python، مراقبة المصادر المفتوحة، مسارات LLM، هندسة الأوامر، التحليل المدعوم بالذكاء الاصطناعي، ونظام Guardian-Nexus للموارد البشرية والأمن — مبني للبيئات التشغيلية الحقيقية.",
    },
  },
  {
    title: { en: "Digital Products & Legal Tech", ar: "المنتجات الرقمية والتقنية القانونية" },
    body: {
      en: "React, Next.js, TypeScript, Python — building Arabic-first platforms, legal-research validation tools, learning ecosystems, and operational dashboards. Full-stack delivery from brief to deployment.",
      ar: "React وNext.js وTypeScript وPython — بناء منصات عربية أولًا، وأدوات التحقق من البحث القانوني، وأنظمة التعليم، ولوحات التشغيل. تسليم متكامل من الفكرة حتى النشر.",
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
      ar: "جهة أمنية حكومية — مصر",
    },
    period: {
      en: "August 2025 – Present",
      ar: "أغسطس 2025 – حتى الآن",
    },
    highlights: {
      en: [
        "Manages confidential governance workflows and inter-departmental intelligence coordination.",
        "Architected Guardian-Nexus — an AI-integrated HR and Security ERP system serving 200+ personnel.",
        "Built AI-driven intelligence pipelines using Python automation, LLMs, and OSINT monitoring.",
        "Provides C-Suite liaison between senior leadership and field operations.",
      ],
      ar: [
        "إدارة مسارات حوكمة سرية وتنسيق معلوماتي بين الإدارات.",
        "تصميم Guardian-Nexus — نظام ERP للموارد البشرية والأمن مدعوم بالذكاء الاصطناعي لأكثر من 200 فرد.",
        "بناء مسارات ذكاء تشغيلي باستخدام Python وLLMs ومراقبة OSINT.",
        "التنسيق بين القيادة العليا والعمليات الميدانية على مستوى C-Suite.",
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
      ar: "جهة أمنية حكومية — مصر",
    },
    period: {
      en: "August 2023 – August 2025",
      ar: "أغسطس 2023 – أغسطس 2025",
    },
    highlights: {
      en: [
        "Orchestrated deployments of 200+ personnel across multi-jurisdictional security operations.",
        "Developed crisis response playbooks and improved inter-agency coordination.",
        "Integrated OSINT alerts and AI-powered media analysis into operational intelligence workflows.",
        "Managed sustained operations logistics, resource allocation, and contingency planning.",
      ],
      ar: [
        "تنسيق انتشار أكثر من 200 فرد في عمليات أمنية متعددة النطاقات.",
        "تطوير أدلة استجابة للأزمات وتحسين التنسيق بين الجهات.",
        "دمج تنبيهات OSINT وتحليل الوسائط بالذكاء الاصطناعي داخل مسارات الاستخبارات التشغيلية.",
        "إدارة لوجستيات العمليات المطولة وتوزيع الموارد والتخطيط للطوارئ.",
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
      ar: "جهة أمنية حكومية — مصر",
    },
    period: {
      en: "July 2018 – July 2023",
      ar: "يوليو 2018 – يوليو 2023",
    },
    highlights: {
      en: [
        "Conducted 150+ enterprise-level risk assessments and compliance audits.",
        "Achieved 95%+ prosecution-readiness rate across complex internal investigations.",
        "Led investigations involving fraud, misconduct, digital forensics, and organized crime networks.",
        "Designed and delivered investigative best-practice training for 50+ officers.",
      ],
      ar: [
        "تنفيذ أكثر من 150 تقييم مخاطر وتدقيق امتثال على مستوى مؤسسي.",
        "تحقيق معدل جاهزية للملاحقة القضائية يتجاوز 95% عبر تحقيقات داخلية معقدة.",
        "قيادة تحقيقات في الاحتيال والمخالفات والجنائيات الرقمية وشبكات الجريمة المنظمة.",
        "تصميم وتنفيذ تدريب أفضل ممارسات التحقيق لأكثر من 50 ضابطًا.",
      ],
    },
  },
  {
    role: {
      en: "Commissioned Police Officer — Foundation",
      ar: "ضابط شرطة — المرحلة التأسيسية",
    },
    organization: {
      en: "Government Security Organization (Egypt)",
      ar: "جهة أمنية حكومية — مصر",
    },
    period: {
      en: "August 2017 – July 2018",
      ar: "أغسطس 2017 – يوليو 2018",
    },
    highlights: {
      en: [
        "Completed Police Academy training and received commission as a law enforcement officer.",
        "Performed frontline patrol operations, incident response, and community engagement duties.",
        "Built foundational expertise in evidence chain-of-custody and legal case documentation.",
        "Earned Criminal Investigation Specialist certification at the General Security Institute (2018).",
      ],
      ar: [
        "إتمام التدريب في أكاديمية الشرطة ونيل رتبة ضابط في تطبيق القانون.",
        "تنفيذ مهام الدوريات الميدانية والاستجابة للحوادث والمشاركة المجتمعية.",
        "بناء خبرة تأسيسية في سلسلة حضانة الأدلة وتوثيق القضايا القانونية.",
        "الحصول على شهادة متخصص التحقيق الجنائي من معهد الأمن العام (2018).",
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
    period: "May 2024 – July 2027",
  },
  {
    school: "South Valley University",
    credential: {
      en: "Master's Degree, Criminal Law and Criminal Justice",
      ar: "ماجستير في القانون الجنائي والعدالة الجنائية",
    },
    period: "August 2025 – October 2026",
  },
  {
    school: "Qena University",
    credential: {
      en: "Diploma, Egyptian General Law",
      ar: "دبلوم القانون العام المصري",
    },
    period: "October 2025 – October 2026",
  },
  {
    school: "Police Academy of Egypt",
    credential: {
      en: "Diploma, Egyptian General Law",
      ar: "دبلوم القانون العام المصري",
    },
    period: "October 2021 – October 2022",
  },
  {
    school: "Institut Français d'Egypte",
    credential: {
      en: "Legal and language studies (Droit)",
      ar: "دراسات قانونية ولغوية (Droit)",
    },
    period: "Cairo, Egypt",
  },
] as const;

export const skills = [
  "Risk Assessment",
  "Crisis Management",
  "Fraud Investigations",
  "OSINT Intelligence",
  "LLM Workflows",
  "Legal Research",
  "Python",
  "AI Operations",
  "React",
  "Next.js",
  "TypeScript",
  "Environment, Health & Safety",
  "Prompt Engineering",
  "Arabic-First Systems",
] as const;

export const languages = [
  { name: { en: "Arabic", ar: "العربية" }, level: { en: "Native or bilingual", ar: "لغة أم أو ثنائية" } },
  { name: { en: "English", ar: "الإنجليزية" }, level: { en: "Full professional", ar: "إجادة مهنية كاملة" } },
  {
    name: { en: "French", ar: "الفرنسية" },
    level: { en: "Professional working (DALF)", ar: "إجادة مهنية (DALF)" },
  },
] as const;

export const certifications = [
  { en: "Criminal Investigation Specialist Course", ar: "دورة متخصص التحقيق الجنائي" },
  { en: "Crisis and Disaster Management", ar: "إدارة الأزمات والكوارث" },
  { en: "Logistics and Stores Management", ar: "إدارة اللوجستيات والمخازن" },
  { en: "First Aid Certification", ar: "شهادة الإسعافات الأولية" },
  {
    en: "Behavioral Skills Development & Coping with Work Stress",
    ar: "تنمية المهارات السلوكية والتعامل مع ضغوط العمل",
  },
] as const;
