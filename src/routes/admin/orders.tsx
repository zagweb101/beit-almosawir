import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CreditCard, Download, FileSpreadsheet } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import {
  getPaymentSettingsFn,
  listOrdersFn,
  savePaymentSettingsFn,
} from "@/lib/payments/actions.server";
import { getAdminToken, requireAdminToken } from "@/lib/admin/session";
import { downloadFile, stampedName, toCsv } from "@/lib/admin/export";
import type { AdminOrder } from "@/lib/admin/types";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrdersPage,
});

type PaymentSettingsForm = {
  clientId: string;
  secret: string;
  env: "sandbox" | "live";
  currency: string;
  enabled: boolean;
  hasSecret: boolean;
};

const statusLabel: Record<AdminOrder["status"], string> = {
  paid: "مدفوع",
  pending: "معلّق",
  failed: "فشل",
};

const emptySettings: PaymentSettingsForm = {
  clientId: "",
  secret: "",
  env: "sandbox",
  currency: "USD",
  enabled: false,
  hasSecret: false,
};

function AdminOrdersPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<PaymentSettingsForm>(emptySettings);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState("");
  const [settingsErr, setSettingsErr] = useState("");

  useEffect(() => {
    if (!getAdminToken()) {
      void navigate({ to: "/admin/login" });
      return;
    }
    void (async () => {
      try {
        const token = requireAdminToken();
        const [orders, paymentSettings] = await Promise.all([
          listOrdersFn({ data: { token } }),
          getPaymentSettingsFn({ data: { token } }),
        ]);
        setRows(orders);
        setSettings({ ...paymentSettings, secret: "" });
      } catch {
        void navigate({ to: "/admin/login" });
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  async function onSaveSettings(e: FormEvent) {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsMsg("");
    setSettingsErr("");
    try {
      const token = requireAdminToken();
      const saved = await savePaymentSettingsFn({
        data: {
          token,
          clientId: settings.clientId,
          secret: settings.secret || undefined,
          env: settings.env,
          currency: settings.currency,
          enabled: settings.enabled,
        },
      });
      setSettings({ ...saved, secret: "" });
      setSettingsMsg(
        saved.enabled ? "تم حفظ الإعدادات وتفعيل الدفع." : "تم الحفظ. الدفع غير مفعّل.",
      );
    } catch {
      setSettingsErr("تعذّر حفظ الإعدادات.");
    } finally {
      setSavingSettings(false);
    }
  }

  const paidTotal = rows
    .filter((r) => r.status === "paid")
    .reduce((sum, r) => sum + r.amount, 0);

  function exportCsv() {
    const csv = toCsv(
      rows.map((r) => ({ ...r, createdAt: new Date(r.createdAt).toLocaleString("ar-SA") })),
      [
        { key: "courseName", header: "الدورة" },
        { key: "amount", header: "المبلغ" },
        { key: "currency", header: "العملة" },
        { key: "status", header: "الحالة" },
        { key: "customerName", header: "العميل" },
        { key: "customerEmail", header: "البريد" },
        { key: "createdAt", header: "التاريخ" },
      ],
    );
    downloadFile(stampedName("orders", "csv"), csv, "text/csv");
  }

  return (
    <AdminShell
      title="الطلبات والمدفوعات"
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
            onClick={() =>
              downloadFile(stampedName("orders", "json"), JSON.stringify(rows, null, 2), "application/json")
            }
            disabled={!rows.length}
            className="px-3 py-2 rounded-md text-sm border border-border/60 min-h-10 inline-flex items-center gap-1 disabled:opacity-50"
          >
            <Download className="size-4" /> JSON
          </button>
        </>
      }
    >
      {!loading ? (
        <form
          onSubmit={onSaveSettings}
          className="mb-8 max-w-2xl rounded-lg border border-border/60 bg-card/40 p-5 space-y-4"
        >
          <div className="flex items-center gap-2">
            <CreditCard className="size-5 text-primary" />
            <h2 className="font-semibold">إعدادات بوابة الدفع (PayPal)</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            أنشئ تطبيق REST في لوحة مطوري PayPal (حساب Business) وانسخ المفاتيح هنا. السرّ لا يظهر بعد
            الحفظ لأسباب أمنية.
          </p>

          <Field label="PayPal Client ID">
            <input
              className="admin-input"
              dir="ltr"
              value={settings.clientId}
              onChange={(e) => setSettings({ ...settings, clientId: e.target.value })}
            />
          </Field>
          <Field
            label={settings.hasSecret ? "PayPal Secret (محفوظ — اتركه فارغًا للإبقاء)" : "PayPal Secret"}
          >
            <input
              className="admin-input"
              dir="ltr"
              type="password"
              autoComplete="new-password"
              placeholder={settings.hasSecret ? "•••••••• (محفوظ)" : ""}
              value={settings.secret}
              onChange={(e) => setSettings({ ...settings, secret: e.target.value })}
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="البيئة">
              <select
                className="admin-input"
                value={settings.env}
                onChange={(e) =>
                  setSettings({ ...settings, env: e.target.value as "sandbox" | "live" })
                }
              >
                <option value="sandbox">تجريبي (Sandbox)</option>
                <option value="live">مباشر (Live)</option>
              </select>
            </Field>
            <Field label="عملة PayPal">
              <select
                className="admin-input"
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
              >
                {["USD", "EUR", "GBP", "AED"].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={settings.enabled}
              onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })}
            />
            تفعيل الدفع على الموقع
          </label>

          {settingsMsg ? <p className="text-sm text-primary">{settingsMsg}</p> : null}
          {settingsErr ? <p className="text-sm text-destructive">{settingsErr}</p> : null}

          <button
            type="submit"
            disabled={savingSettings}
            className="btn-hero px-5 py-2.5 rounded-md font-semibold"
          >
            {savingSettings ? "جاري الحفظ…" : "حفظ وتفعيل"}
          </button>
        </form>
      ) : null}

      {loading ? (
        <p className="text-muted-foreground">جاري التحميل…</p>
      ) : rows.length === 0 ? (
        <p className="text-muted-foreground">
          لا توجد طلبات بعد. تظهر هنا مدفوعات PayPal بعد تفعيل البوابة وإضافة سعر رقمي للدورات.
        </p>
      ) : (
        <>
          <p className="text-sm mb-4">
            إجمالي المدفوع:{" "}
            <span className="font-bold text-primary">{paidTotal.toFixed(2)}</span>{" "}
            <span className="text-muted-foreground">{rows[0]?.currency ?? ""}</span>
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border/60 text-start">
                  <th className="p-3">الدورة</th>
                  <th className="p-3">المبلغ</th>
                  <th className="p-3">الحالة</th>
                  <th className="p-3">العميل</th>
                  <th className="p-3">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-border/30">
                    <td className="p-3 font-medium">{row.courseName}</td>
                    <td className="p-3 whitespace-nowrap" dir="ltr">
                      {row.amount.toFixed(2)} {row.currency}
                    </td>
                    <td className="p-3">
                      <span
                        className={
                          row.status === "paid"
                            ? "text-primary"
                            : row.status === "failed"
                              ? "text-destructive"
                              : "text-muted-foreground"
                        }
                      >
                        {statusLabel[row.status]}
                      </span>
                    </td>
                    <td className="p-3">
                      {row.customerName || "—"}
                      {row.customerEmail ? (
                        <div className="text-xs text-muted-foreground" dir="ltr">
                          {row.customerEmail}
                        </div>
                      ) : null}
                    </td>
                    <td className="p-3 text-muted-foreground whitespace-nowrap">
                      {new Date(row.createdAt).toLocaleDateString("ar-SA")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </AdminShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}
