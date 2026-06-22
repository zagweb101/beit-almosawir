import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import hero from "@/assets/hero.jpg";
import workshop from "@/assets/workshop.jpg";
import workBeauty from "@/assets/work-beauty.jpg";
import workWedding from "@/assets/work-wedding.jpg";
import workFood from "@/assets/work-food.jpg";
import workVideo from "@/assets/work-video.jpg";
import {
  Camera,
  Award,
  Users,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lightbulb,
  Heart,
  Utensils,
  Film,
  Smartphone,
  GraduationCap,
} from "lucide-react";
import { useT } from "@/lib/i18n";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import nanliteLogo from "@/assets/partner-nanlite.png";
import neomLogo from "@/assets/partner-neom.png";
import ubtLogo from "@/assets/partner-ubt.jpg";
import kauLogo from "@/assets/partner-kau.png";
import sonyLogo from "@/assets/partner-sony.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "بيت المصور — الملف التعريفي الرسمي" },
      {
        name: "description",
        content:
          "أول أكاديمية متخصصة لتعليم التصوير في المملكة العربية السعودية. مدربون معتمدون. أكثر من 5,000 متدرب.",
      },
      { property: "og:title", content: "أكاديمية بيت المصور" },
      {
        property: "og:description",
        content: "أول أكاديمية متخصصة لتعليم التصوير في المملكة العربية السعودية.",
      },
    ],
  }),
  component: Home,
});

const works = [{ src: workBeauty }, { src: workWedding }, { src: workFood }, { src: workVideo }];

const serviceIcons = [Camera, Lightbulb, Heart, Heart, Utensils, Film, Smartphone, GraduationCap];

type LogoTone = "light" | "dark" | "color";
const partners: { name: string; logo: string; tone: LogoTone }[] = [
  { name: "NANLITE", logo: nanliteLogo, tone: "dark" },
  { name: "SONY", logo: sonyLogo, tone: "dark" },
  { name: "NEOM", logo: neomLogo, tone: "color" },
  { name: "King Abdulaziz University", logo: kauLogo, tone: "color" },
  { name: "University of Business & Technology", logo: ubtLogo, tone: "dark" },
];

const logoSurface: Record<LogoTone, string> = {
  light: "bg-card/30",
  dark: "bg-white",
  color: "bg-white",
};

