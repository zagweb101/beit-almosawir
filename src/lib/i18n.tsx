import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";

export const translations = {
  ar: {
    dir: "rtl" as "rtl" | "ltr",
    brand: { name: "بيت المصور", sub: "أكاديمية بيت المصور" },
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      services: "خدماتنا",
      achievements: "الإنجازات",
      courses: "الدورات",
      platform: "لوحة المتدرب",
      viewAllCourses: "جميع الدورات",
      contact: "تواصل معنا",
      cta: "تواصل تجاري",
    },
    footer: {
      tagline:
        "أول مكان متخصص في تعليم التصوير الفوتوغرافي والفيديو في المملكة العربية السعودية. دربنا أكثر من 5,000 مصوّر ومصوّرة منذ عام 2018.",
      quickLinks: "روابط سريعة",
      contactUs: "تواصل معنا",
      address: "جدة، المملكة العربية السعودية",
      phone: "+966 ___ ___ ___",
      rights: "جميع الحقوق محفوظة",
    },
    home: {
      badge: "الملف التعريفي الرسمي · 2026",
      h1a: "نصنع",
      h1b: "مصوّري الجيل القادم",
      h1c: "في المملكة العربية السعودية",
      lead: "بيت المصور — أول مكان متخصص في تعليم التصوير الفوتوغرافي والفيديو في المملكة. شريك تدريبي معتمد للعلامات العالمية، ومنصة لتمكين المواهب السعودية ضمن رؤية 2030.",
      ctaServices: "تعرّف على خدماتنا",
      ctaPartner: "فرص الشراكة",
      stats: [
        { value: "+5,000", label: "متدرب ومتدربة" },
        { value: "+10", label: "سنوات خبرة" },
        { value: "+500", label: "ورشة عمل" },
        { value: "99%", label: "تقييم إيجابي" },
      ],
      whoKicker: "من نحن",
      whoTitleA: "بيت لكل من يرى العالم",
      whoTitleB: "من خلف العدسة",
      whoText:
        "تأسست أكاديمية بيت المصور عام 2018 في مدينة جدة، كأول مركز متخصص في تعليم التصوير الفوتوغرافي والفيديو بشكل عملي واحترافي في المملكة. نقدّم برامج تدريبية مصممة بمعايير عالمية، ينفذها مدربون معتمدون من كبرى الشركات الدولية، في بيئة استوديو مجهزة بأحدث المعدات.",
      bullets: [
        "منهج تدريبي عملي مبني على معايير الصناعة العالمية",
        "بيئة استوديو احترافية مجهزة بأحدث المعدات والإضاءة",
        "شراكات مع كبرى الجهات الحكومية والعلامات العالمية",
        "شهادات معتمدة وتمكين فعلي لدخول سوق العمل",
      ],
      pillars: [
        { title: "خبرة احترافية", text: "مدربون محترفون معتمدون وذوو خبرة طويلة في الصناعة." },
        { title: "تمكين الكفاءات", text: "تمكين أكثر من 5,000 موهبة سعودية لدخول سوق العمل." },
        { title: "جودة معتمدة", text: "برامج تدريبية تتماشى مع معايير الصناعة العالمية." },
      ],
      workKicker: "أعمالنا",
      workTitle: "من داخل الورش التدريبية",
      workMore: "عرض الخدمات ←",
      partnersKicker: "بثقة",
      partnersTitle: "تشرفنا بالتعاون مع",
      partnersNote: "نسعى لتوسيع شراكاتنا مع كبرى العلامات العالمية في مجال الصناعة البصرية.",
      ctaTitle: "جاهزون لشراكة استراتيجية",
      ctaText:
        "نرحّب بفرص التعاون مع العلامات العالمية في التدريب، إطلاق المنتجات، صناعة المحتوى، والفعاليات الإقليمية في المملكة العربية السعودية.",
      ctaBtn: "ابدأ محادثة",
    },
    about: {
      kicker: "من نحن",
      title: "من نحن",
      p1prefix: "",
      p1brand: "بيت المصور",
      p1: " هو أول مكان متخصص في تعليم التصوير الفوتوغرافي والفيديو في المملكة العربية السعودية، تأسس عام 2018 في مدينة جدة على يد نخبة من المصوّرين والمدرّبين المحترفين.",
      p2: "نؤمن بأن الإبداع البصري يُتعلَّم، ولذلك صمّمنا برامجنا لتكون تجربة عملية متكاملة، تجمع بين المعرفة الأكاديمية والتطبيق الميداني داخل بيئة استوديو مجهّزة بأحدث المعدّات والإضاءة الاحترافية.",
      p3a: "على مدى أكثر من سبع سنوات، خرّجنا أكثر من ",
      p3strong: "5,000 مصوّر ومصوّرة",
      p3b: "، وشاركنا في تدريب فرق تابعة لجهات حكومية ومؤسسات دولية، مساهمين بذلك في تحقيق أهداف رؤية المملكة 2030 لتمكين الكوادر الإبداعية.",
      cards: [
        {
          t: "رؤيتنا",
          d: "أن نكون المرجع الإقليمي الأول في تأهيل المصوّرين والمنتجين البصريين بمعايير عالمية.",
        },
        {
          t: "رسالتنا",
          d: "تمكين المواهب السعودية والعربية بتدريب احترافي يفتح لهم أبواب سوق العمل العالمي.",
        },
        { t: "قيمنا", d: "الجودة، الشغف، الاحترافية، والشراكة طويلة الأمد مع كل من يثق بنا." },
      ],
      trainerTitle: "المدرّب الرئيسي",
      trainerKicker: "مدرّب معتمد",
      trainerName: "المدرّب الرئيسي",
      trainerRole: "مصوّر ومدرّب معتمد · مدير الأكاديمية الفني",
      trainerBio:
        "يجمع بين أكثر من عشر سنوات من العمل الميداني في التصوير التجاري، الإضاءة، والإخراج، ومسيرة طويلة في تدريب أجيال من المصوّرين العرب.",
      trainerLink: "شاهد أعماله على إنستجرام",
    },
    services: {
      kicker: "خدماتنا",
      title: "برامج تدريبية احترافية",
      lead: "مسارات تعليمية مصمّمة بمعايير الصناعة العالمية، نُقدّمها حضورياً وأونلاين.",
      items: [
        {
          title: "أساسيات التصوير الفوتوغرافي",
          desc: "البوابة الأولى لاحتراف التصوير: الكاميرا، التكوين، التعريض، والإبداع البصري.",
        },
        {
          title: "احتراف الإضاءة الشاملة",
          desc: "ورشة مكثفة من الصفر إلى السينمائي والفاشن — التحكم الكامل في كل لوك.",
        },
        {
          title: "تصوير البيوتي والفاشن",
          desc: "تقنيات الاستوديو، التنقيح المتقدم، والعمل مع العارضين.",
        },
        { title: "تصوير الأعراس", desc: "توثيق احترافي للحظات الإنسانية في أصعب ظروف الإضاءة." },
        {
          title: "تصوير الأطعمة والمنتجات",
          desc: "محتوى تجاري احترافي للمطاعم، العلامات التجارية، والتسويق الرقمي.",
        },
        {
          title: "احتراف الفيديو والمونتاج",
          desc: "رحلة شاملة من التصوير إلى المونتاج بمستوى الإنتاج السينمائي.",
        },
        { title: "التصوير بالجوال", desc: "إنتاج محتوى احترافي بأبسط الأدوات لصنّاع المحتوى." },
        {
          title: "الدبلومة الشاملة",
          desc: "برنامج متكامل يجمع كل المسارات لتأهيل مصوّر محترف بشكل كامل.",
        },
      ],
      corpTitle: "حلول مخصصة للشركات والعلامات التجارية",
      corpText:
        "نُصمّم برامج تدريبية وفعاليات احترافية بناءً على احتياجات شركاؤنا. اكتب بيانات شركتك والخدمة المطلوبة وسنتواصل معك مباشرة عبر واتساب.",
      formCompany: "اسم الشركة",
      formName: "اسم المسؤول",
      formPhone: "رقم الجوال",
      formService: "الخدمة المطلوبة (مثال: تدريب مصوّري الشركة)",
      formSend: "إرسال عبر واتساب",
      formIntro: "مرحباً، نرغب في الاستفسار عن خدماتكم:",
    },
    coursesPage: {
      seoTitle: "دورات أكاديمية بيت المصور في جدة | بيت المصور",
      seoDescription:
        "استكشف دورات التصوير والإضاءة الحضورية في جدة: أساسيات التصوير واحتراف الإضاءة الشاملة مع تدريب عملي داخل الاستوديو.",
      kicker: "الدورات",
      title: "دورات أكاديمية بيت المصور",
      lead: "برامج حضورية عملية في جدة تأخذك من الأساسيات إلى احتراف الإضاءة داخل الاستوديو — اختر الدورة المناسبة لمسارك.",
      viewCourse: "عرض تفاصيل الدورة",
    },
    achievements: {
      kicker: "الإنجازات",
      title: "إنجازاتنا بالأرقام",
      stats: [
        { v: "+5,000", l: "متدرب ومتدربة" },
        { v: "+500", l: "ورشة وبرنامج تدريبي" },
        { v: "+10", l: "سنوات في الصناعة" },
        { v: "99%", l: "تقييم إيجابي" },
      ],
      partnersTitle: "شركاؤنا الاستراتيجيون",
      partnersText: "فخورون بثقة جهات حكومية وعلامات عالمية في الصناعة البصرية.",
      testimonialsTitle: "آراء متدربينا",
      testimonials: [
        {
          n: "حنين",
          r: "متدربة — تصوير البيوتي",
          q: "بيت المصور فعلاً بيت لكل مصور. المدرب متعاون ومحترم وأمين في توصيل المعلومة.",
        },
        {
          n: "مشاعل المشعل",
          r: "مصوّرة محترفة",
          q: "من أجمل الورش التدريبية. تنظيم رائع، اهتمام بأدق التفاصيل، أنصح به الجميع.",
        },
        {
          n: "نوف",
          r: "متدربة — احتراف الإضاءة",
          q: "أكاديمية محترمة جداً والمدرب متمكن. حسيت إن كل ريال دفعته رجع لي أضعاف.",
        },
      ],
      visionTitle: "رؤية 2030",
      visionText:
        "نساهم بشكل مباشر في تحقيق أهداف رؤية المملكة 2030 من خلال تأهيل الكوادر السعودية في قطاع الصناعة الإبداعية والترفيه، وتمكينهم من المنافسة في سوق العمل المحلي والإقليمي، وبناء صناعة محتوى بصري تعكس هوية المملكة الجديدة.",
    },
    contact: {
      kicker: "تواصل معنا",
      title: "لنبني شراكة استثنائية",
      lead: "نرحّب بفرص التعاون مع كبرى العلامات العالمية، الجهات الحكومية، والمؤسسات الإعلامية.",
      formTitle: "طلب تعاون / شراكة",
      name: "الاسم الكامل",
      company: "اسم الشركة",
      email: "البريد الإلكتروني",
      phone: "رقم الجوال (اختياري)",
      message: "حدّثنا عن مشروعك أو فرصة الشراكة...",
      submit: "إرسال الطلب",
      info: [
        {
          t: "بيت المصور — Bayt Al Mosawer Academy",
          d: "أكاديمية تعليم التصوير الفوتوغرافي والفيديو",
        },
        { t: "العنوان", d: "جدة، المملكة العربية السعودية" },
        { t: "البريد الإلكتروني", d: "info@baytalmosawer.net" },
        { t: "للتواصل التجاري", d: "+966 ___ ___ ___" },
        { t: "إنستجرام", d: "@baytalmosawer" },
        { t: "الموقع الرسمي", d: "baytalmosawer.net" },
      ],
    },
  },
  en: {
    dir: "ltr" as "rtl" | "ltr",
    brand: { name: "Bayt Al Mosawer", sub: "BAYT AL MOSAWER ACADEMY" },
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      achievements: "Achievements",
      courses: "Courses",
      platform: "Student Hub",
      viewAllCourses: "All courses",
      contact: "Contact",
      cta: "Business Inquiry",
    },
    footer: {
      tagline:
        "The first specialized place for teaching photography and videography in the Kingdom of Saudi Arabia. Over 5,000 photographers trained since 2018.",
      quickLinks: "Quick Links",
      contactUs: "Contact Us",
      address: "Jeddah, Kingdom of Saudi Arabia",
      phone: "+966 ___ ___ ___",
      rights: "All rights reserved",
    },
    home: {
      badge: "Official Company Profile · 2026",
      h1a: "Crafting the",
      h1b: "next generation of photographers",
      h1c: "in the Kingdom of Saudi Arabia",
      lead: "Bayt Al Mosawer — the first specialized place for photography and videography education in Saudi Arabia. A certified training partner for global brands and a platform empowering Saudi talent within Vision 2030.",
      ctaServices: "Explore our services",
      ctaPartner: "Partnership opportunities",
      stats: [
        { value: "+5,000", label: "Trainees" },
        { value: "+10", label: "Years of experience" },
        { value: "+500", label: "Workshops" },
        { value: "99%", label: "Positive reviews" },
      ],
      whoKicker: "WHO WE ARE",
      whoTitleA: "A home for everyone who sees the world",
      whoTitleB: "through the lens",
      whoText:
        "Founded in 2018 in Jeddah, Bayt Al Mosawer Academy is the first specialized center for hands-on, professional photography and video education in the Kingdom. We deliver curricula built to international industry standards, taught by trainers certified by leading global brands, inside a fully equipped studio environment.",
      bullets: [
        "Practical curriculum built on global industry standards",
        "Professional studio with state-of-the-art gear & lighting",
        "Strategic partnerships with government bodies and global brands",
        "Certified programs that genuinely open the job market",
      ],
      pillars: [
        {
          title: "Professional expertise",
          text: "Certified professional trainers with deep industry experience.",
        },
        {
          title: "Empowering talent",
          text: "Over 5,000 Saudi creatives empowered to enter the market.",
        },
        { title: "Certified quality", text: "Programs aligned with global industry standards." },
      ],
      workKicker: "OUR WORK",
      workTitle: "From inside our workshops",
      workMore: "View services →",
      partnersKicker: "TRUSTED BY",
      partnersTitle: "Proud to collaborate with",
      partnersNote:
        "We are actively expanding our partnerships with leading global brands in the visual industry.",
      ctaTitle: "Ready for a strategic partnership",
      ctaText:
        "We welcome opportunities with global brands across training, product launches, content production, and regional events in Saudi Arabia.",
      ctaBtn: "Start a conversation",
    },
    about: {
      kicker: "ABOUT US",
      title: "About Us",
      p1prefix: "",
      p1brand: "Bayt Al Mosawer",
      p1: " is the first specialized place for photography and videography education in the Kingdom of Saudi Arabia, founded in 2018 in Jeddah by a group of professional photographers and trainers.",
      p2: "We believe creative vision can be taught. Our programs combine academic foundations with field practice inside a studio equipped with the latest gear and professional lighting.",
      p3a: "Over more than seven years, we have graduated more than ",
      p3strong: "5,000 photographers",
      p3b: ", trained teams from government and international institutions, and contributed to Vision 2030's mission of empowering creative talent.",
      cards: [
        {
          t: "Our Vision",
          d: "To be the regional reference for training photographers and visual producers to international standards.",
        },
        {
          t: "Our Mission",
          d: "Empowering Saudi and Arab talent with professional training that opens global market opportunities.",
        },
        {
          t: "Our Values",
          d: "Quality, passion, professionalism, and long-term partnership with everyone who trusts us.",
        },
      ],
      trainerTitle: "Lead Trainer",
      trainerKicker: "CERTIFIED TRAINER",
      trainerName: "Lead Trainer",
      trainerRole: "Certified photographer & trainer · Academy Creative Director",
      trainerBio:
        "More than ten years of field experience in commercial photography, lighting, and direction, alongside a long career training generations of Arab photographers.",
      trainerLink: "View work on Instagram",
    },
    services: {
      kicker: "OUR SERVICES",
      title: "Professional training programs",
      lead: "Learning tracks designed to global industry standards, delivered both on-site and online.",
      items: [
        {
          title: "Photography Fundamentals",
          desc: "Your gateway to professional photography: camera, composition, exposure, and visual creativity.",
        },
        {
          title: "Mastering Lighting",
          desc: "An intensive workshop from the basics to cinematic and fashion lighting.",
        },
        {
          title: "Beauty & Fashion Photography",
          desc: "Studio techniques, high-end retouching, and working with models.",
        },
        {
          title: "Wedding Photography",
          desc: "Professional documentation of human moments in challenging lighting conditions.",
        },
        {
          title: "Food & Product Photography",
          desc: "Professional commercial content for restaurants, brands, and digital marketing.",
        },
        {
          title: "Video & Editing Mastery",
          desc: "A complete journey from filming to editing at cinematic production quality.",
        },
        {
          title: "Mobile Photography",
          desc: "Producing professional content with the simplest tools — for content creators.",
        },
        {
          title: "The Comprehensive Diploma",
          desc: "An integrated program that combines all tracks to build a fully fledged professional.",
        },
      ],
      corpTitle: "Tailored solutions for brands & corporations",
      corpText:
        "We design custom training programs and events for our partners. Fill in your company details and the service you need — we'll get back to you on WhatsApp.",
      formCompany: "Company name",
      formName: "Contact person",
      formPhone: "Phone number",
      formService: "Requested service (e.g. corporate photographer training)",
      formSend: "Send via WhatsApp",
      formIntro: "Hello, we'd like to inquire about your services:",
    },
    coursesPage: {
      seoTitle: "Bayt Al Mosawer Academy Courses in Jeddah",
      seoDescription:
        "Explore in-person photography and lighting courses in Jeddah: Photography Fundamentals and Comprehensive Lighting Mastery with hands-on studio training.",
      kicker: "Courses",
      title: "Bayt Al Mosawer Academy Courses",
      lead: "In-person practical programs in Jeddah — from photography fundamentals to studio lighting mastery. Choose the path that fits your goals.",
      viewCourse: "View course details",
    },
    achievements: {
      kicker: "ACHIEVEMENTS",
      title: "Our impact in numbers",
      stats: [
        { v: "+5,000", l: "Trainees" },
        { v: "+500", l: "Workshops & programs" },
        { v: "+10", l: "Years in the industry" },
        { v: "99%", l: "Positive reviews" },
      ],
      partnersTitle: "Our strategic partners",
      partnersText:
        "Proud to be trusted by government bodies and global brands in the visual industry.",
      testimonialsTitle: "Trainee testimonials",
      testimonials: [
        {
          n: "Haneen",
          r: "Trainee — Beauty Photography",
          q: "Bayt Al Mosawer truly is a home for every photographer. The trainer is collaborative, respectful, and faithful in delivering knowledge.",
        },
        {
          n: "Mashael Almeshal",
          r: "Professional photographer",
          q: "One of the most beautiful training workshops. Great organization and attention to the smallest details. I recommend it to everyone.",
        },
        {
          n: "Nouf",
          r: "Trainee — Mastering Lighting",
          q: "A very professional academy and a capable trainer. I felt every riyal I paid came back to me multiplied.",
        },
      ],
      visionTitle: "Vision 2030",
      visionText:
        "We contribute directly to Saudi Vision 2030 by qualifying Saudi talent in the creative and entertainment industries, enabling them to compete in local and regional markets, and helping build a visual content industry that reflects the Kingdom's new identity.",
    },
    contact: {
      kicker: "GET IN TOUCH",
      title: "Let's build an extraordinary partnership",
      lead: "We welcome collaboration with leading global brands, government bodies, and media institutions.",
      formTitle: "Partnership inquiry",
      name: "Full name",
      company: "Company name",
      email: "Email address",
      phone: "Phone number (optional)",
      message: "Tell us about your project or partnership opportunity...",
      submit: "Send inquiry",
      info: [
        { t: "Bayt Al Mosawer Academy", d: "Academy of photography & videography education" },
        { t: "Address", d: "Jeddah, Kingdom of Saudi Arabia" },
        { t: "Email", d: "info@baytalmosawer.net" },
        { t: "Business contact", d: "+966 ___ ___ ___" },
        { t: "Instagram", d: "@baytalmosawer" },
        { t: "Official website", d: "baytalmosawer.net" },
      ],
    },
  },
};

type Dict = typeof translations.ar;
type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const LangCtx = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // SSR-safe default: always 'ar' on first render to match server HTML.
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const saved = (typeof localStorage !== "undefined" &&
      localStorage.getItem("lang")) as Lang | null;
    if (saved === "en" || saved === "ar") setLangState(saved);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = translations[lang].dir;
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof localStorage !== "undefined") localStorage.setItem("lang", l);
  };

  return (
    <LangCtx.Provider value={{ lang, setLang, t: translations[lang] }}>{children}</LangCtx.Provider>
  );
}

export function useT() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useT must be used within LanguageProvider");
  return ctx;
}
