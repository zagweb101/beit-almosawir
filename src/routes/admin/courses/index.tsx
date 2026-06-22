import { useEffect, useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus, Printer } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import { deleteAdminCourseFn, listAdminCoursesFn } from "@/lib/admin/actions.server";
import { getAdminToken, requireAdminToken } from "@/lib/admin/session";
import type { AdminCourseRow } from "@/lib/admin/types";

export const Route = createFileRoute("/admin/courses/")({
  component: AdminCoursesPage,
});

function AdminCoursesPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<AdminCourseRow[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAdminToken()) {
      void navigate({ to: "/admin/login" });
      return;
    }
    void load();
  }, [navigate]);

  async function load() {
    try {
      const token = requireAdminToken();
      const data = await listAdminCoursesFn({ data: { token } });
      setRows(data);
    } catch {
      void navigate({ to: "/admin/login" });
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(slug: string) {
    if (!confirm("هل تريد حذف/إخفاء هذه الدورة؟")) return;
    try {
      const token = requireAdminToken();
      await deleteAdminCourseFn({ data: { token, slug } });
      await load();
      window.dispatchEvent(new Event("bm-admin-updated"));
    } catch {
      setError("تعذّر الحذف.");
    }
  }

  return (
    <AdminShell
      title="إدارة الدورات"
      actions={
        <>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3 py-2 rounded-md text-sm border border-border/60 min-h-10 inline-flex items-center gap-1"
          >
            <Printer className="size-4" /> طباعة
          </button>
          <Link
            to="/admin/courses/new"
            className="btn-hero px-3 py-2 rounded-md text-sm font-semibold min-h-10 inline-flex items-center gap-1"
          >
            <Plus className="size-4" /> دورة جديدة
          </Link>
        </>
      }
    >
      {error ? <p className="text-destructive mb-4">{error}</p> : null}
      <p className="text-xs text-muted-foreground mb-4 admin-no-print">
        التعديلات تُحفظ في <code className="text-foreground">data/admin-courses.json</code>. على
        Railway أضف Volume مربوطًا بمجلد <code className="text-foreground">/app/data</code> حتى لا
        تُفقد البيانات عند إعادة النشر.
      </p>
      {loading ? (
        <p className="text-muted-foreground">جاري التحميل…</p>
      ) : (
        <div className="admin-print-area overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border/60 text-start">
                <th className="p-3">الدورة</th>
                <th className="p-3">السعر</th>
                <th className="p-3">الموعد</th>
                <th className="p-3">المدة</th>
                <th className="p-3">المدرب</th>
                <th className="p-3 admin-no-print">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.slug} className="border-b border-border/30">
                  <td className="p-3 font-medium">{row.name}</td>
                  <td className="p-3">{row.priceLabel}</td>
                  <td className="p-3">{row.scheduleLabel}</td>
                  <td className="p-3">
                    {row.durationDays} أيام / {row.totalHours} س
                  </td>
                  <td className="p-3">{row.instructorName || "—"}</td>
                  <td className="p-3 admin-no-print">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to="/admin/courses/$slug"
                        params={{ slug: row.slug }}
                        className="text-primary underline"
                      >
                        تعديل
                      </Link>
                      <button
                        type="button"
                        onClick={() => onDelete(row.slug)}
                        className="text-destructive"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-4 print:block hidden">
            طُبع في {new Date().toLocaleString("ar-SA")} — بيت المصور
          </p>
        </div>
      )}
    </AdminShell>
  );
}
