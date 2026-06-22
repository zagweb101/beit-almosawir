import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { adminLoginFn } from "@/lib/admin/actions.server";
import { getAdminToken, setAdminToken } from "@/lib/admin/session";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (getAdminToken()) {
    void navigate({ to: "/admin/courses" });
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { token } = await adminLoginFn({ data: { password } });
      setAdminToken(token);
      void navigate({ to: "/admin/courses" });
    } catch {
      setError("كلمة المرور غير صحيحة.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" dir="rtl">
      <form onSubmit={onSubmit} className="card-elegant w-full max-w-md rounded-2xl p-8 space-y-4">
        <h1 className="text-2xl font-bold text-center">لوحة إدارة الدورات</h1>
        <p className="text-sm text-muted-foreground text-center">بيت المصور — تعديل الأسعار والمواعيد والمدربين</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="كلمة المرور"
          className="admin-input"
          autoComplete="current-password"
        />
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <button type="submit" disabled={loading} className="btn-hero w-full rounded-md py-2.5 font-semibold">
          {loading ? "جاري الدخول…" : "دخول"}
        </button>
      </form>
    </div>
  );
}
