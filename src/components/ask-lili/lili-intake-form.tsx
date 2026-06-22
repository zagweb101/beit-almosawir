import { useState, type FormEvent } from "react";
import { Sparkles } from "lucide-react";
import { useLili } from "@/lib/lili/context";

/**
 * نموذج عام للزوار (بدون تسجيل دخول): الاسم، الجوال، الإيميل، واختيار الدورة.
 * عند الإرسال يفتح المساعد «لي لي» ويعرض تفاصيل الدورة المختارة، ويحفظ بيانات الزائر.
 */
export default function LiliIntakeForm({ className = "" }: { className?: string }) {
  const { courses, settings, startCourseBriefing } = useLili();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [courseSlug, setCourseSlug] = useState("");
  const [error, setError] = useState("");

  if (!settings.leadFormEnabled) return null;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("من فضلك أدخل اسمك.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 9) {
      setError("من فضلك أدخل رقم جوال صحيحًا.");
      return;
    }
    if (settings.collectEmail && email.trim() && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setError("البريد الإلكتروني غير صحيح.");
      return;
    }
    if (!courseSlug) {
      setError("اختر الدورة التي تهمك.");
      return;
    }
    setError("");
    startCourseBriefing({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      courseSlug,
    });
  }

  return (
    <section
      className={`rounded-2xl border border-primary/30 bg-secondary/20 p-5 sm:p-7 ${className}`}
      dir="rtl"
    >
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="size-5 text-primary" />
        <h2 className="text-lg sm:text-xl font-bold">تعرّف على دورتك مع المساعد الذكي «لي لي»</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-5">
        اكتب بياناتك واختر الدورة، وسيعرض لك «لي لي» السعر والموعد والمكان وعدد الأيام وأبرز المحاور
        فورًا.
      </p>

      <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-4">
        <label className="block space-y-1.5">
          <span className="text-sm font-medium">الاسم</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="اسمك الكامل"
            className="w-full min-h-11 rounded-lg border border-border/60 bg-background px-3 text-sm"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium">رقم الجوال</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="05xxxxxxxx"
            inputMode="tel"
            dir="ltr"
            className="w-full min-h-11 rounded-lg border border-border/60 bg-background px-3 text-sm text-start"
          />
        </label>

        {settings.collectEmail ? (
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">البريد الإلكتروني (اختياري)</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              type="email"
              dir="ltr"
              className="w-full min-h-11 rounded-lg border border-border/60 bg-background px-3 text-sm text-start"
            />
          </label>
        ) : null}

        <label className="block space-y-1.5">
          <span className="text-sm font-medium">الدورة المهتم بها</span>
          <select
            value={courseSlug}
            onChange={(e) => setCourseSlug(e.target.value)}
            className="w-full min-h-11 rounded-lg border border-border/60 bg-background px-3 text-sm"
          >
            <option value="">— اختر الدورة —</option>
            {courses.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </label>

        {error ? <p className="text-sm text-destructive sm:col-span-2">{error}</p> : null}

        <button
          type="submit"
          className="sm:col-span-2 min-h-11 rounded-lg bg-[image:var(--gradient-brand)] text-primary-foreground text-sm font-semibold inline-flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
        >
          <Sparkles className="size-4" /> اعرض تفاصيل الدورة الآن
        </button>
      </form>
    </section>
  );
}
