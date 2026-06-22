export type CourseQuickFact = {
  icon: string;
  label: string;
  value: string;
};

export type CourseListItem = {
  text: string;
};

export type CourseCard = {
  title: string;
  description: string;
};

export type CourseComparisonSection = {
  title: string;
  lead?: string;
  beforeTitle: string;
  afterTitle: string;
  before: CourseListItem[];
  after: CourseListItem[];
  highlightQuote?: string;
};

export type CourseRoiSection = {
  title: string;
  text: string;
  example: string;
  disclaimer: string;
};

export type CoursePriceObjectionSection = {
  title: string;
  lead: string;
  cards: CourseCard[];
  highlightQuote: string;
  cta: {
    title: string;
    description: string;
    buttonLabel: string;
  };
};

export type CourseTrainerSection = {
  name: string;
  specialty: string;
  image?: string;
  imageAlt?: string;
  todoNote?: string;
};

export type CourseValuePurchaseSection = {
  title: string;
  cards: CourseCard[];
};

export type CourseModule = {
  number: number;
  title: string;
  description: string;
  /** قائمة المحاور الفرعية داخل المجموعة */
  topics?: string[];
};

export type CourseTimelineDay = {
  day: number;
  title: string;
  description: string;
  /** توزيع المحاور على الأيام قابل للتحديث عند استلام الجدول الرسمي */
  draft?: boolean;
};

export type CourseGalleryImage = {
  src: string;
  alt: string;
};

export type CourseTestimonial = {
  name: string;
  role: string;
  quote: string;
};

export type CourseFAQItem = {
  question: string;
  answer: string;
};

export type CourseSEO = {
  title: string;
  description: string;
  canonicalPath: string;
  ogTitle: string;
  ogDescription: string;
};

export type CourseLandingData = {
  slug: string;
  name: string;
  badge: string;
  heroImage: string;
  heroImageAlt: string;
  breadcrumb: { label: string; href?: string }[];
  heroTitle: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  heroDescription: string;
  /** سطر بيعي بارز أسفل الوصف */
  heroPitchLine?: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  heroSecondaryCtaTarget: string;
  whatsappBookingMessage: string;
  /** @deprecated Use trustBar instead */
  trustItems?: string[];
  trustBar: CourseListItem[];
  quickFacts: CourseQuickFact[];
  durationDays: number;
  totalHours: number;
  dailyHours: number;
  level: string;
  trainingType: string;
  location: string;
  instructorName?: string;
  priceLabel: string;
  scheduleLabel: string;
  seo: CourseSEO;
  problem: {
    question: string;
    before: CourseListItem[];
    after: CourseListItem[];
  };
  whyStart: {
    kicker: string;
    title: string;
    lead: string;
    cards: CourseCard[];
  };
  learnOutcomes: {
    kicker: string;
    title: string;
    items: CourseListItem[];
  };
  curriculum: {
    kicker: string;
    title: string;
    modules: CourseModule[];
  };
  practical: {
    title: string;
    description: string;
    steps: CourseListItem[];
    applicationsTitle?: string;
    applications?: CourseListItem[];
  };
  investment?: CourseComparisonSection;
  valuePurchase?: CourseValuePurchaseSection;
  roi?: CourseRoiSection;
  priceObjection?: CoursePriceObjectionSection;
  trainer?: CourseTrainerSection;
  income: {
    title: string;
    lead: string;
    requirements: CourseListItem[];
    opportunities: CourseListItem[];
    disclaimer: string;
  };
  audience: {
    title: string;
    groups: CourseListItem[];
    experienceQuestion: string;
    experienceAnswer: string;
  };
  timeline: {
    title: string;
    days: CourseTimelineDay[];
  };
  registrationBenefits: {
    title: string;
    items: CourseListItem[];
  };
  gallery: {
    kicker: string;
    title: string;
    images: CourseGalleryImage[];
  };
  testimonials: {
    kicker: string;
    title: string;
    note: string;
    items: CourseTestimonial[];
  };
  faq: {
    title: string;
    items: CourseFAQItem[];
  };
  finalCta: {
    title: string;
    description: string;
    buttonLabel: string;
    investmentLine?: string;
    trustNote?: string;
  };
  incomeCta: {
    title: string;
    buttonLabel: string;
  };
  booking: {
    limitedSeatsNote: string;
  };
  ui: {
    seoH1: string;
    heroMobileStats: string;
    problemKicker: string;
    beforeTitle: string;
    afterTitle: string;
    timelineDraftNote: string;
    dayPrefix: string;
    incomeNeedsTitle: string;
    incomePathsTitle: string;
    priceFieldLabel: string;
    scheduleFieldLabel: string;
    durationText: string;
    hoursText: string;
    instructorText?: string;
    applicationsTitle?: string;
    testimonialsEmpty: string;
    trainerKicker?: string;
    ctas: {
      hero: string;
      booking: string;
      mobile: string;
      registration: string;
      income: string;
      final: string;
    };
  };
};
