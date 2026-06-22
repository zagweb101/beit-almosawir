import type { CourseLandingData } from "@/types/course";
import {
  beautyPhotographyGalleryImages,
  beautyPhotographyHeroImage,
  beautyPhotographyTrainerImage,
} from "./media";

const testimonials = [
  {
    name: "Haneen",
    role: "Trainee — Beauty Photography",
    quote:
      "Bayt Al Mosawer truly feels like a home for every photographer. The trainer is supportive, respectful, and honest in delivering knowledge.",
  },
  {
    name: "Mashaal Al-Mishaal",
    role: "Professional Photographer",
    quote:
      "One of the best training workshops. Excellent organization, attention to detail — I recommend it to everyone.",
  },
  {
    name: "Nouf",
    role: "Trainee — Mastering Lighting",
    quote:
      "A very professional academy and a highly skilled trainer. I felt every riyal I paid came back to me many times over.",
  },
] as const;

const galleryAlts: Record<string, string> = {
  beautySession: "Professional beauty photography session at Bayt Al Mosawer Academy studio",
  beautyVideo: "Beauty video and Reels content filmed in the studio",
  studioTeam: "Hands-on practice with makeup team and model in the studio",
};

export const beautyPhotographyCourseEn: CourseLandingData = {
  slug: "beauty-photography",
  name: "Beauty & Glamour Photography",
  badge: "3 in-person days · Jeddah",
  heroImage: beautyPhotographyHeroImage,
  heroImageAlt:
    "Professional beauty photography session at Bayt Al Mosawer Academy studio in Jeddah",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Beauty & Glamour Photography" },
  ],
  heroTitle: "From one shot… to beauty content that sells your level",
  heroTitleHighlight: "Beauty & Glamour Photography",
  heroSubtitle:
    "A comprehensive beauty photography experience: High-End photography, professional retouching, video shooting, and Reels editing — with hands-on practice under direct supervision from photographer Ahmed Zaghloul and a professional studio team.",
  heroDescription:
    "A comprehensive beauty photography experience: High-End photography, professional retouching, video shooting, and Reels editing — with hands-on practice under direct supervision from photographer Ahmed Zaghloul and a professional studio team.",
  heroPitchLine:
    "A golden opportunity for practical application and growth — book your spot before seats fill up.",
  heroPrimaryCta: "Book your spot now",
  heroSecondaryCta: "Explore workshop topics",
  heroSecondaryCtaTarget: "#curriculum",
  whatsappBookingMessage:
    "Hello, I would like to register for the Beauty & Glamour Photography course with photographer Ahmed Zaghloul. I would like to know the price, the next cohort date, and registration requirements.",
  trustBar: [
    { text: "3 in-person days" },
    { text: "Photo · Video · Retouch" },
    { text: "Practice with a pro team" },
    { text: "Makeup · Hair · Model" },
    { text: "Post-workshop follow-up" },
  ],
  durationDays: 3,
  totalHours: 12,
  dailyHours: 4,
  level: "Beginner to intermediate",
  trainingType: "In-person",
  location: "Bayt Al Mosawer Academy — Jeddah",
  instructorName: "Photographer Ahmed Zaghloul",
  priceLabel: "Contact us for pricing and available offers",
  scheduleLabel: "Next cohort date to be announced soon",
  seo: {
    title: "Beauty & Glamour Photography Course in Jeddah | Bayt Al Mosawer Academy",
    description:
      "A 3-day workshop covering High-End beauty photography, retouching, video shooting, and Reels editing with hands-on studio practice with photographer Ahmed Zaghloul in Jeddah.",
    canonicalPath: "/courses/beauty-photography",
    ogTitle: "Beauty & Glamour Photography Course in Jeddah | Bayt Al Mosawer Academy",
    ogDescription:
      "A 3-day workshop covering High-End beauty photography, retouching, video shooting, and Reels editing with hands-on studio practice with photographer Ahmed Zaghloul in Jeddah.",
  },
  quickFacts: [
    { icon: "Calendar", label: "Duration", value: "3 days" },
    { icon: "Clock", label: "Content", value: "Photo · Video · Retouch" },
    { icon: "GraduationCap", label: "Level", value: "Beginner to intermediate" },
    { icon: "MapPin", label: "Format", value: "In-person" },
    { icon: "Building2", label: "Location", value: "Jeddah" },
    { icon: "User", label: "Instructor", value: "Ahmed Zaghloul" },
  ],
  problem: {
    question:
      "Do you love beauty photography… but your results never reach the level of the images you follow?",
    before: [
      { text: "Acceptable images that never look High-End" },
      { text: "Difficulty highlighting makeup and skin details" },
      { text: "Lighting that does not suit face and texture" },
      { text: "Not knowing the right angles for beauty photography" },
      { text: "Weak coordination with the makeup team" },
      { text: "Over-retouching or unprofessional finishing" },
      { text: "Not knowing how to shoot Reels or Tutorials for beauty" },
      { text: "Photo-only content with no video limits work opportunities" },
      { text: "A portfolio that does not reflect your true level" },
    ],
    after: [
      { text: "High-End photography that reveals the finest details" },
      { text: "Camera and lighting settings tailored for beauty" },
      { text: "Correct angles and distances between light, camera, and model" },
      { text: "Professional collaboration with makeup artists" },
      { text: "High-End Retouch in Photoshop" },
      { text: "Reels and Tutorial shooting and editing" },
      { text: "A full practical session with a studio team" },
      { text: "Work ready for your portfolio and social media" },
    ],
  },
  whyStart: {
    kicker: "Why this workshop?",
    title: "The beauty market does not wait for those who learn by trial and error",
    lead: "Clients do not pay for the shutter button — they pay for images and content that prove you deserve their trust. In 3 days you move from guessing to deliberate execution under direct supervision.",
    cards: [
      {
        title: "Photography that reveals detail",
        description:
          "Learn settings, lighting, and angles that serve makeup and skin — not just a pretty shot.",
      },
      {
        title: "Retouching that raises image value",
        description:
          "High-End Retouch gives you a professional finish that separates hobby from career.",
      },
      {
        title: "Video opens new opportunities",
        description: "Reels and Tutorials — content clients and creators demand today.",
      },
      {
        title: "Practice with a real team",
        description: "Makeup · Hair · Model — like a real session, not theory only.",
      },
    ],
  },
  learnOutcomes: {
    kicker: "What will you learn?",
    title: "What will you leave with after 3 days?",
    items: [
      { text: "High-End photography that reveals the finest beauty details" },
      { text: "Choosing and using the best gear, lighting, and modifiers" },
      { text: "Camera and lighting settings for beauty" },
      { text: "Shooting angles and distances between light, camera, and model" },
      { text: "Understanding depth of field in beauty photography" },
      { text: "Working with makeup artists and understanding foundation and skin types" },
      { text: "Criteria for choosing the right model" },
      { text: "Shooting Reels and Tutorials for beauty" },
      { text: "Camera settings for video and video lighting setup" },
      { text: "Editing Reels and Tutorials" },
      { text: "High-End Retouch in Adobe Photoshop" },
      { text: "A full practical session for every trainee with a professional team" },
    ],
  },
  curriculum: {
    kicker: "Workshop topics",
    title: "Beauty workshop topics — 3 days",
    modules: [
      {
        number: 1,
        title: "Day 1: Fundamentals and hands-on practice",
        description:
          "An overview of beauty photography from gear to a practical session with a professional team.",
        topics: [
          "Overview of beauty photography",
          "Best gear used (camera · lighting · modifiers)",
          "Camera and lighting settings",
          "Shooting angles and light, camera, and model distances",
          "Understanding depth of field in beauty",
          "Working with makeup artists and understanding makeup, foundation, and skin types",
          "Criteria for choosing a model",
          "Hands-on practice for every trainee with a team (makeup · hair · model)",
        ],
      },
      {
        number: 2,
        title: "Day 2: Video and Reels",
        description:
          "From still photography to video content that sells your service on social media.",
        topics: [
          "How to shoot Reels and Tutorials",
          "Camera settings for video",
          "Video lighting distribution and setup",
          "Editing Reels and Tutorials",
          "Full shooting session (video + photo)",
        ],
      },
      {
        number: 3,
        title: "Day 3: High-End Retouch",
        description: "The final touch that turns a good image into a professional one.",
        topics: [
          "Image editing in Adobe Photoshop",
          "High-End Retouch for beauty",
          "Free gifts: professional Skin Tones + WhatsApp group for reviews and consultations",
        ],
      },
    ],
  },
  practical: {
    title: "Not just watching… a real session for every trainee",
    description:
      "Every trainee practices in the studio with makeup, hair, and model teams — see the result, fix mistakes, and leave with work ready for your portfolio.",
    steps: [
      { text: "Concept explanation" },
      { text: "Lighting and camera setup" },
      { text: "Coordination with the makeup team" },
      { text: "Session execution" },
      { text: "Review results" },
      { text: "Correct mistakes" },
      { text: "Reels video shooting" },
      { text: "High-End Retouch" },
    ],
    applicationsTitle: "Four workshop pillars",
    applications: [
      { text: "Photography" },
      { text: "High-End Retouch" },
      { text: "Video shooting" },
      { text: "Video editing" },
    ],
  },
  investment: {
    title: "3 days that can change your session level for months ahead",
    lead: "Instead of months of random trial and over-retouching, you compress the path into an intensive workshop with direct supervision — and leave with skills, work, and tools you use immediately.",
    beforeTitle: "Staying at hobby level",
    afterTitle: "Investing in the beauty workshop",
    before: [
      { text: "Images that do not represent your level to clients" },
      { text: "Long sessions without High-End results" },
      { text: "Lost beauty and video opportunities from weak skills" },
      { text: "A weak portfolio that does not convince clients to book" },
      { text: "Unprofessional Reels content" },
    ],
    after: [
      { text: "High-End work ready to show" },
      { text: "Full understanding from lighting to retouch" },
      { text: "Photo + video content from one session" },
      { text: "Professional Skin Tones as a gift" },
      { text: "WhatsApp group for reviews and consultations" },
      { text: "Higher confidence to accept beauty sessions" },
    ],
    highlightQuote:
      "Clients book the photographer whose work they see — not the one who promises to improve.",
  },
  valuePurchase: {
    title: "You are not buying 3 days only",
    cards: [
      {
        title: "High-End skill",
        description: "Photography and retouching that sets you apart in the beauty market.",
      },
      {
        title: "Ready video content",
        description: "Reels and Tutorials — in demand from clients and creators today.",
      },
      {
        title: "Practice with a real team",
        description: "Full session experience — not a theoretical exercise.",
      },
      {
        title: "Professional Skin Tones",
        description: "A free gift to instantly raise skin quality in your images.",
      },
      {
        title: "Permanent WhatsApp group",
        description: "Image reviews and free consultations after the workshop.",
      },
      {
        title: "Stronger portfolio",
        description: "Studio work that shows your service level to the next client.",
      },
    ],
  },
  income: {
    title: "How can the beauty workshop raise the value of your service?",
    lead: "The beauty, makeup, and visual content market is growing — those who deliver photo + video + professional retouch can price differently. Results depend on your application and marketing.",
    requirements: [
      { text: "Beauty sessions for makeup artists" },
      { text: "Portfolio shoots for models" },
      { text: "Reels content for salons and brands" },
      { text: "Makeup Tutorial shooting" },
      { text: "In-studio photography services" },
    ],
    opportunities: [
      { text: "Collaboration with beauty professionals" },
      { text: "Social media content for brands" },
      { text: "Upgrading your current photography service" },
      { text: "Adding a video package to sessions" },
      { text: "Building a name in beauty photography" },
    ],
    disclaimer:
      "The workshop does not guarantee immediate income, but it gives you skills, content, and tools to offer a paid service with greater confidence.",
  },
  roi: {
    title: "When can you recover your investment?",
    text: "It depends on the workshop price, your session pricing, and your market. One beauty session or a limited number of sessions may cover the investment — if you apply what you learned and present your work professionally.",
    example:
      "A beauty photographer offering a session priced appropriately for their market may recover the workshop cost from one session or several — depending on service level and marketing.",
    disclaimer:
      "Illustrative example, not a guaranteed income outcome. Results depend on application, pricing, marketing, and market.",
  },
  audience: {
    title: "Who is this workshop for?",
    groups: [
      { text: "Portrait photographers entering beauty" },
      { text: "Beauty photographers who want to level up" },
      { text: "Content creators in the beauty space" },
      { text: "Those who want to add video and Reels to their service" },
      { text: "Those who want to learn High-End Retouch" },
      { text: "Those who want a professional portfolio quickly" },
      { text: "Makeup artists who want to understand photography" },
      { text: "Those who want to work confidently with a studio team" },
    ],
    experienceQuestion: "Do I need prior experience?",
    experienceAnswer:
      "Basic camera and exposure knowledge is preferred. The workshop takes you from beauty fundamentals to advanced hands-on application.",
  },
  timeline: {
    title: "Workshop plan — 3 days",
    days: [
      {
        day: 1,
        title: "Beauty fundamentals and team practice",
        description: "Gear · settings · angles · makeup · hands-on session for every trainee.",
        draft: false,
      },
      {
        day: 2,
        title: "Reels · Tutorial · Video",
        description: "Video content shooting and editing with a full session.",
        draft: false,
      },
      {
        day: 3,
        title: "High-End Retouch + gifts",
        description: "Photoshop · Skin Tones · WhatsApp group for follow-up.",
        draft: false,
      },
    ],
  },
  registrationBenefits: {
    title: "Registration benefits and gifts",
    items: [
      { text: "3 in-person days in the studio" },
      { text: "Hands-on practice for every trainee with a professional team" },
      { text: "High-End photography · video · retouch" },
      { text: "Gift: professional Skin Tones for download" },
      { text: "WhatsApp group for reviews and free consultations" },
      { text: "Installments via Tamara (4 payments) — subject to availability" },
      { text: "Post-workshop follow-up" },
    ],
  },
  trainer: {
    name: "Photographer Ahmed Zaghloul",
    specialty: "Beauty · Portrait · Video · Studio lighting",
    image: beautyPhotographyTrainerImage,
    imageAlt: "Photographer Ahmed Zaghloul — Beauty Photography workshop instructor",
    todoNote: "TODO: Add approved photo and bio for photographer Ahmed Zaghloul.",
  },
  gallery: {
    kicker: "Training atmosphere",
    title: "Images from the beauty workshop",
    images: beautyPhotographyGalleryImages.map(({ src, altKey }) => ({
      src,
      alt: galleryAlts[altKey],
    })),
  },
  testimonials: {
    kicker: "Trainee feedback",
    title: "Bayt Al Mosawer trainee experiences",
    note: "Real feedback from academy trainees — including a beauty photography trainee experience.",
    items: [...testimonials],
  },
  priceObjection: {
    title: "Every day you wait… a session opportunity passes you by",
    lead: "The workshop is limited in seats to ensure real hands-on practice for every participant. Do not wait for the «perfect time» — start now and build a portfolio that convinces your first client.",
    cards: [
      {
        title: "The cost of wasted sessions",
        description:
          "Every session with wrong setup costs your time and reputation — more than the workshop price.",
      },
      {
        title: "The cost of opportunities you miss",
        description:
          "Without High-End work and Reels you may miss collaborations with makeup artists and brands.",
      },
      {
        title: "The cost of staying invisible",
        description:
          "A weak portfolio means clients choose another photographer — even if you are talented.",
      },
    ],
    highlightQuote: "Do not miss the opportunity — we are waiting for you in the studio.",
    cta: {
      title: "Book your spot before seats fill up",
      description:
        "Contact us on WhatsApp now for price and schedule — one step away from a professional beauty session.",
      buttonLabel: "Book via WhatsApp",
    },
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        question: "How long is the workshop?",
        answer: "3 in-person days at Bayt Al Mosawer Academy in Jeddah.",
      },
      {
        question: "Is the workshop practical or theoretical?",
        answer:
          "Fully practical — every trainee applies with makeup, hair, and model teams in the studio, plus Reels and High-End Retouch.",
      },
      {
        question: "Will I learn retouching?",
        answer: "Yes. Day 3 is dedicated to High-End Retouch in Adobe Photoshop.",
      },
      {
        question: "Will I learn video shooting?",
        answer: "Yes. Day 2 covers Reels and Tutorial shooting and video editing.",
      },
      {
        question: "What are the free gifts?",
        answer:
          "Professional Skin Tones for download + a WhatsApp group for all trainees for reviews and free consultations.",
      },
      {
        question: "Is installment payment available?",
        answer:
          "You can pay in 4 installments via Tamara — subject to availability at registration.",
      },
      {
        question: "Do I need prior experience?",
        answer:
          "Basic camera and exposure knowledge is preferred. The workshop suits those entering or advancing in beauty photography.",
      },
      {
        question: "How do I find out the price and schedule?",
        answer:
          "Contact the Bayt Al Mosawer team via WhatsApp for pricing and the next cohort date.",
      },
    ],
  },
  finalCta: {
    title: "Your professional beauty image starts here",
    description:
      "3 days · professional team · High-End · Reels · Retouch — book before seats fill up.",
    investmentLine: "We are waiting for you at Bayt Al Mosawer Academy — Jeddah.",
    buttonLabel: "Book your spot now",
    trustNote: "Contact us on WhatsApp for price, schedule, and registration requirements.",
  },
  incomeCta: {
    title: "Turn your passion for beauty into a service clients can see",
    buttonLabel: "Start now — book your spot",
  },
  booking: {
    limitedSeatsNote: "Limited seats to ensure hands-on practice for every trainee",
  },
  ui: {
    seoH1: "Beauty & Glamour Photography Course in Jeddah",
    heroMobileStats: "3 days · High-End · Reels",
    problemKicker: "Problem and transformation",
    beforeTitle: "Before the workshop",
    afterTitle: "After the workshop",
    timelineDraftNote: "",
    dayPrefix: "Day",
    incomeNeedsTitle: "Opportunities you can develop",
    incomePathsTitle: "Additional paths",
    priceFieldLabel: "Price",
    scheduleFieldLabel: "Workshop date",
    durationText: "3 in-person days",
    hoursText: "Photo · video · retouch",
    instructorText: "Instructor",
    applicationsTitle: "Workshop topics",
    trainerKicker: "Instructor",
    testimonialsEmpty: "Trainee feedback will be added soon.",
    ctas: {
      hero: "Book your spot now",
      booking: "Book via WhatsApp",
      mobile: "Book now",
      registration: "Send booking request",
      income: "Start now — book your spot",
      final: "Book your spot now",
    },
  },
};
