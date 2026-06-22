import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import { usePlatformT } from "@/lib/i18n-platform";
import { usePlatform } from "@/lib/platform/context";
import { useCourseCatalog } from "@/lib/admin/context";

export default function ForumPanel() {
  const { lang } = useT();
  const pt = usePlatformT(lang);
  const { user, threads, replies, createThread, addReply } = usePlatform();
  const catalog = useCourseCatalog();
  const [courseSlug, setCourseSlug] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [replyBody, setReplyBody] = useState("");
  const [showNew, setShowNew] = useState(false);

  const filtered = useMemo(
    () => (courseSlug === "all" ? threads : threads.filter((t) => t.courseSlug === courseSlug)),
    [threads, courseSlug],
  );

  const selected = filtered.find((t) => t.id === selectedId) ?? filtered[0] ?? null;
  const threadReplies = selected ? replies.filter((r) => r.threadId === selected.id) : [];

  if (!user) {
    return (
      <div className="card-elegant rounded-2xl p-8 text-center">
        <p className="text-muted-foreground mb-4">{pt.loginRequired}</p>
        <Link
          to="/platform/login"
          className="btn-hero inline-flex px-4 py-2 rounded-md text-sm font-semibold"
        >
          {pt.login}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[minmax(0,320px)_1fr] gap-6 min-w-0">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <select
            value={courseSlug}
            onChange={(e) => setCourseSlug(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm min-w-0 flex-1"
          >
            <option value="all">{pt.allCourses}</option>
            {catalog.map(({ course }) => (
              <option key={course.slug} value={course.slug}>
                {course.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setShowNew(true)}
            className="btn-hero px-3 py-2 rounded-md text-sm font-semibold shrink-0"
          >
            {pt.newThread}
          </button>
        </div>

        {showNew ? (
          <form
            className="card-elegant rounded-xl p-4 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              const slug =
                courseSlug === "all" ? (catalog[0]?.course.slug ?? "general") : courseSlug;
              createThread(slug, title, body);
              setTitle("");
              setBody("");
              setShowNew(false);
            }}
          >
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={pt.threadTitle}
              className="w-full rounded-md border border-border px-3 py-2 text-sm"
            />
            <textarea
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={pt.threadBody}
              rows={4}
              className="w-full rounded-md border border-border px-3 py-2 text-sm resize-y"
            />
            <button type="submit" className="btn-hero px-4 py-2 rounded-md text-sm font-semibold">
              {pt.post}
            </button>
          </form>
        ) : null}

        <ul className="space-y-2 max-h-[420px] overflow-y-auto">
          {filtered.length === 0 ? (
            <li className="text-sm text-muted-foreground p-4">{pt.noThreads}</li>
          ) : (
            filtered.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(t.id)}
                  className="w-full text-start rounded-xl border border-border/60 px-4 py-3 hover:bg-secondary/30"
                >
                  <div className="font-semibold text-sm break-words">{t.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {t.authorName} · {t.replyCount} {pt.replies}
                  </div>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="card-elegant rounded-2xl p-5 sm:p-6 min-w-0">
        {selected ? (
          <>
            <h2 className="text-xl font-bold break-words">{selected.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{selected.authorName}</p>
            <p className="mt-4 whitespace-pre-wrap break-words">{selected.body}</p>
            <div className="divider-brand my-6" />
            <div className="space-y-4">
              {threadReplies.map((r) => (
                <div key={r.id} className="rounded-lg bg-secondary/20 px-4 py-3">
                  <div className="text-xs text-muted-foreground mb-1">{r.authorName}</div>
                  <p className="text-sm whitespace-pre-wrap break-words">{r.body}</p>
                </div>
              ))}
            </div>
            <form
              className="mt-6 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                addReply(selected.id, replyBody);
                setReplyBody("");
              }}
            >
              <input
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
                placeholder={pt.reply}
                className="flex-1 min-w-0 rounded-md border border-border px-3 py-2 text-sm"
              />
              <button
                type="submit"
                className="shrink-0 px-4 py-2 rounded-md border border-border font-medium text-sm"
              >
                {pt.send}
              </button>
            </form>
          </>
        ) : (
          <p className="text-muted-foreground">{pt.selectThread}</p>
        )}
      </div>
    </div>
  );
}
