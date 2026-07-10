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
    en: "Security Operations Manager, Crisis Management Specialist, and MBA Candidate.",
    ar: "مدير عمليات أمنية، أخصائي إدارة أزمات، ومرشح ماجستير إدارة أعمال.",
  },
  shortTitle: {
    en: "Security Operations, Crisis Management & Strategic Leadership",
    ar: "العمليات الأمنية، إدارة الأزمات، والقيادة الاستراتيجية",
  },
  summary: {
    en: "Ahmed Darhous is a strategic operations and security professional with 8+ years of leadership experience in law enforcement, crisis management, and logistics. He is currently pursuing an MBA at The American University in Cairo, pairing a legal and security background with business acumen and hands-on automation skills. His work spans complex field operations, stakeholder relations, and personnel administration, with a consistent focus on risk mitigation and operational efficiency.",
    ar: "أحمد درهوس محترف عمليات وأمن استراتيجي يمتلك خبرة قيادية تتجاوز 8 سنوات في إنفاذ القانون وإدارة الأزمات واللوجستيات. يواصل حاليًا دراسة الماجستير في إدارة الأعمال بالجامعة الأمريكية بالقاهرة، جامعًا بين خلفية قانونية وأمنية وحس تجاري ومهارات عملية في الأتمتة. يمتد عمله ليشمل العمليات الميدانية المعقدة وعلاقات أصحاب المصلحة وإدارة شؤون الأفراد، مع تركيز ثابت على تخفيف المخاطر وكفاءة التشغيل.",
  },
  tagline: {
    en: "Leading security operations and crisis response with law-enforcement discipline and an MBA-level strategic lens.",
    ar: "قيادة العمليات الأمنية والاستجابة للأزمات بانضباط إنفاذ القانون ورؤية استراتيجية على مستوى الماجستير في إدارة الأعمال.",
  },
  principle: {
    en: "Discipline under pressure is a strategic advantage, not a job description.",
    ar: "الانضباط تحت الضغط ميزة استراتيجية، لا مجرد وصف وظيفي.",
  },
  cta: {
    primary: {
      en: "Download CV",
      ar: "تحميل السيرة الذاتية",
    },
    secondary: {
      en: "Get in Touch",
      ar: "تواصل معي",
    },
  },
  contacts: siteConfig.contact,
} as const;

export const expertise = [
  {
    title: { en: "Security Operations & Field Leadership", ar: "العمليات الأمنية والقيادة الميدانية" },
    body: {
      en: "Deployment planning, resource allocation, and field-readiness for personnel operating under mission-critical pressure.",
      ar: "تخطيط الانتشار، توزيع الموارد، وجاهزية الفرق الميدانية العاملة تحت ضغط المهام الحرجة.",
    },
  },
  {
    title: { en: "Crisis & Risk Management", ar: "إدارة الأزمات والمخاطر" },
    body: {
      en: "NEBOSH-certified risk assessment, incident command, and emergency response, developed through structured HSE and crisis-management training.",
      ar: "تقييم مخاطر معتمد من NEBOSH، وقيادة الحوادث، والاستجابة للطوارئ، مبنية على تدريب منظم في الصحة والسلامة المهنية وإدارة الأزمات.",
    },
  },
  {
    title: { en: "Legal & Investigative Foundation", ar: "الأساس القانوني والتحقيقي" },
    body: {
      en: "A Bachelor of Law and Police Sciences plus a postgraduate diploma in general law, applied through years of criminal investigation and legal reporting.",
      ar: "ليسانس الحقوق وعلوم الشرطة إلى جانب دبلوم دراسات عليا في القانون العام، مطبقة عبر سنوات من التحقيق الجنائي والتقارير القانونية.",
    },
  },
  {
    title: { en: "Strategic Business & Operations", ar: "الأعمال الاستراتيجية والعمليات" },
    body: {
      en: "MBA studies at AUC combined with hands-on scripting and automation for administrative reporting and data analysis.",
      ar: "دراسة ماجستير إدارة الأعمال في الجامعة الأمريكية بالقاهرة، مقترنة بخبرة عملية في البرمجة النصية وأتمتة التقارير الإدارية وتحليل البيانات.",
    },
  },
] as const;

