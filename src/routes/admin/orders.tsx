import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Download, FileSpreadsheet } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import { listOrdersFn } from "@/lib/payments/actions.server";
import { getAdminToken, requireAdminToken } from "@/lib/admin/session";
import { downloadFile, stampedName, toCsv } from "@/lib/admin/export";
import type { AdminOrder } from "@/lib/admin/types";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrdersPage,
});

const statusLabel: Record<AdminOrder["status"], string> = {
  paid: "مدفوع",
  pending: "معلّق",
  failed: "فشل",
};

function AdminOrdersPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAdminToken()) {
      void navigate({ to: "/admin/login" });
      return;
    }
    void (async () => {
      try {
        const token = requireAdminToken();
        setRows(await listOrdersFn({ data: { token } }));
      } catch {
        void navigate({ to: "/admin/login" });
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

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
