import type { CourseLandingData } from "@/types/course";
import {
  weddingPhotographyGalleryImages,
  weddingPhotographyHeroImage,
  weddingPhotographyTrainerImage,
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
  weddingSession: "Professional wedding photography at Bayt Al Mosawer Academy",
  weddingSimulation: "Realistic wedding session simulation in the studio",
  weddingVideo: "Wedding video shooting with a gimbal during the workshop",
};

export const weddingPhotographyCourseEn: CourseLandingData = {
  slug: "wedding-photography",
  name: "Wedding Photography",
  badge: "3 in-person days · Jeddah",
  heroImage: weddingPhotographyHeroImage,
  heroImageAlt:
    "Wedding photography workshop with hands-on practice at Bayt Al Mosawer Academy in Jeddah",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Wedding Photography" },
  ],
  heroTitle: "Wedding photography is not a shot… it is a moment that cannot be replaced",
  heroTitleHighlight: "Wedding Photography",
  heroSubtitle:
    "With photographer Ahmed Zaghloul, learn everything from A to Z: lighting, angles, documenting details and real emotions on the most important day — with daily hands-on practice in a realistic simulated environment.",
  heroDescription:
    "Bayt Al Mosawer's wedding photography workshop: document moments with confidence, handle difficult lighting, present the bride and groom at their best, and think like a professional on wedding day — photo, video, and editing.",
  heroPitchLine:
    "Your chance to start right in wedding photography — book your spot before seats fill up.",
  heroPrimaryCta: "Book your spot now",
  heroSecondaryCta: "Explore workshop topics",
  heroSecondaryCtaTarget: "#curriculum",
  whatsappBookingMessage:
    "Hello, I would like to register for the Wedding Photography course with photographer Ahmed Zaghloul. I would like to know the price, the next cohort date, and registration requirements.",
  trustBar: [
    { text: "3 in-person days" },
    { text: "Photo · Video · Editing" },
    { text: "Realistic wedding simulation" },
    { text: "Edit your own photos" },
    { text: "Certificate + follow-up" },
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
    title: "Wedding Photography Course in Jeddah | Bayt Al Mosawer Academy",
    description:
      "A 3-day wedding photography workshop: preparation, lighting, flash, hands-on practice, video, editing, and marketing — with photographer Ahmed Zaghloul in Jeddah.",
    canonicalPath: "/courses/wedding-photography",
    ogTitle: "Wedding Photography Course in Jeddah | Bayt Al Mosawer Academy",
    ogDescription:
      "A 3-day wedding photography workshop: preparation, lighting, flash, hands-on practice, video, editing, and marketing — with photographer Ahmed Zaghloul in Jeddah.",
  },
  quickFacts: [
    { icon: "Calendar", label: "Duration", value: "3 days" },
    { icon: "Clock", label: "Content", value: "Photo · Video · Editing" },
    { icon: "GraduationCap", label: "Level", value: "Beginner to intermediate" },
    { icon: "MapPin", label: "Format", value: "In-person" },
    { icon: "Building2", label: "Location", value: "Jeddah" },
    { icon: "User", label: "Instructor", value: "Ahmed Zaghloul" },
  ],
  problem: {
    question:
      "Do you dream of wedding photography… but fear missing the moment or failing in hall lighting?",
    before: [
      { text: "Anxiety about missing a once-in-a-lifetime moment" },
      { text: "Difficulty with hall lighting and mixed color temperatures" },
      { text: "Not knowing camera settings for dress and fine details" },
      { text: "Weak flash control with ambient hall light" },
      { text: "No clear plan before shoot day" },
      { text: "Struggling with fast shots during the ceremony" },
      { text: "No video or Reels offered with photography service" },
      { text: "Not knowing how to price or market your service" },
      { text: "A weak portfolio that does not convince brides to book" },
    ],
    after: [
      { text: "Document the day's key moments with confidence" },
      { text: "Handle difficult lighting and fast shots" },
      { text: "Present the bride and groom at their best" },
      { text: "Think like a professional on wedding day" },
      { text: "Artistic detail shots: perfume, incense, jewelry, dress, bouquet" },
      { text: "Low-light experience inside the hall" },
      { text: "Gimbal video · Slow Motion · Reels · Storyline" },
      { text: "Lightroom · Photoshop · Premiere · brand building" },
    ],
  },
  whyStart: {
    kicker: "Why this workshop?",
    title: "Because those who shoot weddings right build a name and service that match their level",
    lead: "Wedding day does not repeat. In 3 days you move from uncertainty to a clear path: from preparation and lighting to hands-on practice, editing, and marketing — under direct supervision from a professional photographer.",
    cards: [
      {
        title: "A moment that cannot be replaced",
        description:
          "Learn to document emotions and details in the toughest lighting and time conditions.",
      },
      {
        title: "Photo + video in one workshop",
        description: "Photo, video, Reels, and editing — the full service today's market expects.",
      },
      {
        title: "Daily realistic practice",
        description: "Full wedding session simulation inside Bayt Al Mosawer — not theory only.",
      },
      {
        title: "From shooting to marketing",
        description:
          "Leave with a portfolio, pricing, and publishing plan — not just camera skills.",
      },
    ],
  },
  learnOutcomes: {
    kicker: "What will you learn?",
    title: "What will you leave with after 3 days?",
    items: [
      {
        text: "Understanding wedding types (luxury · bohemian · family · outdoor) and style differences",
      },
      { text: "Pre-shoot preparation: meeting · schedule · gear prep" },
      { text: "Time management during the day and inside the hall" },
      { text: "Choosing cameras and lenses for each wedding stage" },
      { text: "Flash vs. continuous light and when to use each" },
      { text: "Ideal settings for dress and fine detail photography" },
      { text: "Ideal lighting angles for bride and decor" },
      { text: "Artistic shots: perfume spray, incense, jewelry, dress, bouquet" },
      { text: "Controlling flashes with hall ambient light" },
      { text: "Full simulated wedding session with varied lighting and low light" },
      { text: "Gimbal video · Slow Motion · Reels · cinematic movements" },
      { text: "Lightroom · Photoshop · Premiere · brand building and pricing" },
    ],
  },
  curriculum: {
    kicker: "Workshop topics",
    title: "Wedding photography workshop topics — 3 days",
    modules: [
      {
        number: 1,
        title: "Day 1: Preparation — Lighting — Flash",
        description:
          "From understanding weddings to gear, settings, and creative lighting — with hands-on practice inside Bayt Al Mosawer.",
        topics: [
          "Axis 1: Wedding types and how photography style differs",
          "Pre-shoot preparation: meeting · schedule · gear prep",
          "Time management during the day and inside the hall",
          "Axis 2: Best cameras and lenses for each stage",
          "Flash vs. continuous light and when to use each",
          "Ideal camera settings for dress and fine details",
          "Axis 3: Ideal lighting angles for bride and decor",
          "Artistic shots: perfume · incense · jewelry · dress · bouquet",
          "Controlling flashes with hall ambient light",
          "Live hands-on practice inside Bayt Al Mosawer",
        ],
      },
      {
        number: 2,
        title: "Day 2: Full Practical Application",
        description:
          "Full wedding simulation + gimbal video, Reels, and Storyline — daily practice in a realistic environment.",
        topics: [
          "Axis 4: Real wedding photo session (full simulation)",
          "Dividing into groups",
          "Photographing model in real wedding decor (lighting · decor · bouquet · dress)",
          "Full experience photographing bride with different lighting",
          "Low-light experience inside hall and mixed lighting colors",
          "Exposure control during ceremony without stopping shooting",
          "Video shooting with a gimbal",
          "Slow Motion for detail shots",
          "Reels during workshop to promote your services",
          "Simple cinematic camera movements",
          "Storyline to photograph the wedding day sequentially",
        ],
      },
      {
        number: 3,
        title: "Day 3: Editing and Photo Retouching",
        description:
          "From Lightroom and Photoshop to Premiere — then brand building and marketing.",
        topics: [
          "Axis 5: Lightroom processing (colors · lighting · correction)",
          "Photoshop retouch preserving natural skin texture",
          "Saving images for print and social media",
          "Axis 6: Editing Reels in Adobe Premiere",
          "Music and transitions · color correction",
          "Axis 7: Building a strong wedding photographer identity",
          "Professional portfolio · pricing · client offers",
          "Effective ad ideas for Instagram and Snapchat",
        ],
      },
    ],
  },
  practical: {
    title: "Daily hands-on shooting… in a realistic simulated environment",
    description:
      "Every day you apply what you learn: from flash and lighting setup to a full wedding session and editing the photos you shot yourself.",
    steps: [
      { text: "Session planning" },
      { text: "Camera and flash setup" },
      { text: "Detail and bride photography" },
      { text: "Low light in the hall" },
      { text: "Gimbal video shooting" },
      { text: "Reels and Storyline" },
      { text: "Lightroom and Photoshop" },
      { text: "Premiere and marketing" },
    ],
    applicationsTitle: "Workshop pillars",
    applications: [
      { text: "Planning and preparation" },
      { text: "Photography" },
      { text: "Video shooting" },
      { text: "Editing and marketing" },
    ],
  },
  investment: {
    title: "3 days that can change your level in the wedding market",
    lead: "Instead of learning on a client's reputation, compress the path into an intensive workshop — and leave with skills, portfolio, and marketing plan you use immediately.",
    beforeTitle: "Staying unprepared for wedding day",
    afterTitle: "Investing in the wedding workshop",
    before: [
      { text: "Fear of missing the moment in front of the bride" },
      { text: "Repeated failure in hall lighting" },
      { text: "Photo-only service without video" },
      { text: "Not knowing how to price or present an offer" },
      { text: "A portfolio that does not match your name" },
    ],
    after: [
      { text: "Confidence documenting wedding day" },
      { text: "Flash mastery with hall ambient light" },
      { text: "Photo + video + Reels package" },
      { text: "Portfolio from the workshop" },
      { text: "Clear pricing and marketing plan" },
      { text: "Free WhatsApp follow-up after the workshop" },
    ],
    highlightQuote: "Those who shoot weddings right… build a name that matches their level.",
  },
  valuePurchase: {
    title: "You are not buying 3 days only",
    cards: [
      {
        title: "Daily realistic practice",
        description: "Hands-on shooting inside a real wedding simulation — every day.",
      },
      {
        title: "Photo + video",
        description: "Learn photography, video, and editing in one workshop.",
      },
      {
        title: "Edit your own photos",
        description: "Lightroom · Photoshop · Premiere — on work you shot yourself.",
      },
      {
        title: "Post-workshop follow-up",
        description: "Free WhatsApp group with the instructor for consultations.",
      },
      {
        title: "Attendance certificate",
        description: "Certificate from Bayt Al Mosawer Academy.",
      },
      {
        title: "Ready portfolio",
        description: "Workshop images to build your wedding photographer identity.",
      },
    ],
  },
  income: {
    title: "How can the wedding workshop raise the value of your service?",
    lead: "The wedding market rewards photographers who deliver photo + video + editing + a clear identity. Results depend on your application, marketing, and pricing.",
    requirements: [
      { text: "Full wedding coverage (photo + video)" },
      { text: "Engagement and event sessions" },
      { text: "Reels and Storyline for brides" },
      { text: "Dress and jewelry detail photography" },
      { text: "Multiple packages for brides" },
    ],
    opportunities: [
      { text: "Building a wedding photographer brand" },
      { text: "Collaboration with event planners" },
      { text: "Instagram and Snapchat ads" },
      { text: "Upgrading your current photography service" },
      { text: "A portfolio that attracts the next bride" },
    ],
    disclaimer:
      "The workshop does not guarantee immediate income, but it gives you skills, content, and tools to offer a paid service with greater confidence.",
  },
  roi: {
    title: "When can you recover your investment?",
    text: "It depends on the workshop price, your package pricing, and your market. One wedding package or a limited number of sessions may cover the investment — if you apply what you learned and present your work professionally.",
    example:
      "A wedding photographer offering a package priced appropriately for their market may recover the workshop cost from one contract or several sessions — depending on service level and marketing.",
    disclaimer:
      "Illustrative example, not a guaranteed income outcome. Results depend on application, pricing, marketing, and market.",
  },
  audience: {
    title: "Who is this workshop for?",
    groups: [
      { text: "Those entering wedding photography" },
      { text: "Portrait photographers expanding their services" },
      { text: "Those who want to offer photo + video to brides" },
      { text: "Those who fear hall lighting and low light" },
      { text: "Those who want a professional portfolio quickly" },
      { text: "Those who want to learn pricing and marketing" },
      { text: "Content creators in the wedding space" },
      { text: "Those who want to start under professional supervision" },
    ],
    experienceQuestion: "Do I need prior experience?",
    experienceAnswer:
      "Basic camera and exposure knowledge is preferred. The workshop takes you from understanding weddings to hands-on practice, editing, and marketing.",
  },
  timeline: {
    title: "Workshop plan — 3 days",
    days: [
      {
        day: 1,
        title: "Preparation · Lighting · Flash",
        description: "Weddings · gear · settings · details · hands-on practice.",
        draft: false,
      },
      {
        day: 2,
        title: "Full practical application",
        description: "Wedding simulation · low light · video · Reels · Storyline.",
        draft: false,
      },
      {
        day: 3,
        title: "Editing · Brand · Marketing",
        description: "Lightroom · Photoshop · Premiere · pricing · ads.",
        draft: false,
      },
    ],
  },
  registrationBenefits: {
    title: "Workshop features",
    items: [
      { text: "Daily hands-on shooting in a realistic simulated bride environment" },
      { text: "Learn photo and video in one workshop" },
      { text: "Direct editing of the photos you shot yourself" },
      { text: "Free post-workshop follow-up via WhatsApp with the instructor" },
      { text: "Attendance certificate from Bayt Al Mosawer Academy" },
      { text: "3 in-person days in the studio" },
    ],
  },
  trainer: {
    name: "Photographer Ahmed Zaghloul",
    specialty: "Wedding · Portrait · Video · Studio lighting",
    image: weddingPhotographyTrainerImage,
    imageAlt: "Photographer Ahmed Zaghloul — Wedding Photography workshop instructor",
    todoNote: "TODO: Add approved photo and bio for photographer Ahmed Zaghloul.",
  },
  gallery: {
    kicker: "Training atmosphere",
    title: "Images from the wedding photography workshop",
    images: weddingPhotographyGalleryImages.map(({ src, altKey }) => ({
      src,
      alt: galleryAlts[altKey],
    })),
  },
  testimonials: {
    kicker: "Trainee feedback",
    title: "Bayt Al Mosawer trainee experiences",
    note: "Real feedback from academy trainees.",
    items: [...testimonials],
  },
  priceObjection: {
    title: "Every day you wait… a bride opportunity passes you by",
    lead: "The workshop is limited in seats to ensure real hands-on practice. Do not wait for the «perfect time» — start now and build a portfolio that convinces your first bride.",
    cards: [
      {
        title: "The cost of missed opportunities",
        description:
          "Every bride who chooses another photographer — an opportunity that rarely returns the same way.",
      },
      {
        title: "The cost of weak reputation",
        description: "One mistake on wedding day may cost more than the workshop price.",
      },
      {
        title: "The cost of staying unprepared",
        description:
          "Without hands-on practice you may turn down opportunities you cannot accept with confidence.",
      },
    ],
    highlightQuote: "Do not miss the opportunity — we are waiting for you at Bayt Al Mosawer.",
    cta: {
      title: "Book your spot before seats fill up",
      description:
        "Contact us on WhatsApp now for price and schedule — one step away from starting right in wedding photography.",
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
          "Fully practical — daily shooting inside a realistic wedding simulation, plus video and editing.",
      },
      {
        question: "Will I learn video shooting?",
        answer: "Yes. Day 2 covers gimbal · Slow Motion · Reels · Storyline.",
      },
      {
        question: "Will I learn editing?",
        answer: "Yes. Day 3 covers Lightroom · Photoshop · Adobe Premiere.",
      },
      {
        question: "Do I get a certificate?",
        answer: "Yes. An attendance certificate from Bayt Al Mosawer Academy.",
      },
      {
        question: "Is there follow-up after the workshop?",
        answer: "Yes. Free follow-up via WhatsApp with the instructor.",
      },
      {
        question: "Do I need prior experience?",
        answer:
          "Basic camera and exposure knowledge is preferred. The workshop suits those entering or advancing in wedding photography.",
      },
      {
        question: "How do I find out the price and schedule?",
        answer:
          "Contact the Bayt Al Mosawer team via WhatsApp for pricing and the next cohort date.",
      },
    ],
  },
  finalCta: {
    title: "Experience wedding photography professionally",
    description:
      "3 days · realistic simulation · photo · video · editing · marketing — book before seats fill up.",
    investmentLine: "We are waiting for you at Bayt Al Mosawer Academy — Jeddah.",
    buttonLabel: "Book your spot now",
    trustNote: "Contact us on WhatsApp for price, schedule, and registration requirements.",
  },
  incomeCta: {
    title: "Enter wedding photography and deliver work that matches your name",
    buttonLabel: "Start now — book your spot",
  },
  booking: {
    limitedSeatsNote: "Limited seats to ensure hands-on practice for every trainee",
  },
  ui: {
    seoH1: "Wedding Photography Course in Jeddah",
    heroMobileStats: "3 days · Photo · Video",
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
    hoursText: "Photo · video · editing",
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
