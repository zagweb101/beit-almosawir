import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Save } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import { listAdminCoursesFn, saveAdminCourseFn } from "@/lib/admin/actions.server";
import { getAdminToken, requireAdminToken } from "@/lib/admin/session";
import type { AdminCourseRow } from "@/lib/admin/types";

export const Route = createFileRoute("/admin/pricing")({
  component: AdminPricingPage,
});

function priceText(amount?: number, currency?: string): string {
  if (amount == null || Number.isNaN(amount)) return "تواصل معنا لمعرفة السعر";
  const unit = currency === "USD" ? "دولار" : "ريال";
  return `${amount.toLocaleString("en-US")} ${unit}`;
}

function AdminPricingPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<AdminCourseRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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
      setRows(await listAdminCoursesFn({ data: { token } }));
    } catch {
      void navigate({ to: "/admin/login" });
    } finally {
      setLoading(false);
    }
  }

  function update(slug: string, patch: Partial<AdminCourseRow>) {
    setRows((prev) => prev.map((r) => (r.slug === slug ? { ...r, ...patch } : r)));
  }

  async function saveAll() {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const token = requireAdminToken();
      for (const row of rows) {
        const fields = {
          name: row.name,
          priceLabel: priceText(row.priceAmount, row.currency),
          priceAmount: row.priceAmount,
          currency: row.currency ?? "SAR",
          scheduleLabel: row.scheduleLabel,
          startDate: row.startDate,
          endDate: row.endDate,
          durationDays: row.durationDays,
          totalHours: row.totalHours,
          dailyHours: row.dailyHours,
          instructorName: row.instructorName,
          level: row.level,
          location: row.location,
          trainingType: row.trainingType,
          heroSubtitle: row.heroSubtitle,
        };
        await saveAdminCourseFn({ data: { token, slug: row.slug, fields } });
      }
      setMessage("تم حفظ جميع الأسعار وتحديثها على الموقع.");
      window.dispatchEvent(new Event("bm-admin-updated"));
    } catch {
      setError("تعذّر حفظ بعض الأسعار.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell
      title="إدارة الأسعار"
      actions={
        <button
          type="button"
          onClick={saveAll}
          disabled={saving || loading}
          className="btn-hero px-3 py-2 rounded-md text-sm font-semibold min-h-10 inline-flex items-center gap-1 disabled:opacity-60"
        >
          <Save className="size-4" /> {saving ? "جاري الحفظ…" : "حفظ كل الأسعار"}
        </button>
      }
    >
      <p className="text-sm text-muted-foreground mb-4">
        اضبط السعر الرقمي لكل دورة. السعر يُعرض للزوار ويُفعّل زر الشراء (PayPal) تلقائيًا عند ضبطه.
        اتركه فارغًا لإخفاء الشراء وإظهار «تواصل معنا».
      </p>
      {message ? <p className="text-sm text-primary mb-3">{message}</p> : null}
      {error ? <p className="text-sm text-destructive mb-3">{error}</p> : null}

      {loading ? (
        <p className="text-muted-foreground">جاري التحميل…</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border/60 text-start">
                <th className="p-3">الدورة</th>
                <th className="p-3">السعر</th>
                <th className="p-3">العملة</th>
                <th className="p-3">المعاينة</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.slug} className="border-b border-border/30">
                  <td className="p-3 font-medium">{row.name}</td>
                  <td className="p-3">
                    <input
                      className="admin-input w-32"
                      type="number"
                      min={0}
                      inputMode="numeric"
                      placeholder="—"
                      value={row.priceAmount ?? ""}
                      onChange={(e) =>
                        update(row.slug, {
                          priceAmount: e.target.value === "" ? undefined : Number(e.target.value),
                        })
                      }
                    />
                  </td>
                  <td className="p-3">
                    <select
                      className="admin-input w-28"
                      value={row.currency ?? "SAR"}
                      onChange={(e) => update(row.slug, { currency: e.target.value })}
                    >
                      <option value="SAR">ريال</option>
                      <option value="USD">دولار</option>
                    </select>
                  </td>
                  <td className="p-3 text-muted-foreground">
                    {priceText(row.priceAmount, row.currency)}
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
