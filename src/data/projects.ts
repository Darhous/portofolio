import type { Locale } from "./profile";

export type Project = {
  name: string;
  category: "Legal Tech" | "Learning" | "Commerce" | "Automation" | "Career" | "IoT" | "Security" | "Portfolio";
  status: "Live" | "Public" | "Prototype" | "Private" | "Foundation";
  source: "GitHub README" | "GitHub metadata" | "CV";
  description: Record<Locale, string>;
  impact: Record<Locale, string>;
  tech: string[];
  repo?: string;
  live?: string;
  private?: boolean;
};

export const projects: Project[] = [
  {
    name: "Arabic Legal Research Skill Framework",
    category: "Legal Tech",
    status: "Public",
    source: "GitHub README",
    description: {
      en: "Arabic legal research validation and DOCX artifact pipeline that teaches AI tools how to produce structured, cited, verifiable Arabic legal research.",
      ar: "إطار عربي للتحقق من البحث القانوني وإنتاج ملفات DOCX منظّمة، يوجّه أدوات الذكاء الاصطناعي لإعداد بحوث قانونية عربية موثقة وقابلة للتحقق.",
    },
    impact: {
      en: "README documents CI, Python 3.11+, 233 passing tests, and 96.12% coverage.",
      ar: "يوثق README وجود CI وPython 3.11+ و233 اختبارًا ناجحًا وتغطية 96.12%.",
    },
    tech: ["Python", "DOCX", "Validation", "Arabic", "Legal AI", "CLI"],
    repo: "https://github.com/Darhous/arabic-legal-research-skill",
  },
  {
    name: "NexaLearn by Ahmed Darhous",
    category: "Learning",
    status: "Live",
    source: "GitHub README",
    description: {
      en: "Arabic-first bilingual learning ecosystem for AI, cloud, automation, digital skills, career development, language assessment, IoT, tools, projects, and certificates.",
      ar: "منظومة تعليمية ثنائية اللغة عربية أولًا للذكاء الاصطناعي، السحابة، الأتمتة، المهارات الرقمية، التطوير المهني، تقييم اللغة، إنترنت الأشياء، الأدوات، المشاريع، والشهادات.",
    },
    impact: {
      en: "Live platform with broad learning scope and RTL-first educational product architecture.",
      ar: "منصة حية ذات نطاق تعليمي واسع ومعمارية منتج تعليمي تدعم RTL أولًا.",
    },
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "PWA", "Gemini AI"],
    repo: "https://github.com/Darhous/darhous-ai-cloud-academy",
    live: "https://darhous-ai-cloud-academy.vercel.app",
  },
  {
    name: "ShahY Store",
    category: "Commerce",
    status: "Live",
    source: "GitHub README",
    description: {
      en: "Luxury Egyptian e-commerce store for imported women's accessories with storefront, admin panel, database, authentication, WhatsApp order flow, and Vercel deployment.",
      ar: "متجر إلكتروني مصري فاخر لإكسسوارات نسائية مستوردة، يضم واجهة متجر ولوحة إدارة وقاعدة بيانات ومصادقة ومسار طلبات عبر واتساب ونشر على Vercel.",
    },
    impact: {
      en: "Production storefront with documented owner, design/development attribution, admin routes, and live deployment.",
      ar: "واجهة إنتاجية موثقة مع صاحب المتجر ونسبة التصميم والتطوير ومسارات لوحة إدارة ورابط حي.",
    },
    tech: ["Next.js 16", "TypeScript", "Drizzle ORM", "Supabase", "Better Auth", "Vercel"],
    repo: "https://github.com/Darhous/ShahY-Store",
    live: "https://shah-y-store.vercel.app",
  },
  {
    name: "Store Master Template",
    category: "Commerce",
    status: "Foundation",
    source: "GitHub README",
    description: {
      en: "Reusable e-commerce foundation extracted from ShahY Store, including storefront, admin dashboard, database, auth, storage, automation scripts, and operational docs.",
      ar: "أساس تجارة إلكترونية قابل لإعادة الاستخدام مستخرج من ShahY Store، يشمل الواجهة ولوحة الإدارة وقاعدة البيانات والمصادقة والتخزين وسكربتات الأتمتة والوثائق التشغيلية.",
    },
    impact: {
      en: "Turns one production store into a repeatable implementation system for future stores.",
      ar: "يحوّل متجرًا إنتاجيًا واحدًا إلى نظام تنفيذ قابل للتكرار لمتاجر لاحقة.",
    },
    tech: ["Next.js", "Supabase", "Drizzle ORM", "Better Auth", "PowerShell", "Docs"],
    repo: "https://github.com/Darhous/Store-Master-Template",
  },
  {
    name: "Darhous Automation Academy",
    category: "Automation",
    status: "Public",
    source: "GitHub README",
    description: {
      en: "Arabic standalone automation learning product with learning paths, templates, workflow builder, labs, tools hub, dashboard, and admin foundation.",
      ar: "منتج عربي مستقل لتعليم الأتمتة يضم مسارات تعليم وقوالب وباني مسارات عمل ومعامل عملية ومركز أدوات ولوحة تحكم وأساس إدارة.",
    },
    impact: {
      en: "Includes deterministic blueprint generation, ROI tools, complexity estimation, and automation service pathways.",
      ar: "يتضمن توليد مخططات حتمية وأدوات ROI وتقدير تعقيد المسارات ومسارات خدمات الأتمتة.",
    },
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "LocalStorage", "Automation Design"],
    repo: "https://github.com/Darhous/darhous-automation-academy",
  },
  {
    name: "Darhous Career Hub",
    category: "Career",
    status: "Prototype",
    source: "GitHub README",
    description: {
      en: "Career platform prototype with ATS analysis, interview preparation, CV builder, templates, jobs portal, and dashboard.",
      ar: "نموذج منصة مهنية يضم تحليل ATS للسيرة الذاتية، تدريب المقابلات، صانع CV، قوالب، بوابة وظائف، ولوحة تحكم.",
    },
    impact: {
      en: "README identifies working backend features for CV upload/AI analysis and interview assessment, with demo data in other areas.",
      ar: "يوضح README أن الميزات الخلفية العاملة تشمل رفع وتحليل السيرة بالذكاء الاصطناعي وتقييم المقابلات، مع بيانات تجريبية في أجزاء أخرى.",
    },
    tech: ["TypeScript", "Gemini AI", "Career Tools", "ATS", "Dashboard"],
    repo: "https://github.com/Darhous/Darhous-career-hub-google",
  },
  {
    name: "Darhous IoT Lab",
    category: "IoT",
    status: "Public",
    source: "GitHub README",
    description: {
      en: "Arabic-first IoT, Arduino, robotics, and smart-home educational application with lessons, projects, components, code examples, simulations, challenges, and roadmaps.",
      ar: "تطبيق تعليمي عربي لإنترنت الأشياء وArduino والروبوتات والمنزل الذكي، يضم دروسًا ومشاريع ومكونات وأمثلة كود ومحاكيات وتحديات وخرائط طريق.",
    },
    impact: {
      en: "V2 README documents 18 learning paths, 60+ lessons, 72 projects, 80 components, 80 code examples, and 35 simulator templates.",
      ar: "يوثق README للإصدار V2 وجود 18 مسارًا و60+ درسًا و72 مشروعًا و80 مكونًا و80 مثال كود و35 قالب محاكاة.",
    },
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Lucide", "Arduino", "IoT"],
    repo: "https://github.com/Darhous/darhous-iot-lab",
  },
  {
    name: "Guardian-Nexus",
    category: "Security",
    status: "Private",
    source: "CV",
    private: true,
    description: {
      en: "AI-integrated HR and Security ERP architecture referenced in the CV, designed for personnel tracking, threat assessment, and resource allocation for 200+ staff.",
      ar: "معمارية ERP للموارد البشرية والأمن مدعومة بالذكاء الاصطناعي ومذكورة في السيرة الذاتية، موجهة لتتبع الأفراد وتقييم التهديدات وتوزيع الموارد لأكثر من 200 فرد.",
    },
    impact: {
      en: "Represents Ahmed's bridge between public security operations, AI workflows, and practical enterprise systems.",
      ar: "يمثل نقطة وصل بين عمليات الأمن العام ومسارات الذكاء الاصطناعي والأنظمة المؤسسية العملية.",
    },
    tech: ["AI Operations", "Security ERP", "Python", "OSINT", "LLMs"],
  },
  {
    name: "Ahmed Darhous Portfolio",
    category: "Portfolio",
    status: "Live",
    source: "GitHub metadata",
    description: {
      en: "This premium bilingual portfolio, built as a GitHub Pages-compatible Vite application with centralized identity and contact configuration.",
      ar: "هذا البورتفوليو الثنائي اللغة، مبني كتطبيق Vite متوافق مع GitHub Pages مع إعداد مركزي للهوية وبيانات التواصل.",
    },
    impact: {
      en: "Acts as the public identity system tying together security, legal research, AI operations, and software products.",
      ar: "يمثل نظام الهوية العام الذي يربط الأمن والبحث القانوني وعمليات الذكاء الاصطناعي والمنتجات البرمجية.",
    },
    tech: ["Vite", "React", "TypeScript", "GitHub Pages", "Accessibility"],
    repo: "https://github.com/Darhous/portofolio",
    live: "https://darhous.github.io/portofolio/",
  },
];