export const experience = [
  {
    role: {
      en: "Senior Liaison & External Relations Officer",
      ar: "ضابط أول اتصال وعلاقات خارجية",
    },
    organization: {
      en: "Ministry of Interior",
      ar: "وزارة الداخلية",
    },
    period: {
      en: "July 2025 - Present",
      ar: "يوليو 2025 - حتى الآن",
    },
    highlights: {
      en: [
        "Primary focal point for strategic coordination between the Ministry and external governmental and non-governmental entities.",
        "Managed personnel affairs, ensuring seamless communication on staff requirements, administrative compliance, and resource planning.",
        "Facilitated cross-functional cooperation to streamline administrative processes and resolve inter-departmental challenges.",
      ],
      ar: [
        "نقطة الاتصال الرئيسية للتنسيق الاستراتيجي بين الوزارة والجهات الحكومية وغير الحكومية الخارجية.",
        "إدارة شؤون الأفراد وضمان تواصل سلس حول احتياجات الموظفين والامتثال الإداري وتخطيط الموارد.",
        "تسهيل التعاون بين الإدارات لتبسيط العمليات الإدارية وحل التحديات المشتركة بين الأقسام.",
      ],
    },
  },
  {
    role: {
      en: "Operations & Deployment Coordinator",
      ar: "منسق العمليات والانتشار",
    },
    organization: {
      en: "Ministry of Interior",
      ar: "وزارة الداخلية",
    },
    period: {
      en: "2023 - July 2025",
      ar: "2023 - يوليو 2025",
    },
    highlights: {
      en: [
        "Directed daily operational plans and managed deployment rosters for officers across multiple sectors.",
        "Coordinated field operations, ensuring readiness for mission-critical tasks and routine patrols.",
        "Monitored operational performance with data-driven insights to improve response times and efficiency.",
      ],
      ar: [
        "توجيه الخطط التشغيلية اليومية وإدارة جداول انتشار الضباط عبر قطاعات متعددة.",
        "تنسيق العمليات الميدانية لضمان الجاهزية للمهام الحرجة والدوريات الروتينية.",
        "متابعة الأداء التشغيلي عبر رؤى مبنية على البيانات لتحسين أوقات الاستجابة والكفاءة.",
      ],
    },
  },
  {
    role: {
      en: "Criminal Investigation Officer",
      ar: "ضابط تحقيق جنائي",
    },
    organization: {
      en: "Ministry of Interior",
      ar: "وزارة الداخلية",
    },
    period: {
      en: "2018 - 2023",
      ar: "2018 - 2023",
    },
    highlights: {
      en: [
        "Conducted high-level investigations, gathering intelligence and evidence for legal proceedings and risk assessments.",
        "Managed crisis situations and high-stress field operations focused on public safety and asset protection.",
        "Prepared detailed technical and legal reports on security incidents, crime trends, and mitigation strategies.",
      ],
      ar: [
        "إجراء تحقيقات رفيعة المستوى وجمع المعلومات والأدلة للإجراءات القانونية وتقييمات المخاطر.",
        "إدارة الأزمات والعمليات الميدانية عالية الضغط بتركيز على السلامة العامة وحماية الأصول.",
        "إعداد تقارير فنية وقانونية مفصلة حول الحوادث الأمنية واتجاهات الجريمة واستراتيجيات التخفيف.",
      ],
    },
  },
] as const;

export const education = [
  {
    school: "The American University in Cairo (AUC)",
    credential: {
      en: "Master of Business Administration (MBA) - Strategic Management & Business Operations",
      ar: "ماجستير إدارة الأعمال (MBA) - التركيز: الإدارة الاستراتيجية وعمليات الأعمال",
    },
    period: "2024 - Present",
  },
  {
    school: "Police Academy",
    credential: {
      en: "Postgraduate Diploma in General Law",
      ar: "دبلوم دراسات عليا في القانون العام",
    },
    period: "2022",
  },
  {
    school: "Police Academy",
    credential: {
      en: "Bachelor of Law & Police Sciences",
      ar: "ليسانس الحقوق وعلوم الشرطة",
    },
    period: "2017",
  },
] as const;

