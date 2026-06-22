import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Download, FileSpreadsheet, Trash2 } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import {
  deleteLeadFn,
  getAssistantSettingsFn,
  listLeadsFn,
  saveAssistantSettingsFn,
} from "@/lib/lili/actions.server";
import { getAdminToken, requireAdminToken } from "@/lib/admin/session";
import { downloadFile, stampedName, toCsv } from "@/lib/admin/export";
import type { AssistantSettings, LeadRecord } from "@/types/lili";

export const Route = createFileRoute("/admin/assistant")({
  component: AdminAssistantPage,
});

const emptySettings: AssistantSettings = {
  greeting: "",
  whatsappNumber: "",
  disclaimer: "",
  enabled: true,
  leadFormEnabled: true,
  collectEmail: true,
};

function AdminAssistantPage() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<AssistantSettings>(emptySettings);
  const [leads, setLeads] = useState<LeadRecord[]>([]);
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
      const [s, l] = await Promise.all([
        getAssistantSettingsFn(),
        listLeadsFn({ data: { token } }),
      ]);
      setSettings(s);
      setLeads(l);
    } catch {
      void navigate({ to: "/admin/login" });
    } finally {
      setLoading(false);
    }
  }

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const token = requireAdminToken();
      const saved = await saveAssistantSettingsFn({ data: { token, settings } });
      setSettings(saved);
      setMessage("تم حفظ الإعدادات.");
      window.dispatchEvent(new Event("bm-admin-updated"));
    } catch {
      setError("تعذّر حفظ الإعدادات.");
    } finally {
      setSaving(false);
    }
  }

  async function onDeleteLead(id: string) {
    if (!confirm("هل تريد حذف هذا الطلب؟")) return;
    try {
      const token = requireAdminToken();
      await deleteLeadFn({ data: { token, id } });
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch {
      setError("تعذّر حذف الطلب.");
    }
  }

  function exportLeadsCsv() {
    const csv = toCsv(
      leads.map((l) => ({ ...l, createdAt: new Date(l.createdAt).toLocaleString("ar-SA") })),
      [
        { key: "name", header: "الاسم" },
        { key: "phone", header: "الجوال" },
        { key: "email", header: "البريد" },
        { key: "courseName", header: "الدورة" },
        { key: "createdAt", header: "التاريخ" },
      ],
    );
    downloadFile(stampedName("leads", "csv"), csv, "text/csv");
  }

  function exportLeadsJson() {
    downloadFile(stampedName("leads", "json"), JSON.stringify(leads, null, 2), "application/json");
  }

  return (
    <AdminShell title="المساعد الذكي">
      {loading ? (
        <p className="text-muted-foreground">جاري التحميل…</p>
      ) : (
        <div className="space-y-10 max-w-3xl">
          {/* الإعدادات */}
          <form onSubmit={onSave} className="space-y-5">
            <h2 className="font-semibold text-lg">إعدادات «لي لي»</h2>

            <Field label="رسالة الترحيب">
              <textarea
                className="admin-input min-h-20"
                value={settings.greeting}
                onChange={(e) => setSettings({ ...settings, greeting: e.target.value })}
              />
            </Field>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="رقم واتساب للتواصل">
                <input
                  className="admin-input"
                  dir="ltr"
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  placeholder="9665xxxxxxxx"
                />
              </Field>
              <Field label="نص التنويه">
                <input
                  className="admin-input"
                  value={settings.disclaimer}
                  onChange={(e) => setSettings({ ...settings, disclaimer: e.target.value })}
                />
              </Field>
            </div>

            <div className="space-y-2">
              <Toggle
                label="تفعيل المساعد على الموقع"
                checked={settings.enabled}
                onChange={(v) => setSettings({ ...settings, enabled: v })}
              />
              <Toggle
                label="تفعيل نموذج الزوار (الاسم/الجوال/الإيميل + اختيار الدورة)"
                checked={settings.leadFormEnabled}
                onChange={(v) => setSettings({ ...settings, leadFormEnabled: v })}
              />
              <Toggle
                label="طلب البريد الإلكتروني في النموذج"
                checked={settings.collectEmail}
                onChange={(v) => setSettings({ ...settings, collectEmail: v })}
              />
            </div>

            {message ? <p className="text-sm text-primary">{message}</p> : null}
            {error ? <p className="text-sm text-destructive">{error}</p> : null}

            <button
              type="submit"
              disabled={saving}
              className="btn-hero px-5 py-2.5 rounded-md font-semibold"
            >
              {saving ? "جاري الحفظ…" : "حفظ الإعدادات"}
            </button>
          </form>

          {/* العملاء المحتملون */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h2 className="font-semibold text-lg">طلبات الزوار ({leads.length})</h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={exportLeadsCsv}
                  disabled={!leads.length}
                  className="px-3 py-2 rounded-md text-sm border border-border/60 min-h-10 inline-flex items-center gap-1 disabled:opacity-50"
                >
                  <FileSpreadsheet className="size-4" /> CSV
                </button>
                <button
                  type="button"
                  onClick={exportLeadsJson}
                  disabled={!leads.length}
                  className="px-3 py-2 rounded-md text-sm border border-border/60 min-h-10 inline-flex items-center gap-1 disabled:opacity-50"
                >
                  <Download className="size-4" /> JSON
                </button>
              </div>
            </div>

            {leads.length === 0 ? (
              <p className="text-muted-foreground">لا توجد طلبات بعد.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border/60 text-start">
                      <th className="p-3">الاسم</th>
                      <th className="p-3">الجوال</th>
                      <th className="p-3">البريد</th>
                      <th className="p-3">الدورة</th>
                      <th className="p-3">التاريخ</th>
                      <th className="p-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-b border-border/30">
                        <td className="p-3 font-medium">{lead.name}</td>
                        <td className="p-3" dir="ltr">
                          {lead.phone}
                        </td>
                        <td className="p-3" dir="ltr">
                          {lead.email || "—"}
                        </td>
                        <td className="p-3">{lead.courseName || "—"}</td>
                        <td className="p-3 text-muted-foreground whitespace-nowrap">
                          {new Date(lead.createdAt).toLocaleDateString("ar-SA")}
                        </td>
                        <td className="p-3">
                          <button
                            type="button"
                            onClick={() => onDeleteLead(lead.id)}
                            className="text-destructive inline-flex items-center gap-1"
                          >
                            <Trash2 className="size-3.5" /> حذف
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </AdminShell>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}
