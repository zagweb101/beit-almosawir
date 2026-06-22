import { LEVEL_OPTIONS, TRAINING_TYPE_OPTIONS } from "@/lib/admin/types";
import type { AdminCourseFields } from "@/lib/admin/types";

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
  const set = <K extends keyof (AdminCourseFields & { name: string })>(
    key: K,
    value: (AdminCourseFields & { name: string })[K],
  ) => onChange({ ...values, [key]: value });

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
      <Field label="السعر">
        <input
          className="admin-input"
          value={values.priceLabel}
          onChange={(e) => set("priceLabel", e.target.value)}
        />
      </Field>
      <Field label="الموعد">
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
