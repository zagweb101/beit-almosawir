import type { CourseLandingData } from "@/types/course";
import { photographyFundamentalsGalleryImages, photographyFundamentalsOgImage } from "./shared";

const academyTestimonials = [
  {
    name: "Haneen",
    role: "Trainee — Beauty Photography",
    quote:
      "Bayt Al Mosawer truly is a home for every photographer. The trainer is collaborative, respectful, and faithful in delivering knowledge.",
  },
  {
    name: "Mashael Almeshal",
    role: "Professional photographer",
    quote:
      "One of the most beautiful training workshops. Great organization and attention to the smallest details. I recommend it to everyone.",
  },
  {
    name: "Nouf",
    role: "Trainee — Mastering Lighting",
    quote:
      "A very professional academy and a capable trainer. I felt every riyal I paid came back to me multiplied.",
  },
] as const;

const galleryAlts: Record<string, string> = {
  workshop: "Trainees practicing photography skills inside a Bayt Al Mosawer workshop",
  beauty: "Hands-on portrait photography practice inside the studio",
  video: "Training session for video and lighting techniques",
  wedding: "Practical photography training in a real-world setting",
  food: "Product and food photography workshop",
  studio: "Professional training environment at Bayt Al Mosawer Academy",
};

export const photographyFundamentalsCourseEn: CourseLandingData = {
  slug: "photography-fundamentals",
  name: "Photography Fundamentals",
  badge: "In-person course for beginners",
  heroImage: photographyFundamentalsOgImage,
  heroImageAlt: "Trainees in a photography workshop at Bayt Al Mosawer Academy in Jeddah",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Photography Fundamentals" },
  ],
  heroTitle: "Don't let the camera choose for you",
  heroTitleHighlight: "Learn photography fundamentals",
  heroSubtitle: "and start creating images you understand and control",
  heroDescription:
    "A hands-on course that takes you from confusion in front of camera settings to a clear understanding of exposure, lenses, composition, and depth of field — so you can shoot with confidence and build a real foundation to grow your skills or enter the freelance market.",
  heroPrimaryCta: "Get the date & price",
  heroSecondaryCta: "View course modules",
  heroSecondaryCtaTarget: "#curriculum",
  whatsappBookingMessage:
    "Hello, I would like to register for the Photography Fundamentals course. I would like to know the upcoming date, price, and details.",
  trustItems: [],
  trustBar: [
    { text: "In-person training in Jeddah" },
    { text: "Beginner-friendly" },
    { text: "Hands-on practice" },
    { text: "WhatsApp follow-up" },
  ],
  durationDays: 4,
  totalHours: 16,
  dailyHours: 4,
  level: "Beginner",
  trainingType: "In-person",
  location: "Jeddah",
  priceLabel: "Contact us for pricing and available offers",
  scheduleLabel: "The next cohort date will be announced soon",
  seo: {
    title: "Photography Fundamentals Course in Jeddah | Bayt Al Mosawer Academy",
    description:
      "Learn photography fundamentals, manual camera control, lenses, composition, and depth of field over 4 days and 16 training hours at Bayt Al Mosawer Academy in Jeddah.",
    canonicalPath: "/courses/photography-fundamentals",
    ogTitle: "Photography Fundamentals Course in Jeddah | Bayt Al Mosawer Academy",
    ogDescription:
      "Learn photography fundamentals, manual camera control, lenses, composition, and depth of field over 4 days and 16 training hours at Bayt Al Mosawer Academy in Jeddah.",
  },
  quickFacts: [
    { icon: "Calendar", label: "Duration", value: "4 days" },
    { icon: "Clock", label: "Hours", value: "16 hours" },
    { icon: "GraduationCap", label: "Level", value: "Beginner" },
    { icon: "MapPin", label: "Format", value: "In-person" },
    { icon: "Building2", label: "Location", value: "Jeddah" },
    { icon: "MessageCircle", label: "Support", value: "WhatsApp group" },
  ],
  problem: {
    question: "Do you own a good camera but your results don't match what you imagine?",
    before: [
      { text: "Relying entirely on Auto mode" },
      { text: "Dark or overexposed photos" },
      { text: "Not understanding lenses" },
      { text: "Not knowing why the background looks blurred or sharp" },
      { text: "Difficulty controlling settings" },
      { text: "Copying others' photos without understanding how they were made" },
      { text: "Fear of camera buttons and menus" },
    ],
    after: [
      { text: "Understanding how the camera works" },
      { text: "Controlling exposure" },
      { text: "Choosing the right lens" },
      { text: "Building a stronger frame" },
      { text: "Controlling depth of field" },
      { text: "Knowing why a photo succeeds or fails" },
      { text: "Ability to keep learning on a solid foundation" },
    ],
  },
  whyStart: {
    kicker: "Why start with this course?",
    title: "Start photography on the right foundation",
    lead: "Buying a new camera or lens is not enough to improve your photos. The right foundation saves months of random trial and gives you understanding you can build on in any specialty later.",
    cards: [
      {
        title: "Understand the camera instead of memorizing settings",
        description:
          "Learn why the image changes when you adjust each setting — not just memorize numbers.",
      },
      {
        title: "Shoot with intent, not by accident",
        description: "Know how to choose the right settings before you press the shutter.",
      },
      {
        title: "Build a foundation you can grow from",
        description: "A clear base that helps you move into advanced specialties later.",
      },
      {
        title: "Shorten the path of random experimentation",
        description: "Avoid common beginner mistakes that can last for months.",
      },
    ],
  },
  learnOutcomes: {
    kicker: "What will you learn?",
    title: "What will you learn in Photography Fundamentals?",
    items: [
      { text: "Operate the camera and handle it with confidence" },
      { text: "Understand the relationship between aperture, shutter speed, and ISO" },
      { text: "Achieve balanced exposure" },
      { text: "Choose the right lens for each type of photography" },
      { text: "Build stronger visual composition" },
      { text: "Control background blur and separation" },
      { text: "Use Manual mode" },
      { text: "Analyze mistakes and improve your images" },
    ],
  },
  curriculum: {
    kicker: "Course modules",
    title: "Course modules",
    modules: [
      {
        number: 1,
        title: "Photographic composition",
        description:
          "Learn how to arrange elements inside the frame and guide the viewer's eye to what matters most.",
      },
      {
        number: 2,
        title: "How the camera works",
        description:
          "Understand how the camera captures light and turns it into an image, and the role of each part.",
      },
      {
        number: 3,
        title: "Camera types and choosing the right camera",
        description: "Learn about different camera types and when each one fits your needs.",
      },
      {
        number: 4,
        title: "Lens types and choosing the right lens",
        description: "Understand lens characteristics and how they affect the final image.",
      },
      {
        number: 5,
        title: "Camera buttons, modes, and controls",
        description:
          "Get familiar with camera buttons, shooting modes, and using them confidently.",
      },
      {
        number: 6,
        title: "Correct exposure using Manual mode",
        description: "Control aperture, shutter speed, and ISO to achieve balanced exposure.",
      },
      {
        number: 7,
        title: "Understanding depth of field",
        description: "Control foreground and background sharpness to serve your image idea.",
      },
    ],
  },
  practical: {
    title: "You won't just watch… you'll practice yourself",
    description:
      "During training you apply concepts on the camera, review results, and understand why each setting works or what needs adjustment.",
    steps: [
      { text: "Concept explanation" },
      { text: "Watch the demonstration" },
      { text: "Trainee practice" },
      { text: "Review results" },
      { text: "Correct mistakes" },
      { text: "Try again" },
    ],
  },
  income: {
    title: "How can photography skills become an income opportunity?",
    lead: "This course gives you the foundation to keep developing. Earning from photography requires continued training, building a portfolio, and choosing the right specialty.",
    requirements: [
      { text: "Continued training and skill development" },
      { text: "Building a portfolio that reflects your level" },
      { text: "Choosing a specialty that fits your interest and market" },
      { text: "Marketing your service and communicating with clients" },
      { text: "Professional handling of client requests" },
    ],
    opportunities: [
      { text: "Personal portrait sessions" },
      { text: "Product photography for small businesses" },
      { text: "Social media content creation" },
      { text: "Event photography" },
      { text: "Restaurant and café photography" },
      { text: "Working as an assistant photographer" },
      { text: "Creating visual content for your own business" },
    ],
    disclaimer:
      "This course does not promise immediate income, but it gives you the foundation to develop a skill that can become a paid professional service.",
  },
  audience: {
    title: "Who is this course for?",
    groups: [
      { text: "Anyone who bought a camera and doesn't know how to use it" },
      { text: "Beginners in photography" },
      { text: "Content creators" },
      { text: "Small business owners" },
      { text: "Those interested in entering the photography field" },
      { text: "Anyone who relies on Auto mode" },
      { text: "Those who want to understand photography before choosing a specialty" },
      { text: "Mobile photographers ready to move to a dedicated camera" },
    ],
    experienceQuestion: "Do I need prior experience?",
    experienceAnswer:
      "No. The course is designed to start from the basics and build your understanding step by step.",
  },
  timeline: {
    title: "Your four-day learning journey",
    days: [
      {
        day: 1,
        title: "Understanding the camera, its types, and control buttons",
        description:
          "Build a clear understanding of how cameras work, their types, and basic handling.",
        draft: true,
      },
      {
        day: 2,
        title: "Lenses, exposure, and Manual mode",
        description: "Explore lenses and set exposure using Manual mode.",
        draft: true,
      },
      {
        day: 3,
        title: "Composition, depth of field, and applications",
        description: "Build stronger frames and control depth of field with practical exercises.",
        draft: true,
      },
      {
        day: 4,
        title: "Hands-on practice and results review",
        description:
          "Apply everything you've learned in practical sessions and review results with the trainer.",
        draft: true,
      },
    ],
  },
  registrationBenefits: {
    title: "Registration benefits",
    items: [
      { text: "16 training hours" },
      { text: "Beginner-friendly instruction" },
      { text: "Hands-on applications" },
      { text: "Progressive content" },
      { text: "Permanent WhatsApp group with the trainer for questions and discussion" },
    ],
  },
  gallery: {
    kicker: "Training atmosphere",
    title: "Photos from our training sessions",
    images: photographyFundamentalsGalleryImages.map(({ src, altKey }) => ({
      src,
      alt: galleryAlts[altKey],
    })),
  },
  testimonials: {
    kicker: "Trainee feedback",
    title: "Bayt Al Mosawer trainee experiences",
    note: "General feedback from academy trainees — not specifically attributed to Photography Fundamentals.",
    items: [...academyTestimonials],
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        question: "Is this course suitable for someone with no experience?",
        answer:
          "Yes. The course is designed for beginners and starts with understanding the camera and basic controls.",
      },
      {
        question: "Do I need a professional camera?",
        answer:
          "It is best to bring the camera you use for practice. Contact the academy to confirm requirements for the upcoming cohort.",
      },
      {
        question: "Will I learn to use Manual mode?",
        answer: "Yes. Setting correct exposure using Manual mode is one of the course modules.",
      },
      {
        question: "How long is the course?",
        answer: "Four days, 16 training hours total, four hours per day.",
      },
      {
        question: "Is the course theoretical or practical?",
        answer:
          "The course combines instruction and hands-on practice so you understand settings and see their effect on the image.",
      },
      {
        question: "Will this course help me work in photography?",
        answer:
          "It gives you the foundation to keep developing and building a portfolio. Reaching professional work requires continued training, choosing a specialty, and good marketing.",
      },
      {
        question: "How do I find out the date and price?",
        answer:
          "Contact the Bayt Al Mosawer team directly on WhatsApp to learn about the next cohort date and available offers.",
      },
      {
        question: "What happens after the course ends?",
        answer:
          "You join a permanent WhatsApp group with the trainer for questions and discussion.",
      },
    ],
  },
  finalCta: {
    title: "Professional images start with understanding the basics",
    description:
      "Contact the Bayt Al Mosawer team to learn about the next cohort date, pricing, and available offers.",
    buttonLabel: "Book the next cohort",
  },
  incomeCta: {
    title: "Start building a skill you can turn into a professional service",
    buttonLabel: "Take your first step",
  },
  booking: {
    limitedSeatsNote: "Seats are limited based on room capacity",
  },
  ui: {
    seoH1: "Photography Fundamentals Course in Jeddah",
    heroMobileStats: "4 days · 16 hours",
    problemKicker: "The challenge and the shift",
    beforeTitle: "Before the course",
    afterTitle: "After the course",
    timelineDraftNote:
      "* Day-by-day module distribution is preliminary and may be updated when the official schedule is confirmed.",
    dayPrefix: "Day",
    incomeNeedsTitle: "What you need after the course",
    incomePathsTitle: "Paths you can grow into",
    priceFieldLabel: "Price",
    scheduleFieldLabel: "Course date",
    durationText: "4 days",
    hoursText: "16 training hours",
    testimonialsEmpty: "Trainee testimonials will be added soon.",
    ctas: {
      hero: "Get the date & price",
      booking: "Book the next cohort",
      mobile: "Talk to the course team",
      registration: "Send registration request",
      income: "Take your first step",
      final: "Book the next cohort",
    },
  },
};
