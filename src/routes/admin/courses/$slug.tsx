import { useEffect, useState, type FormEvent } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import AdminShell from "@/components/admin/AdminShell";
import AdminCourseForm from "@/components/admin/AdminCourseForm";
import { getAdminCourseFn, saveAdminCourseFn } from "@/lib/admin/actions.server";
import { getAdminToken, requireAdminToken } from "@/lib/admin/session";
import type { AdminCourseFields } from "@/lib/admin/types";

export const Route = createFileRoute("/admin/courses/$slug")({
  component: AdminEditCoursePage,
});

function AdminEditCoursePage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState<(AdminCourseFields & { name: string }) | null>(null);
  const [source, setSource] = useState<"builtin" | "custom">("builtin");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!getAdminToken()) {
      void navigate({ to: "/admin/login" });
      return;
    }
    void (async () => {
      try {
        const token = requireAdminToken();
        const row = await getAdminCourseFn({ data: { token, slug } });
        setValues(row);
        setSource(row.source);
      } catch {
        setError("تعذّر تحميل الدورة.");
      }
    })();
  }, [slug, navigate]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!values) return;
    setSaving(true);
    setError("");
    try {
      const token = requireAdminToken();
      await saveAdminCourseFn({ data: { token, slug, fields: values } });
      setMessage("تم حفظ التعديلات.");
      window.dispatchEvent(new Event("bm-admin-updated"));
    } catch {
      setError("تعذّر الحفظ.");
    } finally {
      setSaving(false);
    }
  }

  if (!values) {
    return (
      <AdminShell title="تعديل دورة">
        <p className="text-muted-foreground">{error || "جاري التحميل…"}</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell title={`تعديل: ${values.name}`}>
      <form onSubmit={onSubmit} className="max-w-3xl space-y-6">
        <div className="text-xs text-muted-foreground">
          المصدر: {source === "builtin" ? "دورة أساسية" : "دورة مخصصة"} · {slug}
        </div>
        <AdminCourseForm values={values} onChange={setValues} />
        {message ? <p className="text-sm text-primary">{message}</p> : null}
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <div className="flex flex-wrap gap-3 admin-no-print">
          <button type="submit" disabled={saving} className="btn-hero px-5 py-2.5 rounded-md font-semibold">
            {saving ? "جاري الحفظ…" : "حفظ التعديلات"}
          </button>
          <Link to="/admin/courses" className="px-5 py-2.5 rounded-md border border-border/60">
            رجوع
          </Link>
          <Link to={`/courses/${slug}`} className="px-5 py-2.5 rounded-md border border-border/60">
            معاينة الصفحة
          </Link>
        </div>
      </form>
    </AdminShell>
  );
}
