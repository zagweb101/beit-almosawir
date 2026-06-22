import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import PlatformShell from "@/components/platform/PlatformShell";
import { useT } from "@/lib/i18n";
import { usePlatformT } from "@/lib/i18n-platform";
import { getLiliKnowledgeFn, syncLiliKnowledgeFn } from "@/lib/lili/actions.server";
import { liliAnalytics } from "@/lib/lili/analytics";
import { getAdminToken } from "@/lib/admin/session";
import type { LiliKnowledgeBundle } from "@/types/lili";

export const Route = createFileRoute("/platform/lili")({
  component: LiliAdminPage,
});

function LiliAdminPage() {
  const { lang } = useT();
  const pt = usePlatformT(lang);
  const [snapshot, setSnapshot] = useState(() => liliAnalytics.snapshot());
  const [bundle, setBundle] = useState<LiliKnowledgeBundle | null>(null);
  const [customNote, setCustomNote] = useState("");
  const [syncMsg, setSyncMsg] = useState("");

  useEffect(() => {
    setCustomNote(localStorage.getItem("bm_lili_admin_note") ?? "");
    void getLiliKnowledgeFn()
      .then(setBundle)
      .catch(() => setBundle(null));
  }, []);

  function saveNote() {
    localStorage.setItem("bm_lili_admin_note", customNote);
  }

  function refreshAnalytics() {
    setSnapshot(liliAnalytics.snapshot());
  }

  async function reindexKnowledge() {
    setSyncMsg("");
    try {
      const token = getAdminToken() ?? undefined;
      const result = await syncLiliKnowledgeFn({ data: { token } });
      setSyncMsg(`${pt.liliReindexDone}: ${result.count} مقطع`);
      const next = await getLiliKnowledgeFn();
      setBundle(next);
      window.dispatchEvent(new Event("bm-admin-updated"));
    } catch {
      setSyncMsg("تعذّرت إعادة الفهرسة — تأكد من صلاحيات الإدارة و DATABASE_URL");
    }
  }

  return (
    <PlatformShell title={pt.liliTitle} lead={pt.liliLead}>
      <div className="grid lg:grid-cols-2 gap-6">
        <section className="card-elegant rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-lg">{pt.liliAnalytics}</h2>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <Stat label={pt.liliConversations} value={snapshot.conversations} />
            <Stat label={pt.liliMessages} value={snapshot.messages} />
            <Stat label={pt.liliWhatsapp} value={snapshot.whatsappClicks} />
            <Stat label={pt.liliRegistrations} value={snapshot.registrationStarts} />
            <Stat label={pt.liliHandoffs} value={snapshot.handoffs} />
            <Stat label={pt.liliFeedbackYes} value={snapshot.feedback.yes} />
          </dl>
          <button
            type="button"
            onClick={refreshAnalytics}
            className="text-sm px-4 py-2 rounded-md border border-border hover:bg-secondary/40"
          >
            {pt.liliRefresh}
          </button>
          {snapshot.unanswered.length > 0 ? (
            <div>
              <h3 className="text-sm font-semibold mb-2">{pt.liliUnanswered}</h3>
              <ul className="text-xs text-muted-foreground space-y-1 max-h-40 overflow-y-auto">
                {snapshot.unanswered.map((q, i) => (
                  <li key={i} className="border-b border-border/30 pb-1">
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        <section className="card-elegant rounded-2xl p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-bold text-lg">{pt.liliKnowledge}</h2>
            <button
              type="button"
              onClick={() => void reindexKnowledge()}
              className="text-sm px-4 py-2 rounded-md border border-primary/40 hover:bg-primary/10"
            >
              {pt.liliReindex}
            </button>
          </div>
          <p className="text-sm text-muted-foreground">
            {pt.liliDbSource}:{" "}
            <strong>{bundle?.source === "database" ? pt.liliDbConnected : pt.liliDbMemory}</strong>
            {bundle ? ` · ${bundle.chunks.length} مقطع · ${bundle.courses.length} دورة` : null}
          </p>
          {syncMsg ? <p className="text-sm text-primary">{syncMsg}</p> : null}
          <p className="text-sm text-muted-foreground">{LILI_POLICY_NOTE}</p>
          <ul className="space-y-3 max-h-72 overflow-y-auto text-sm">
            {bundle?.courses.map((c) => (
              <li key={c.slug} className="border border-border/40 rounded-xl p-3">
                <div className="font-semibold">{c.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{c.priceLabel}</div>
                <div className="text-xs text-muted-foreground">{c.scheduleLabel}</div>
              </li>
            ))}
          </ul>
        </section>

        <section className="card-elegant rounded-2xl p-6 space-y-3 lg:col-span-2">
          <h2 className="font-bold text-lg">{pt.liliAdminNote}</h2>
          <p className="text-sm text-muted-foreground">{pt.liliAdminNoteLead}</p>
          <textarea
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-border/60 bg-background p-3 text-sm"
            placeholder={pt.liliAdminNotePlaceholder}
          />
          <button
            type="button"
            onClick={saveNote}
            className="btn-hero inline-flex px-4 py-2 rounded-md text-sm font-semibold"
          >
            {pt.save}
          </button>
        </section>
      </div>
    </PlatformShell>
  );
}

const LILI_POLICY_NOTE =
  "لي لي تجيب من: (1) محتوى صفحات الدورات في الموقع، (2) تعديلات لوحة الإدارة، (3) مقاطع المعرفة المفهرسة في PostgreSQL عند توفر DATABASE_URL.";

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-secondary/30 p-3">
      <dt className="text-muted-foreground text-xs">{label}</dt>
      <dd className="text-xl font-bold mt-1">{value}</dd>
    </div>
  );
}
