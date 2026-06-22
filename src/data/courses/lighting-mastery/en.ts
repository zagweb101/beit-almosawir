import type { CourseLandingData } from "@/types/course";
import {
  lightingMasteryGalleryImages,
  lightingMasteryHeroImage,
  lightingMasteryTrainerImage,
} from "./media";

const academyTestimonials = [
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
  lightingTraining: "Hands-on studio lighting training at Bayt Al Mosawer Academy",
  beautyLighting: "Professional beauty lighting setup in a studio session",
  studioWorkshop: "Trainees applying lighting skills in a studio workshop",
  studioEnvironment: "Professional studio environment for lighting training in Jeddah",
};

export const lightingMasteryCourseEn: CourseLandingData = {
  slug: "lighting-mastery",
  name: "Comprehensive Lighting Mastery",
  badge: "In-person practical course in Jeddah",
  heroImage: lightingMasteryHeroImage,
  heroImageAlt: "Hands-on studio lighting training at Bayt Al Mosawer Academy in Jeddah",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Comprehensive Lighting Mastery" },
  ],
  heroTitle: "Don't buy more gear… learn how to create images worth more with what you have",
  heroTitleHighlight: "Comprehensive Lighting Mastery",
  heroSubtitle:
    "Over 20 practical training hours, you will learn to understand, shape, and control light — its direction, intensity, and color — then apply it in portrait, beauty, fashion, and Color Gel sessions to build stronger work and deliver a more professional service.",
  heroDescription:
    "Over 20 practical training hours, you will learn to understand, shape, and control light — its direction, intensity, and color — then apply it in portrait, beauty, fashion, and Color Gel sessions to build stronger work and deliver a more professional service.",
  heroPitchLine:
    "This is not a temporary expense — it is an investment in a skill you will use in every session ahead.",
  heroPrimaryCta: "Understand the investment value",
  heroSecondaryCta: "Explore practical applications",
  heroSecondaryCtaTarget: "#curriculum",
  whatsappBookingMessage:
    "Hello, I would like to know the price and schedule for the Comprehensive Lighting Mastery course with photographer Ahmed Zaghloul, and how the course can help me improve my sessions and photography services.",
  trustBar: [
    { text: "5 training days" },
    { text: "20 practical hours" },
    { text: "In-person training" },
    { text: "Studio applications" },
    { text: "Post-course follow-up" },
  ],
  durationDays: 5,
  totalHours: 20,
  dailyHours: 4,
  level: "Beginner to intermediate",
  trainingType: "In-person",
  location: "Bayt Al Mosawer Academy — Jeddah",
  instructorName: "Photographer Ahmed Zaghloul",
  priceLabel: "Contact us for pricing and available offers",
  scheduleLabel: "Next cohort date to be announced soon",
  seo: {
    title: "Lighting Mastery Course in Jeddah | Bayt Al Mosawer Academy",
    description:
      "Learn light sources, direction, control tools, HSS, and color theory with portrait, beauty, fashion, and Color Gel applications over 5 days and 20 training hours in Jeddah.",
    canonicalPath: "/courses/lighting-mastery",
    ogTitle: "Lighting Mastery Course in Jeddah | Bayt Al Mosawer Academy",
    ogDescription:
      "Learn light sources, direction, control tools, HSS, and color theory with portrait, beauty, fashion, and Color Gel applications over 5 days and 20 training hours in Jeddah.",
  },
  quickFacts: [
    { icon: "Calendar", label: "Duration", value: "5 days" },
    { icon: "Clock", label: "Hours", value: "20 hours" },
    { icon: "GraduationCap", label: "Level", value: "Beginner to intermediate" },
    { icon: "MapPin", label: "Format", value: "In-person" },
    { icon: "Building2", label: "Location", value: "Jeddah" },
    { icon: "User", label: "Instructor", value: "Ahmed Zaghloul" },
  ],
  problem: {
    question: "Are your images good… but the lighting never gives them the power you imagine?",
    before: [
      { text: "Relying on one lighting setup for every session" },
      { text: "Fear of studio flashes" },
      { text: "Harsh, unwanted shadows" },
      { text: "Difficulty balancing light on face and background" },
      { text: "Not understanding soft vs. hard light" },
      { text: "Using modifiers without understanding their effect" },
      { text: "Not understanding color harmony in the scene" },
      { text: "Random trial-and-error until an acceptable result" },
      { text: "Inability to repeat results in another session" },
      { text: "Buying new gear without fully using what you own" },
    ],
    after: [
      { text: "Reading light before you shoot" },
      { text: "Choosing the right light source" },
      { text: "Controlling direction and intensity" },
      { text: "Shaping light with intention" },
      { text: "Controlling shadows and highlighting details" },
      { text: "Choosing the right modifier for each session" },
      { text: "Using color and light harmoniously" },
      { text: "Executing more than one lighting setup" },
      { text: "Repeating results more consistently" },
      { text: "Understanding why each setup succeeds or fails" },
    ],
  },
  whyStart: {
    kicker: "Why start with this course?",
    title: "Understand light before buying more equipment",
    lead: "Gear may lose value over time, but skill stays with you in every session. The difference between an average photographer and a professional is not just the camera — it is the ability to understand and control light.",
    cards: [
      {
        title: "Understand light, not just diagrams",
        description:
          "Learn why each setup works and when to use it — instead of copying presets that do not fit every session.",
      },
      {
        title: "Control the result before shooting",
        description: "Learn to predict shadows, details, and color before you press the shutter.",
      },
      {
        title: "Execute multiple genres",
        description: "Apply lighting in portrait, beauty, fashion, and Color Gel sessions.",
      },
      {
        title: "Raise the value of your service",
        description:
          "Use lighting knowledge to build stronger work and deliver a more professional client experience.",
      },
    ],
  },
  learnOutcomes: {
    kicker: "What you'll learn",
    title: "What you'll learn in Comprehensive Lighting Mastery",
    items: [
      { text: "Understand light sources and choose the right one" },
      { text: "Distinguish light types and their impact" },
      { text: "Read light direction and its effect on face and scene" },
      { text: "Control light intensity" },
      { text: "Balance multiple light sources" },
      { text: "Use diffusers and reflectors" },
      { text: "Shape light inside the studio" },
      { text: "Understand HSS and when to use it" },
      { text: "Use the color wheel" },
      { text: "Build a harmonious color scene" },
      { text: "Execute portrait lighting" },
      { text: "Execute beauty lighting" },
      { text: "Execute fashion lighting" },
      { text: "Use Color Gel" },
      { text: "Retouch images in Photoshop" },
      { text: "Analyze and fix lighting mistakes" },
    ],
  },
  curriculum: {
    kicker: "Course modules",
    title: "Course modules",
    modules: [
      {
        number: 1,
        title: "Group 1: Understanding light",
        description:
          "Learn to read light and understand its source, power, direction, and impact on image detail and shadows.",
        topics: ["Light sources", "Types of light", "Light direction", "Light intensity"],
      },
      {
        number: 2,
        title: "Group 2: Light control tools",
        description:
          "Learn to use modification and control tools to reach intentional results instead of random trial and error.",
        topics: [
          "Light control elements",
          "Diffusers and reflectors",
          "Proper light distribution",
          "HSS",
        ],
      },
      {
        number: 3,
        title: "Group 3: Color and scene building",
        description:
          "Understand the relationship between color and light and use color harmoniously to serve your visual idea.",
        topics: [
          "Color wheel and choosing the right colors",
          "Color Gel",
          "Coordinating color with lighting",
          "Building visual moods that fit the concept",
        ],
      },
      {
        number: 4,
        title: "Group 4: Practical applications and retouching",
        description:
          "Move from lighting setup to capture to retouching for a complete final result.",
        topics: [
          "Portrait lighting workshop",
          "Beauty lighting workshop",
          "Fashion and Color Gel workshop",
          "Photoshop retouching",
        ],
      },
    ],
  },
  practical: {
    title: "Lighting is not learned by watching alone",
    description:
      "During the course you move from concept to setup, capture, review, correction, and retouching — seeing the impact of every adjustment in real time.",
    steps: [
      { text: "Explain the concept" },
      { text: "Build the lighting plan" },
      { text: "Set up the tools" },
      { text: "Execute the shot" },
      { text: "Analyze the result" },
      { text: "Correct mistakes" },
      { text: "Re-shoot" },
      { text: "Final image retouching" },
    ],
    applicationsTitle: "Practical applications",
    applications: [
      { text: "Portrait" },
      { text: "Beauty" },
      { text: "Fashion" },
      { text: "Color Gel" },
      { text: "Photoshop" },
    ],
  },
  investment: {
    title: "Not a course cost… an investment in every session ahead",
    lead: "When you learn to control lighting, you do not benefit once. You use the same skill in every portrait, beauty, or fashion session after the course. As quality improves, it becomes easier to build a stronger portfolio and deliver more valuable service.",
    beforeTitle: "Continuing with random trial and error",
    afterTitle: "Investing in lighting understanding",
    before: [
      { text: "Wasting session time changing settings" },
      { text: "Relying on one lighting diagram" },
      { text: "Difficulty repeating results" },
      { text: "Buying gear without using it fully" },
      { text: "Inconsistent quality across work" },
      { text: "Struggling with beauty or fashion professionally" },
      { text: "Heavy retouching to fix lighting mistakes" },
    ],
    after: [
      { text: "Defining the goal before setup" },
      { text: "Choosing the right light source" },
      { text: "Choosing the right modifier" },
      { text: "Building multiple setups" },
      { text: "Reaching results faster" },
      { text: "More consistent output" },
      { text: "Diversifying services" },
      { text: "Improving the image at capture, not only in post" },
    ],
    highlightQuote:
      "A professional photographer is not paid for pressing the shutter — but for creating the result the client needs.",
  },
  valuePurchase: {
    title: "You are not buying training hours alone",
    cards: [
      {
        title: "Repeatable understanding",
        description: "Know why a setup worked and how to recreate it.",
      },
      {
        title: "Less time experimenting",
        description: "Enter sessions with a plan instead of random adjustments.",
      },
      {
        title: "More services",
        description: "Move from one genre to portrait, beauty, fashion, and Color Gel.",
      },
      {
        title: "Stronger portfolio",
        description: "Produce work that shows clients the level of service they can expect.",
      },
      {
        title: "Higher client value",
        description: "Deliver intentional images — not just available light snapshots.",
      },
      {
        title: "A skill that stays with you",
        description: "Use it with every camera, flash, or studio you work with later.",
      },
    ],
  },
  income: {
    title: "How can lighting skill raise the value of your service?",
    lead: "Every new service you can deliver professionally gives you another opportunity to recover your investment and grow income — but results depend on application, portfolio, marketing, and pricing.",
    requirements: [
      { text: "Portrait sessions" },
      { text: "Beauty and makeup photography" },
      { text: "Fashion photography" },
      { text: "In-studio photography" },
      { text: "Brand content creation" },
    ],
    opportunities: [
      { text: "Advertising campaign imagery" },
      { text: "Working with models and makeup artists" },
      { text: "Visual content for businesses" },
      { text: "Upgrading your current photography service" },
      { text: "Working as a lighting assistant or on a production team" },
    ],
    disclaimer:
      "The course does not guarantee immediate income, but it helps you develop a core skill that can become a professional service with continued practice, portfolio building, and marketing.",
  },
  roi: {
    title: "When can you recover your investment?",
    text: "It depends on the course price, the sessions you offer, your pricing, and how well you apply and market your work. Improving session quality and adding portrait, beauty, and fashion services may make a limited number of sessions enough to cover your investment.",
    example:
      "If a photographer offers a professional session priced appropriately for their market and service level, one high-value session or several standard sessions may be enough to recover the cost of learning.",
    disclaimer:
      "This is an illustrative example, not a guaranteed income outcome. Results depend on application, portfolio quality, pricing, marketing, and target market.",
  },
  audience: {
    title: "Who is this course for?",
    groups: [
      { text: "Beginners in studio lighting" },
      { text: "Those using studio flashes without full understanding" },
      { text: "Portrait photographers" },
      { text: "Beauty photographers" },
      { text: "Fashion photographers" },
      { text: "Visual content creators" },
      { text: "Those moving from natural to artificial light" },
      { text: "Those building a stronger portfolio" },
      { text: "Those wanting to understand color and Color Gel" },
      { text: "Those wanting better in-studio results" },
    ],
    experienceQuestion: "Do I need prior experience?",
    experienceAnswer:
      "Basic camera and exposure knowledge is preferred, but the course starts from understanding light and builds skill gradually.",
  },
  timeline: {
    title: "Your journey through the course",
    days: [
      {
        day: 1,
        title: "Understanding light sources, types, and direction",
        description: "Build a clear foundation for reading light sources and their direction.",
        draft: true,
      },
      {
        day: 2,
        title: "Intensity control, reflectors, and diffusers",
        description: "Use control tools, reflectors, and diffusers with intention.",
        draft: true,
      },
      {
        day: 3,
        title: "Light distribution, HSS, and the color wheel",
        description: "Shape light in the studio, understand HSS, and choose harmonious colors.",
        draft: true,
      },
      {
        day: 4,
        title: "Portrait and beauty applications",
        description: "Apply lighting setups in portrait and beauty sessions in the studio.",
        draft: true,
      },
      {
        day: 5,
        title: "Fashion, Color Gel, and Photoshop",
        description: "Execute fashion lighting with Color Gel, then retouch in Photoshop.",
        draft: true,
      },
    ],
  },
  registrationBenefits: {
    title: "Registration benefits",
    items: [
      { text: "20 training hours" },
      { text: "Progressive instruction" },
      { text: "Varied in-studio applications" },
      { text: "Portrait application" },
      { text: "Beauty application" },
      { text: "Fashion application" },
      { text: "Color Gel application" },
      { text: "Photoshop retouching" },
      { text: "Permanent WhatsApp group with the instructor" },
      { text: "Post-course follow-up" },
    ],
  },
  trainer: {
    name: "Photographer Ahmed Zaghloul",
    specialty: "Portrait, beauty, fashion photography and studio lighting",
    image: lightingMasteryTrainerImage,
    imageAlt: "Photographer Ahmed Zaghloul in a studio training session",
    todoNote: "TODO: Add approved photo and bio for photographer Ahmed Zaghloul.",
  },
  gallery: {
    kicker: "Training atmosphere",
    title: "Images from training sessions",
    images: lightingMasteryGalleryImages.map(({ src, altKey }) => ({
      src,
      alt: galleryAlts[altKey],
    })),
  },
  testimonials: {
    kicker: "Trainee feedback",
    title: "Bayt Al Mosawer trainee experiences",
    note: "General feedback from academy trainees — not attributed specifically to Comprehensive Lighting Mastery.",
    items: [...academyTestimonials],
  },
  priceObjection: {
    title: "The price may seem high… until you calculate the cost of staying at the same level",
    lead: "You pay for the course once, but the cost of mistakes repeats: longer sessions, underused gear, images that do not represent your level, and opportunities you cannot take with confidence. Investing in skill can reduce that recurring cost.",
    cards: [
      {
        title: "The cost of gear you do not fully use",
        description:
          "A new flash or modifier makes little difference if you do not know when or how to use it.",
      },
      {
        title: "The cost of time lost in trial and error",
        description:
          "Every session without a clear lighting plan wastes your time and the client's.",
      },
      {
        title: "The cost of opportunities you cannot accept",
        description:
          "Weak lighting control may stop you from beauty, fashion, or campaign work that requires a higher level.",
      },
    ],
    highlightQuote:
      "The value of the course is not in its number of days — but in how many sessions you will use what you learned afterward.",
    cta: {
      title: "Invest in the skill clients notice in the result",
      description:
        "Instead of relying on one setup or buying more gear, learn to use light to create stronger images and a more professional service.",
      buttonLabel: "Talk to us about the course",
    },
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        question: "Is the course suitable for beginners?",
        answer:
          "Yes. The course starts from understanding light sources, types, and direction. Basic camera and exposure knowledge is preferred.",
      },
      {
        question: "Is the course theoretical or practical?",
        answer:
          "It combines instruction and application, including portrait, beauty, fashion, and Color Gel sessions.",
      },
      {
        question: "How long is the course?",
        answer: "Five days with 20 training hours total — four hours per day.",
      },
      {
        question: "Will I learn to use studio flashes?",
        answer:
          "Yes. The course covers light sources, types, control elements, and light distribution in the studio.",
      },
      {
        question: "Does the course include Color Gel?",
        answer: "Yes, including fashion photography with Color Gel and harmonious color choices.",
      },
      {
        question: "Will I learn HSS?",
        answer: "Yes. HSS is one of the core topics covered in the course.",
      },
      {
        question: "Does the course include retouching?",
        answer: "Yes. It includes Photoshop retouching.",
      },
      {
        question: "Is there follow-up after the course?",
        answer:
          "Yes. There is a permanent WhatsApp group with the instructor for questions and discussion.",
      },
      {
        question: "Why is this course priced higher than some others?",
        answer:
          "Because it spans 20 training hours and covers light understanding, control tools, color, HSS, portrait, beauty, fashion, Color Gel, and retouching. The value is in the breadth of skills and applications you can use after the course — not just the number of days.",
      },
      {
        question: "Can I recover the course cost through photography?",
        answer:
          "Lighting skill can help you raise service quality and add new session types. A limited number of sessions may cover your investment depending on your pricing, market, and work level. There is no guaranteed financial outcome, but the skill gives you stronger tools to build a paid service.",
      },
      {
        question: "Is it better to buy new gear or take the course?",
        answer:
          "Gear matters, but only if you know how to use it. Often, understanding light and using what you already own makes a bigger difference than buying new tools without knowing how to use them.",
      },
      {
        question: "Do I need to bring a camera or equipment?",
        answer: "Contact the academy team to confirm requirements for the upcoming cohort.",
      },
      {
        question: "How do I find out the price and schedule?",
        answer:
          "Contact Bayt Al Mosawer via WhatsApp for the next cohort date, pricing, and offers.",
      },
    ],
  },
  finalCta: {
    title: "A strong image starts with light you understand and control",
    description: "Learn to build, shape, and transform your idea into a professional studio image.",
    investmentLine: "Invest once in understanding — use it in every session ahead.",
    buttonLabel: "Find out the next cohort date",
    trustNote: "Contact us for pricing, schedule, and registration requirements.",
  },
  incomeCta: {
    title: "Make light a tool in your hand — not a problem waiting to be solved",
    buttonLabel: "Take your first step toward lighting mastery",
  },
  booking: {
    limitedSeatsNote: "",
  },
  ui: {
    seoH1: "Comprehensive Lighting Mastery Course in Jeddah",
    heroMobileStats: "5 days · 20 hours",
    problemKicker: "Problem and transformation",
    beforeTitle: "Before the course",
    afterTitle: "After the course",
    timelineDraftNote:
      "* TODO: Update day distribution when the official course schedule is confirmed. Current phases are preliminary, not a final schedule.",
    dayPrefix: "Phase",
    incomeNeedsTitle: "Opportunities you can develop",
    incomePathsTitle: "Additional career paths",
    priceFieldLabel: "Price",
    scheduleFieldLabel: "Course date",
    durationText: "5 days",
    hoursText: "20 training hours",
    instructorText: "Instructor",
    applicationsTitle: "Practical applications",
    trainerKicker: "Instructor",
    testimonialsEmpty: "Trainee feedback will be added soon.",
    ctas: {
      hero: "Understand the investment value",
      booking: "Contact us on WhatsApp",
      mobile: "Talk to the course team",
      registration: "Send registration request",
      income: "Take your first step toward lighting mastery",
      final: "Find out the next cohort date",
    },
  },
};
