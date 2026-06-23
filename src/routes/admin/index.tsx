import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BookOpen, CreditCard, MessageCircle, Star, Tag, Users } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import Reveal from "@/components/Reveal";
import { getAdminToken } from "@/lib/admin/session";

export const Route = createFileRoute("/admin/")({
  component: AdminHome,
});

const cards = [
  {
    to: "/admin/courses",
    title: "الدورات",
    desc: "إضافة وتعديل وحذف الدورات وكل تفاصيلها.",
    Icon: BookOpen,
  },
  {
    to: "/admin/pricing",
    title: "الأسعار",
    desc: "ضبط أسعار كل الدورات وتفعيل الشراء من مكان واحد.",
    Icon: Tag,
  },
  {
    to: "/admin/instructors",
    title: "المدربون",
    desc: "إدارة ملفات المدربين وربطهم بالدورات.",
    Icon: Users,
  },
  {
    to: "/admin/testimonials",
    title: "التقييمات",
    desc: "آراء العملاء والنجوم التي تظهر في الموقع.",
    Icon: Star,
  },
  {
    to: "/admin/assistant",
    title: "المساعد الذكي",
    desc: "اسم وصورة المساعد، الترحيب، وطلبات الزوار.",
    Icon: MessageCircle,
  },
  {
    to: "/admin/orders",
    title: "الطلبات والمدفوعات",
    desc: "مدفوعات PayPal وإعدادات بوابة الدفع.",
    Icon: CreditCard,
  },
] as const;

function AdminHome() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!getAdminToken()) {
      void navigate({ to: "/admin/login" });
      return;
    }
    setReady(true);
  }, [navigate]);

  if (!ready) {
    return (
      <AdminShell title="لوحة التحكم">
        <p className="text-muted-foreground">جاري التحميل…</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="لوحة التحكم">
      <p className="text-sm text-muted-foreground mb-6">
        مرحبًا بك في لوحة إدارة بيت المصور. اختر القسم الذي تريد إدارته.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {cards.map((card, i) => (
          <Reveal as="div" key={card.to} delay={(i % 3) * 90}>
            <Link
              to={card.to}
              className="group block h-full rounded-2xl border border-border/60 bg-card/40 p-6 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="size-12 rounded-xl bg-[image:var(--gradient-brand)] grid place-items-center mb-4">
                <card.Icon className="size-6 text-white" />
              </div>
              <h2 className="text-lg font-bold mb-1">{card.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </AdminShell>
  );
}
