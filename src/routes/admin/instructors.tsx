import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Download, FileSpreadsheet, Pencil, Plus, Trash2, X } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import {
  createAdminInstructorFn,
  deleteAdminInstructorFn,
  listAdminInstructorsFn,
  updateAdminInstructorFn,
} from "@/lib/admin/actions.server";
import { getAdminToken, requireAdminToken } from "@/lib/admin/session";
import { downloadFile, stampedName, toCsv } from "@/lib/admin/export";
import type { AdminInstructor, AdminInstructorFields } from "@/lib/admin/types";

export const Route = createFileRoute("/admin/instructors")({
  component: AdminInstructorsPage,
});

const emptyForm: AdminInstructorFields = {
  name: "",
  specialty: "",
  bio: "",
  photoUrl: "",
  email: "",
  phone: "",
  active: true,
};

function AdminInstructorsPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<AdminInstructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<AdminInstructorFields>(emptyForm);
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
      const data = await listAdminInstructorsFn({ data: { token } });
      setRows(data);
    } catch {
      void navigate({ to: "/admin/login" });
    } finally {
      setLoading(false);
    }
  }

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
    setError("");
  }

  function startEdit(instructor: AdminInstructor) {
    setEditingId(instructor.id);
    setForm({
      name: instructor.name,
      specialty: instructor.specialty,
      bio: instructor.bio,
      photoUrl: instructor.photoUrl ?? "",
      email: instructor.email ?? "",
      phone: instructor.phone ?? "",
      active: instructor.active,
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
    if (!form.name.trim()) {
      setError("اسم المدرب مطلوب.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const token = requireAdminToken();
      if (editingId) {
        await updateAdminInstructorFn({ data: { token, id: editingId, fields: form } });
      } else {
        await createAdminInstructorFn({ data: { token, fields: form } });
      }
      closeForm();
      await load();
    } catch {
      setError("تعذّر حفظ المدرب.");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm("هل تريد حذف هذا المدرب؟")) return;
    try {
      const token = requireAdminToken();
      await deleteAdminInstructorFn({ data: { token, id } });
      if (editingId === id) closeForm();
      await load();
    } catch {
      setError("تعذّر الحذف.");
    }
  }

  function exportJson() {
    downloadFile(
      stampedName("instructors", "json"),
      JSON.stringify(rows, null, 2),
      "application/json",
    );
  }

  function exportCsv() {
    const csv = toCsv(rows, [
      { key: "name", header: "الاسم" },
      { key: "specialty", header: "التخصص" },
      { key: "bio", header: "نبذة" },
      { key: "email", header: "البريد" },
      { key: "phone", header: "الجوال" },
      { key: "active", header: "نشط" },
    ]);
    downloadFile(stampedName("instructors", "csv"), csv, "text/csv");
  }

  return (
    <AdminShell
      title="إدارة المدربين"
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
            <Plus className="size-4" /> مدرب جديد
          </button>
        </>
      }
    >
      {error ? <p className="text-destructive mb-4">{error}</p> : null}

      {showForm ? (
        <form
          onSubmit={onSubmit}
          className="mb-6 rounded-lg border border-border/60 bg-card/40 p-5 max-w-3xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">{editingId ? "تعديل مدرب" : "مدرب جديد"}</h2>
            <button type="button" onClick={closeForm} aria-label="إغلاق">
              <X className="size-4" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="الاسم">
              <input
                className="admin-input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Field>
            <Field label="التخصص">
              <input
                className="admin-input"
                value={form.specialty}
                onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                placeholder="تصوير فوتوغرافي، إضاءة…"
              />
            </Field>
            <Field label="البريد الإلكتروني">
              <input
                className="admin-input"
                type="email"
                dir="ltr"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </Field>
            <Field label="رقم الجوال">
              <input
                className="admin-input"
                dir="ltr"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </Field>
            <Field label="رابط الصورة" className="sm:col-span-2">
              <input
                className="admin-input"
                dir="ltr"
                value={form.photoUrl}
                onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
                placeholder="https://…"
              />
            </Field>
            <Field label="نبذة" className="sm:col-span-2">
              <textarea
                className="admin-input min-h-24"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
            </Field>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
              />
              نشط (يظهر في قوائم اختيار المدرب)
            </label>
          </div>
          <div className="flex flex-wrap gap-3 mt-5">
            <button
              type="submit"
              disabled={saving}
              className="btn-hero px-5 py-2.5 rounded-md font-semibold"
            >
              {saving ? "جاري الحفظ…" : editingId ? "حفظ التعديلات" : "إضافة المدرب"}
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
          لا يوجد مدربون بعد. اضغط «مدرب جديد» لإضافة أول مدرب.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border/60 text-start">
                <th className="p-3">الاسم</th>
                <th className="p-3">التخصص</th>
                <th className="p-3">التواصل</th>
                <th className="p-3">الحالة</th>
                <th className="p-3">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-border/30">
                  <td className="p-3 font-medium">{row.name}</td>
                  <td className="p-3">{row.specialty || "—"}</td>
                  <td className="p-3" dir="ltr">
                    {row.email || row.phone || "—"}
                  </td>
                  <td className="p-3">
                    {row.active ? (
                      <span className="text-primary">نشط</span>
                    ) : (
                      <span className="text-muted-foreground">موقوف</span>
                    )}
                  </td>
                  <td className="p-3">
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