export type CertificationGroup = {
  category: Localized<string>;
  items: Localized<string>[];
};

export const certificationGroups: CertificationGroup[] = [
  {
    category: { en: "Health, Safety & Environment", ar: "الصحة والسلامة والبيئة" },
    items: [
      {
        en: "NEBOSH International General Certificate (IGC), 2023",
        ar: "شهادة NEBOSH الدولية العامة (IGC)، 2023",
      },
      { en: "First Aid Certification, Police Academy, 2024", ar: "شهادة الإسعافات الأولية، أكاديمية الشرطة، 2024" },
      {
        en: "Firefighting & Civil Protection, Police Academy, 2016",
        ar: "مكافحة الحرائق والحماية المدنية، أكاديمية الشرطة، 2016",
      },
    ],
  },
  {
    category: { en: "Management & Operations", ar: "الإدارة والعمليات" },
    items: [
      {
        en: "Crisis & Disaster Management Workshop, AUC, 2025",
        ar: "ورشة إدارة الأزمات والكوارث، الجامعة الأمريكية بالقاهرة، 2025",
      },
      {
        en: "Logistics & Supply Chain Management, Police Academy, 2025",
        ar: "إدارة اللوجستيات وسلسلة الإمداد، أكاديمية الشرطة، 2025",
      },
      {
        en: "Human Resources Management (HRM), Police Academy, 2024",
        ar: "إدارة الموارد البشرية، أكاديمية الشرطة، 2024",
      },
      { en: "Crisis & Disaster Management, Police Academy, 2024", ar: "إدارة الأزمات والكوارث، أكاديمية الشرطة، 2024" },
      {
        en: "Behavioral Skills & Stress Management, Police Academy, 2024",
        ar: "المهارات السلوكية وإدارة الضغوط، أكاديمية الشرطة، 2024",
      },
    ],
  },
  {
    category: { en: "Specialized Security Training", ar: "تدريب أمني متخصص" },
    items: [
      {
        en: "Criminal Investigation Techniques, General Security Institute, 2018",
        ar: "تقنيات التحقيق الجنائي، معهد الأمن العام، 2018",
      },
    ],
  },
];

export const languages = [
  { name: { en: "Arabic", ar: "العربية" }, level: { en: "Native", ar: "لغة أم" } },
  {
    name: { en: "English", ar: "الإنجليزية" },
    level: { en: "Advanced (C1) - AUC & Armed Forces Language Institute", ar: "متقدم (C1) - الجامعة الأمريكية ومعهد لغات القوات المسلحة" },
  },
  { name: { en: "French", ar: "الفرنسية" }, level: { en: "Intermediate - Institut Français d'Égypte", ar: "متوسط - المعهد الفرنسي بمصر" } },
] as const;

export type CompetencyGroup = {
  title: Localized<string>;
  items: string[];
};

export const competencyGroups: CompetencyGroup[] = [
  {
    title: { en: "Operational Management", ar: "الإدارة التشغيلية" },
    items: ["Logistics Planning", "Fleet Management", "Resource Allocation"],
  },
  {
    title: { en: "Risk & Safety", ar: "المخاطر والسلامة" },
    items: ["Crisis Management", "Risk Assessment", "Incident Command", "Emergency Response"],
  },
  {
    title: { en: "Administration", ar: "الإدارة" },
    items: ["HR Management", "Stakeholder Relations", "Regulatory Compliance", "Legal Reporting"],
  },
  {
    title: { en: "Technical & Automation", ar: "التقنية والأتمتة" },
    items: ["Visual Basic (VB)", "HTML", "Java", "Process Scripting", "Data Analysis"],
  },
  {
    title: { en: "Leadership", ar: "القيادة" },
    items: ["Problem-Solving", "Negotiation", "Time Management", "Adaptability"],
  },
];
