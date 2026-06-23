import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Download, FileSpreadsheet, Pencil, Plus, Star, Trash2, X } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import {
  createAdminTestimonialFn,
  deleteAdminTestimonialFn,
  listAdminTestimonialsFn,
  updateAdminTestimonialFn,
} from "@/lib/admin/actions.server";
import { getAdminToken, requireAdminToken } from "@/lib/admin/session";
import { downloadFile, stampedName, toCsv } from "@/lib/admin/export";
import type { AdminTestimonial, AdminTestimonialFields } from "@/lib/admin/types";

export const Route = createFileRoute("/admin/testimonials")({
  component: AdminTestimonialsPage,
});

const emptyForm: AdminTestimonialFields = {
  authorName: "",
  role: "",
  quote: "",
  rating: 5,
  photoUrl: "",
  courseSlug: "",
  featured: false,
  active: true,
  sortOrder: 0,
};

function AdminTestimonialsPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<AdminTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<AdminTestimonialFields>(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

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
      setRows(await listAdminTestimonialsFn({ data: { token } }));
    } catch {
      void navigate({ to: "/admin/login" });
    } finally {
      setLoading(false);
    }
  }

  function startCreate() {
    setEditingId(null);
    setForm({ ...emptyForm, sortOrder: rows.length });
    setShowForm(true);
    setError("");
  }

  function startEdit(t: AdminTestimonial) {
    setEditingId(t.id);
    setForm({
      authorName: t.authorName,
      role: t.role,
      quote: t.quote,
      rating: t.rating,
      photoUrl: t.photoUrl ?? "",
      courseSlug: t.courseSlug ?? "",
      featured: t.featured,
      active: t.active,
      sortOrder: t.sortOrder,
    });
    setShowForm(true);
    setError("");
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.authorName.trim() || !form.quote.trim()) {
      setError("الاسم ونص التقييم مطلوبان.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const token = requireAdminToken();
      if (editingId) {
        await updateAdminTestimonialFn({ data: { token, id: editingId, fields: form } });
      } else {
        await createAdminTestimonialFn({ data: { token, fields: form } });
      }
      closeForm();
      await load();
      window.dispatchEvent(new Event("bm-admin-updated"));
    } catch {
      setError("تعذّر حفظ التقييم.");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm("هل تريد حذف هذا التقييم؟")) return;
    try {
      const token = requireAdminToken();
      await deleteAdminTestimonialFn({ data: { token, id } });
      if (editingId === id) closeForm();
      await load();
      window.dispatchEvent(new Event("bm-admin-updated"));
    } catch {
      setError("تعذّر الحذف.");
    }
  }

  function exportJson() {
    downloadFile(
      stampedName("testimonials", "json"),
      JSON.stringify(rows, null, 2),
      "application/json",
    );
  }

  function exportCsv() {
    const csv = toCsv(rows, [
      { key: "authorName", header: "الاسم" },
      { key: "role", header: "الصفة" },
      { key: "rating", header: "النجوم" },
      { key: "quote", header: "التقييم" },
      { key: "active", header: "ظاهر" },
    ]);
    downloadFile(stampedName("testimonials", "csv"), csv, "text/csv");
  }

  return (
    <AdminShell
      title="التقييمات وآراء العملاء"
      actions={
        <>
          <button
            type="button"
            onClick={exportCsv}
            disabled={!rows.length}
            className="px-3 py-2 rounded-md text-sm border border-border/60 min-h-10 inline-flex items-center gap-1 disabled:opacity-50"
          >
            <FileSpreadsheet className="size-4" /> CSV
          </button>
          <button
            type="button"
            onClick={exportJson}
            disabled={!rows.length}
            className="px-3 py-2 rounded-md text-sm border border-border/60 min-h-10 inline-flex items-center gap-1 disabled:opacity-50"
          >
            <Download className="size-4" /> JSON
          </button>
          <button
            type="button"
            onClick={startCreate}
            className="btn-hero px-3 py-2 rounded-md text-sm font-semibold min-h-10 inline-flex items-center gap-1"
          >
            <Plus className="size-4" /> تقييم جديد
          </button>
        </>
      }
    >
      {error ? <p className="text-destructive mb-4">{error}</p> : null}
      <p className="text-xs text-muted-foreground mb-4">
        الصق هنا تقييمات Google الحقيقية لعملائك. التقييمات الظاهرة تُعرض في الصفحة الرئيسية مع نجوم
        وبيانات منظّمة تساعد على ظهور النجوم في نتائج بحث Google.
      </p>

      {showForm ? (
        <form
          onSubmit={onSubmit}
          className="mb-6 rounded-lg border border-border/60 bg-card/40 p-5 max-w-3xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">{editingId ? "تعديل تقييم" : "تقييم جديد"}</h2>
            <button type="button" onClick={closeForm} aria-label="إغلاق">
              <X className="size-4" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="اسم العميل">
              <input
                className="admin-input"
                value={form.authorName}
                onChange={(e) => setForm({ ...form, authorName: e.target.value })}
              />
            </Field>
            <Field label="الصفة (مثل: متدربة — دورة البيوتي)">
              <input
                className="admin-input"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
            </Field>
            <Field label="عدد النجوم">
              <select
                className="admin-input"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} نجوم
                  </option>
                ))}
              </select>
            </Field>
            <Field label="الترتيب (الأصغر يظهر أولًا)">
              <input
                className="admin-input"
                type="number"
                value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
              />
            </Field>
            <Field label="رابط صورة العميل (اختياري)" className="sm:col-span-2">
              <input
                className="admin-input"
                dir="ltr"
                value={form.photoUrl}
                onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
                placeholder="https://…"
              />
            </Field>
            <Field label="نص التقييم" className="sm:col-span-2">
              <textarea
                className="admin-input min-h-24"
                value={form.quote}
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
              />
            </Field>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
              />
              ظاهر في الموقع
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              مميّز
            </label>
          </div>
          <div className="flex flex-wrap gap-3 mt-5">
            <button
              type="submit"
              disabled={saving}
              className="btn-hero px-5 py-2.5 rounded-md font-semibold"
            >
              {saving ? "جاري الحفظ…" : editingId ? "حفظ التعديلات" : "إضافة التقييم"}
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="px-5 py-2.5 rounded-md border border-border/60"
            >
              إلغاء
            </button>
          </div>
        </form>
      ) : null}

      {loading ? (
        <p className="text-muted-foreground">جاري التحميل…</p>
      ) : rows.length === 0 ? (
        <p className="text-muted-foreground">
          لا توجد تقييمات بعد. اضغط «تقييم جديد» والصق أول تقييم من Google.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border/60 text-start">
                <th className="p-3">العميل</th>
                <th className="p-3">التقييم</th>
                <th className="p-3">النجوم</th>
                <th className="p-3">الحالة</th>
                <th className="p-3">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-border/30">
                  <td className="p-3 font-medium align-top whitespace-nowrap">
                    {row.authorName}
                    {row.role ? (
                      <div className="text-xs text-muted-foreground">{row.role}</div>
                    ) : null}
                  </td>
                  <td className="p-3 align-top max-w-md text-muted-foreground">
                    {row.quote.length > 110 ? `${row.quote.slice(0, 110)}…` : row.quote}
                  </td>
                  <td className="p-3 align-top">
                    <span className="inline-flex items-center gap-0.5">
                      {row.rating}
                      <Star className="size-3.5 fill-primary text-primary" />
                    </span>
                  </td>
                  <td className="p-3 align-top">
                    {row.active ? (
                      <span className="text-primary">ظاهر</span>
                    ) : (
                      <span className="text-muted-foreground">مخفي</span>
                    )}
                  </td>
                  <td className="p-3 align-top">
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => startEdit(row)}
                        className="text-primary inline-flex items-center gap-1"
                      >
                        <Pencil className="size-3.5" /> تعديل
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(row.id)}
                        className="text-destructive inline-flex items-center gap-1"
                      >
                        <Trash2 className="size-3.5" /> حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
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
