import type { AdminCourseFields } from "@/lib/admin/types";

export default function AdminCourseForm({
  values,
  onChange,
  slugEditable,
  slug,
  onSlugChange,
}: {
  values: AdminCourseFields & { name: string };
  onChange: (next: AdminCourseFields & { name: string }) => void;
  slugEditable?: boolean;
  slug?: string;
  onSlugChange?: (slug: string) => void;
}) {
  const set = <K extends keyof (AdminCourseFields & { name: string })>(key: K, value: (AdminCourseFields & { name: string })[K]) =>
    onChange({ ...values, [key]: value });

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
          <input className="admin-input" value={slug ?? ""} onChange={(e) => onSlugChange?.(e.target.value)} dir="ltr" />
        </Field>
      ) : null}
      <Field label="السعر">
        <input className="admin-input" value={values.priceLabel} onChange={(e) => set("priceLabel", e.target.value)} />
      </Field>
      <Field label="الموعد">
        <input className="admin-input" value={values.scheduleLabel} onChange={(e) => set("scheduleLabel", e.target.value)} />
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
        <input className="admin-input" value={values.instructorName} onChange={(e) => set("instructorName", e.target.value)} />
      </Field>
      <Field label="المستوى">
        <input className="admin-input" value={values.level} onChange={(e) => set("level", e.target.value)} />
      </Field>
      <Field label="الموقع">
        <input className="admin-input" value={values.location} onChange={(e) => set("location", e.target.value)} />
      </Field>
      <Field label="نوع التدريب">
        <input className="admin-input" value={values.trainingType} onChange={(e) => set("trainingType", e.target.value)} />
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