function Home() {
  const { t, lang } = useT();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  const h = t.home;
  const a = t.about;
  const s = t.services;
  const ach = t.achievements;
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={hero}
            alt=""
            className="w-full h-full object-cover opacity-40"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        </div>
        <div className="relative container mx-auto px-6 py-28 md:py-40 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-xs mb-6">
            <Sparkles className="size-3.5 text-primary" />
            <span>{h.badge}</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold leading-tight">
            {h.h1a} <span className="text-gradient">{h.h1b}</span>
            <br />
            {h.h1c}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            {h.lead}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#services"
              className="btn-hero inline-flex items-center gap-2 px-7 py-3.5 rounded-md font-semibold"
            >
              {h.ctaServices} <Arrow className="size-4" />
            </a>
            <a
              href="#about"
              className="btn-outline-brand inline-flex items-center px-7 py-3.5 rounded-md font-semibold"
            >
              {h.ctaPartner}
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="container mx-auto px-6 py-24 grid md:grid-cols-2 gap-14 items-center scroll-mt-20"
      >
        <div>
          <div className="text-sm text-primary tracking-widest mb-3">{a.kicker}</div>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            {h.whoTitleA} <span className="text-gradient">{h.whoTitleB}</span>
          </h2>
          <div className="space-y-5 text-muted-foreground leading-loose mt-6">
            <p>
              <span className="text-foreground font-semibold">{a.p1brand}</span>
              {a.p1}
            </p>
            <p>{a.p2}</p>
            <p>
              {a.p3a}
              <span className="text-foreground font-semibold">{a.p3strong}</span>
              {a.p3b}
            </p>
          </div>
          <ul className="mt-6 space-y-3 text-sm">
            {h.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" /> <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-brand opacity-30 blur-2xl" />
          <img
            src={workshop}
            alt="workshop"
            loading="lazy"
            width={1600}
            height={1024}
            className="relative rounded-2xl shadow-elegant"
          />
        </div>
      </section>

      {/* VISION/MISSION/VALUES */}
      <section className="container mx-auto px-6 pb-8">
        <div className="grid md:grid-cols-3 gap-6">
          {a.cards.map((c) => (
            <div key={c.t} className="card-elegant rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gradient">{c.t}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PILLARS */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {h.pillars.map((p, i) => {
            const Icon = [Camera, Users, Award][i];
            return (
              <div
                key={p.title}
                className="card-elegant rounded-2xl p-8 hover:translate-y-[-4px] transition-transform"
              >
                <div className="size-12 rounded-xl bg-gradient-brand grid place-items-center mb-5 glow">
                  <Icon className="size-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{p.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="container mx-auto px-6 py-24 scroll-mt-20">
        <div className="text-sm text-primary tracking-widest mb-3">{s.kicker}</div>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">{s.title}</h2>
        <p className="mt-5 text-muted-foreground max-w-2xl text-lg">{s.lead}</p>
        <div className="divider-brand my-10" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {s.items.map((item, i) => {
            const Icon = serviceIcons[i];
            const coursePath =
              i === 0
                ? "/courses/photography-fundamentals"
                : i === 1
                  ? "/courses/lighting-mastery"
                  : i === 2
                    ? "/courses/beauty-photography"
                    : i === 3
                      ? "/courses/wedding-photography"
                      : null;
            const cardClass =
              "card-elegant rounded-2xl p-7 hover:translate-y-[-4px] transition-transform block h-full";
            const content = (
              <>
                <div className="size-12 rounded-xl bg-gradient-brand grid place-items-center mb-5 glow">
                  <Icon className="size-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </>
            );

            if (coursePath) {
              return (
                <Link key={item.title} to={coursePath} className={cardClass}>
                  {content}
                </Link>
              );
            }

            return (
              <div key={item.title} className={cardClass}>
                {content}
              </div>
            );
          })}
        </div>

        <div className="mt-16 card-elegant rounded-2xl p-10 md:p-14">
          <h3 className="text-3xl font-bold">{s.corpTitle}</h3>
          <p className="mt-4 text-muted-foreground leading-loose max-w-3xl">{s.corpText}</p>
          <CorporateForm />
        </div>
      </section>

      {/* WORK SHOWCASE */}
      <section className="container mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="text-sm text-primary tracking-widest mb-3">{h.workKicker}</div>
          <h2 className="text-3xl md:text-5xl font-bold">{h.workTitle}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {works.map((w, i) => (
            <div key={i} className="group relative aspect-[3/4] overflow-hidden rounded-xl">
              <img
                src={w.src}
                alt=""
                loading="lazy"
                width={1024}
                height={1280}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" className="container mx-auto px-6 py-24 scroll-mt-20">
        <div className="text-sm text-primary tracking-widest mb-3">{ach.kicker}</div>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">{ach.title}</h2>
        <div className="divider-brand my-10" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {ach.stats.map((st) => (
            <div key={st.l} className="card-elegant rounded-2xl p-4 sm:p-8 text-center min-w-0">
              <div
                dir="ltr"
                className="text-[clamp(1.9rem,8.7vw,3rem)] md:text-5xl leading-none font-bold text-gradient whitespace-nowrap tabular-nums"
              >
                {st.v}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{st.l}</div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="flex items-end justify-between flex-wrap gap-3">
            <div>
              <div className="text-sm text-primary tracking-widest mb-3">{h.partnersKicker}</div>
              <h3 className="text-2xl md:text-4xl font-bold">{ach.partnersTitle}</h3>
              <p className="mt-3 text-muted-foreground max-w-2xl">{ach.partnersText}</p>
            </div>
          </div>
          <div className="divider-brand my-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {partners.map((p) => (
              <div
                key={p.name}
                title={p.name}
                className="group relative rounded-2xl overflow-hidden border border-border/50 bg-card/40 backdrop-blur-sm hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 shadow-elegant"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "var(--gradient-brand)", filter: "blur(40px)" }}
                />
                <div
                  className={`relative aspect-[5/3] flex items-center justify-center p-6 ${logoSurface[p.tone]}`}
                >
                  <img
                    src={p.logo}
                    alt={`${p.name} logo`}
                    loading="lazy"
                    className="max-h-20 md:max-h-24 w-auto max-w-[80%] object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="relative px-4 py-3 text-center text-xs md:text-sm font-medium text-foreground/90 border-t border-border/40 bg-card/60">
                  {p.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl md:text-3xl font-bold">{ach.testimonialsTitle}</h3>
          <div className="mt-8 grid md:grid-cols-2 gap-5">
            {ach.testimonials.map((tt) => (
              <div key={tt.n} className="card-elegant rounded-2xl p-8">
                <p className="text-foreground/90 leading-relaxed">"{tt.q}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gradient-brand grid place-items-center text-white font-bold">
                    {tt.n.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{tt.n}</div>
                    <div className="text-xs text-muted-foreground">{tt.r}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 card-elegant rounded-2xl p-10 md:p-14">
          <h3 className="text-2xl md:text-3xl font-bold">{ach.visionTitle}</h3>
          <p className="mt-4 text-muted-foreground leading-loose max-w-3xl">{ach.visionText}</p>
        </div>
      </section>
    </>
  );
}

function CorporateForm() {
  const { t } = useT();
  const s = t.services;
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      s.formIntro,
      `${s.formCompany}: ${company}`,
      `${s.formName}: ${name}`,
      `${s.formPhone}: ${phone}`,
      `${s.formService}: ${service}`,
    ];
    window.open(buildWhatsAppUrl(lines.join("\n")), "_blank");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid md:grid-cols-2 gap-4">
      <input
        required
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder={s.formCompany}
        className="rounded-lg bg-background/60 border border-border/50 px-4 py-3 text-sm focus:outline-none focus:border-primary"
      />
      <input
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={s.formName}
        className="rounded-lg bg-background/60 border border-border/50 px-4 py-3 text-sm focus:outline-none focus:border-primary"
      />
      <input
        required
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder={s.formPhone}
        className="rounded-lg bg-background/60 border border-border/50 px-4 py-3 text-sm focus:outline-none focus:border-primary"
      />
      <textarea
        required
        value={service}
        onChange={(e) => setService(e.target.value)}
        placeholder={s.formService}
        rows={3}
        className="md:col-span-2 rounded-lg bg-background/60 border border-border/50 px-4 py-3 text-sm focus:outline-none focus:border-primary"
      />
      <button
        type="submit"
        className="btn-hero md:col-span-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md font-semibold"
      >
        {s.formSend}
      </button>
    </form>
  );
}
