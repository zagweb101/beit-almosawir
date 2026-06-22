import { FormEvent, useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import { usePlatformT } from "@/lib/i18n-platform";
import { usePlatform } from "@/lib/platform/context";

export const Route = createFileRoute("/platform/login")({
  component: PlatformLoginPage,
});

function PlatformLoginPage() {
  const { lang } = useT();
  const pt = usePlatformT(lang);
  const { login, user } = usePlatform();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) navigate({ to: "/platform" });
  }, [user, navigate]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    login(name, email);
    navigate({ to: "/platform" });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-14 max-w-md min-w-0">
      <div className="card-elegant rounded-2xl p-6 sm:p-8">
        <h1 className="text-2xl font-bold">{pt.loginTitle}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{pt.loginLead}</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm course-muted block mb-1">{pt.name}</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-border px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm course-muted block mb-1">{pt.email}</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-border px-3 py-2 text-sm"
            />
          </div>
          <button type="submit" className="btn-hero w-full py-2.5 rounded-md font-semibold">
            {pt.login}
          </button>
        </form>
        <Link
          to="/platform"
          className="block text-center text-sm text-muted-foreground mt-4 hover:text-foreground"
        >
          ← {pt.hubTitle}
        </Link>
      </div>
    </div>
  );
}
