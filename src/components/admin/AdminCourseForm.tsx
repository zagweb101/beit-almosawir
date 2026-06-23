import { useState } from "react";
import { differenceInCalendarDays, format, parseISO } from "date-fns";
import { ar } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { CalendarDays } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LEVEL_OPTIONS, TRAINING_TYPE_OPTIONS } from "@/lib/admin/types";
import type { AdminCourseFields } from "@/lib/admin/types";

function priceText(amount?: number, currency?: string): string {
  if (amount == null || Number.isNaN(amount)) return "";
  const unit = currency === "USD" ? "دولار" : "ريال";
  return `${amount.toLocaleString("en-US")} ${unit}`;
}

function formatScheduleLabel(from: Date, to?: Date): string {
  const f = (d: Date) => format(d, "d MMMM yyyy", { locale: ar });
  return to && to.getTime() !== from.getTime() ? `من ${f(from)} إلى ${f(to)}` : f(from);
}

export default function AdminCourseForm({
  values,
  onChange,
  slugEditable,
  slug,
  onSlugChange,
  instructorNames = [],
}: {
  values: AdminCourseFields & { name: string };
  onChange: (next: AdminCourseFields & { name: string }) => void;
  slugEditable?: boolean;
  slug?: string;
  onSlugChange?: (slug: string) => void;
  instructorNames?: string[];
}) {
  const [calOpen, setCalOpen] = useState(false);

  const set = <K extends keyof (AdminCourseFields & { name: string })>(
    key: K,
    value: (AdminCourseFields & { name: string })[K],
  ) => onChange({ ...values, [key]: value });

  function onPriceAmount(v: string) {
    const amount = v === "" ? undefined : Number(v);
    onChange({
      ...values,
      priceAmount: amount,
      priceLabel: amount != null ? priceText(amount, values.currency) : values.priceLabel,
    });
  }

  function onCurrency(c: string) {
    onChange({
      ...values,
      currency: c,
      priceLabel: values.priceAmount != null ? priceText(values.priceAmount, c) : values.priceLabel,
    });
  }

  const selectedRange: DateRange | undefined = values.startDate
    ? {
        from: parseISO(values.startDate),
        to: values.endDate ? parseISO(values.endDate) : undefined,
      }
    : undefined;

  function onSelectRange(range: DateRange | undefined) {
    const next = {
      ...values,
      startDate: range?.from ? format(range.from, "yyyy-MM-dd") : undefined,
      endDate: range?.to ? format(range.to, "yyyy-MM-dd") : undefined,
    };
    if (range?.from) {
      next.scheduleLabel = formatScheduleLabel(range.from, range.to);
      if (range.to) next.durationDays = differenceInCalendarDays(range.to, range.from) + 1;
    }
    onChange(next);
  }

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <Field label="اسم الدورة">
        <input
          className="admin-input"
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
        />
      </Field>
      {slugEditable ? (
        <Field label="المعرّف (slug)">
          <input
            className="admin-input"
            value={slug ?? ""}
            onChange={(e) => onSlugChange?.(e.target.value)}
            dir="ltr"
          />
        </Field>
      ) : null}

      <Field label="السعر (رقم — يُعرض للزوار ويُمكّن الشراء)">
        <input
          className="admin-input"
          type="number"
          min={0}
          inputMode="numeric"
          value={values.priceAmount ?? ""}
          onChange={(e) => onPriceAmount(e.target.value)}
          placeholder="مثال: 1500"
        />
      </Field>
      <Field label="العملة">
        <select
          className="admin-input"
          value={values.currency ?? "SAR"}
          onChange={(e) => onCurrency(e.target.value)}
        >
          <option value="SAR">ريال سعودي (SAR)</option>
          <option value="USD">دولار أمريكي (USD)</option>
        </select>
      </Field>
      <Field
        label="نص السعر المعروض (يُملأ تلقائيًا من الرقم — أو اكتب: تواصل معنا)"
        className="sm:col-span-2"
      >
        <input
          className="admin-input"
          value={values.priceLabel}
          onChange={(e) => set("priceLabel", e.target.value)}
        />
      </Field>

      <Field label="تواريخ الدورة (من يوم إلى يوم)" className="sm:col-span-2">
        <Popover open={calOpen} onOpenChange={setCalOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="admin-input text-start inline-flex items-center justify-between gap-2 w-full"
            >
              <span className={values.scheduleLabel ? "" : "text-muted-foreground"}>
                {values.scheduleLabel || "اختر تواريخ الدورة من التقويم"}
              </span>
              <CalendarDays className="size-4 opacity-70 shrink-0" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={selectedRange}
              onSelect={onSelectRange}
              numberOfMonths={1}
              defaultMonth={selectedRange?.from}
            />
          </PopoverContent>
        </Popover>
      </Field>
      <Field label="نص الموعد المعروض (يُملأ تلقائيًا من التقويم)" className="sm:col-span-2">
        <input
          className="admin-input"
          value={values.scheduleLabel}
          onChange={(e) => set("scheduleLabel", e.target.value)}
        />
      </Field>

      <Field label="عدد الأيام">
        <input
          className="admin-input"
          type="number"
          min={1}
          value={values.durationDays}
          onChange={(e) => set("durationDays", Number(e.target.value))}
        />
      </Field>
      <Field label="إجمالي الساعات">
        <input
          className="admin-input"
          type="number"
          min={1}
          value={values.totalHours}
          onChange={(e) => set("totalHours", Number(e.target.value))}
        />
      </Field>
      <Field label="ساعات يومية">
        <input
          className="admin-input"
          type="number"
          min={1}
          value={values.dailyHours}
          onChange={(e) => set("dailyHours", Number(e.target.value))}
        />
      </Field>
      <Field label="المدرب">
        <input
          className="admin-input"
          list="bm-instructor-names"
          value={values.instructorName}
          onChange={(e) => set("instructorName", e.target.value)}
          placeholder="اختر من المدربين أو اكتب اسمًا"
        />
        <datalist id="bm-instructor-names">
          {instructorNames.map((n) => (
            <option key={n} value={n} />
          ))}
        </datalist>
      </Field>
      <Field label="المستوى">
        <input
          className="admin-input"
          list="bm-level-options"
          value={values.level}
          onChange={(e) => set("level", e.target.value)}
        />
        <datalist id="bm-level-options">
          {LEVEL_OPTIONS.map((l) => (
            <option key={l} value={l} />
          ))}
        </datalist>
      </Field>
      <Field label="الموقع">
        <input
          className="admin-input"
          value={values.location}
          onChange={(e) => set("location", e.target.value)}
        />
      </Field>
      <Field label="نوع التدريب">
        <select
          className="admin-input"
          value={values.trainingType}
          onChange={(e) => set("trainingType", e.target.value)}
        >
          {!TRAINING_TYPE_OPTIONS.includes(
            values.trainingType as (typeof TRAINING_TYPE_OPTIONS)[number],
          ) && values.trainingType ? (
            <option value={values.trainingType}>{values.trainingType}</option>
          ) : null}
          {TRAINING_TYPE_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>
      <Field label="وصف مختصر" className="sm:col-span-2">
        <textarea
          className="admin-input min-h-20"
          value={values.heroSubtitle ?? ""}
          onChange={(e) => set("heroSubtitle", e.target.value)}
        />
      </Field>
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block space-y-1.5 ${className}`}>
      <span className="text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}
