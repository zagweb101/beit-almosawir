import { useState, type FormEvent } from "react";
import { useLili } from "@/lib/lili/context";
import type { LiliLeadPayload } from "@/types/lili";

export default function LiliLeadForm() {
  const { showLeadForm, leadCourseSlug, submitLead, pageContext } = useLili();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [schedule, setSchedule] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [error, setError] = useState("");

  if (!showLeadForm) return null;

  const slug = leadCourseSlug ?? pageContext.courseSlug;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || phone.replace(/\D/g, "").length < 9) {
      setError("أدخل اسمًا ورقم جوال صحيحًا.");
      return;
    }
    if (!privacy) {
      setError("يرجى الموافقة على سياسة الخصوصية.");
      return;
    }
    const payload: LiliLeadPayload = {
      name: name.trim(),
      phone: phone.trim(),
      courseSlug: slug,
      schedulePreference: schedule.trim() || undefined,
      contactMethod: "whatsapp",
      privacyAccepted: true,
    };
    const url = submitLead(payload);
    window.open(url, "_blank", "noopener,noreferrer");
    setError("");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-3 mb-2 p-3 rounded-xl border border-primary/30 bg-secondary/20 space-y-2"
    >
      <div className="text-sm font-semibold">طلب تسجيل</div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="الاسم"
        className="w-full min-h-10 rounded-lg border border-border/60 bg-background px-3 text-sm"
      />
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="رقم الجوال"
        inputMode="tel"
        className="w-full min-h-10 rounded-lg border border-border/60 bg-background px-3 text-sm"
      />
      <input
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
        placeholder="الموعد المفضل (اختياري)"
        className="w-full min-h-10 rounded-lg border border-border/60 bg-background px-3 text-sm"
      />
      <label className="flex items-start gap-2 text-xs text-muted-foreground">
        <input
          type="checkbox"
          checked={privacy}
          onChange={(e) => setPrivacy(e.target.checked)}
          className="mt-1"
        />
        أوافق على مشاركة بياناتي مع فريق بيت المصور عبر واتساب.
      </label>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
      <button
        type="submit"
        className="w-full min-h-10 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
      >
        إرسال عبر واتساب
      </button>
    </form>
  );
}
