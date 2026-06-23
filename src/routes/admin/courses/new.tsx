import { useEffect, useState, type FormEvent } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import AdminShell from "@/components/admin/AdminShell";
import AdminCourseForm from "@/components/admin/AdminCourseForm";
import { createAdminCourseFn, listAdminInstructorsFn } from "@/lib/admin/actions.server";
import { getAdminToken, requireAdminToken } from "@/lib/admin/session";
import type { AdminCourseFields } from "@/lib/admin/types";

export const Route = createFileRoute("/admin/courses/new")({
  component: AdminNewCoursePage,
});

const defaults: AdminCourseFields & { name: string } = {
  name: "",
  priceLabel: "تواصل معنا لمعرفة السعر",
  currency: "SAR",
  scheduleLabel: "يُعلن قريبًا",
  durationDays: 3,
  totalHours: 12,
  dailyHours: 4,
  instructorName: "",
  level: "مبتدئ",
  location: "جدة",
  trainingType: "حضوري",
  heroSubtitle: "",
};

function AdminNewCoursePage() {
  const navigate = useNavigate();
  const [values, setValues] = useState(defaults);
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [instructorNames, setInstructorNames] = useState<string[]>([]);

  if (!getAdminToken()) {
    void navigate({ to: "/admin/login" });
  }

  useEffect(() => {
    void (async () => {
      try {
        const token = requireAdminToken();
        const list = await listAdminInstructorsFn({ data: { token } });
        setInstructorNames(list.filter((i) => i.active).map((i) => i.name));
      } catch {
        /* قائمة المدربين اختيارية */
      }
    })();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const token = requireAdminToken();
      const result = await createAdminCourseFn({
        data: { token, slug: slug || undefined, fields: values },
      });
      window.dispatchEvent(new Event("bm-admin-updated"));
      void navigate({ to: "/admin/courses/$slug", params: { slug: result.slug } });
    } catch (err) {
      setError(
        err instanceof Error && err.message === "SLUG_EXISTS"
          ? "المعرّف مستخدم مسبقًا."
          : "تعذّر إنشاء الدورة.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="إضافة دورة جديدة">
      <form onSubmit={onSubmit} className="max-w-3xl space-y-6">
        <AdminCourseForm
          values={values}
          onChange={setValues}
          slugEditable
          slug={slug}
          onSlugChange={setSlug}
          instructorNames={instructorNames}
        />
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={saving}
            className="btn-hero px-5 py-2.5 rounded-md font-semibold"
          >
            {saving ? "جاري الإنشاء…" : "إنشاء الدورة"}
          </button>
          <Link to="/admin/courses" className="px-5 py-2.5 rounded-md border border-border/60">
            إلغاء
          </Link>
        </div>
      </form>
    </AdminShell>
  );
}
