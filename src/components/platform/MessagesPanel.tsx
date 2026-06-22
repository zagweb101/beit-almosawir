import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import { usePlatformT } from "@/lib/i18n-platform";
import { academyName, usePlatform } from "@/lib/platform/context";

export default function MessagesPanel() {
  const { lang } = useT();
  const pt = usePlatformT(lang);
  const {
    user,
    conversations,
    messages,
    ensureAcademyConversation,
    sendMessage,
    markConversationRead,
  } = usePlatform();
  const [activeId, setActiveId] = useState<string>("");
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (user && conversations.length === 0) {
      const id = ensureAcademyConversation();
      if (id) setActiveId(id);
    } else if (conversations[0] && !activeId) {
      setActiveId(conversations[0].id);
    }
  }, [user, conversations, ensureAcademyConversation, activeId]);

  const activeMessages = useMemo(
    () => messages.filter((m) => m.conversationId === activeId),
    [messages, activeId],
  );

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

  const startAcademyChat = () => {
    const id = ensureAcademyConversation();
    setActiveId(id);
    markConversationRead(id);
  };

  return (
    <div className="grid lg:grid-cols-[minmax(0,280px)_1fr] gap-6 min-h-[420px] min-w-0">
      <div className="space-y-3">
        <button
          type="button"
          onClick={startAcademyChat}
          className="w-full btn-hero px-4 py-2 rounded-md text-sm font-semibold"
        >
          {pt.newMessage}
        </button>
        <ul className="space-y-2">
          {conversations.length === 0 ? (
            <li className="text-sm text-muted-foreground px-2">{pt.noMessages}</li>
          ) : (
            conversations.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveId(c.id);
                    markConversationRead(c.id);
                  }}
                  className="w-full text-start rounded-xl border border-border/60 px-4 py-3 hover:bg-secondary/30"
                >
                  <div className="font-semibold text-sm">{academyName(lang)}</div>
                  <div className="text-xs text-muted-foreground mt-1 truncate">
                    {new Date(c.lastMessageAt).toLocaleString(lang === "ar" ? "ar-SA" : "en-US")}
                  </div>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="card-elegant rounded-2xl flex flex-col min-h-[420px] min-w-0">
        <div className="px-5 py-4 border-b border-border/50 font-semibold">{pt.inbox}</div>
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {activeMessages.length === 0 ? (
            <p className="text-sm text-muted-foreground">{pt.noMessages}</p>
          ) : (
            activeMessages.map((m) => {
              const mine = m.senderId === user.id;
              return (
                <div
                  key={m.id}
                  className={`max-w-[85%] rounded-xl px-4 py-2 text-sm break-words ${
                    mine ? "ms-auto bg-primary/15" : "bg-secondary/30"
                  }`}
                >
                  {!mine ? (
                    <div className="text-xs text-muted-foreground mb-1">{m.senderName}</div>
                  ) : null}
                  {m.body}
                </div>
              );
            })
          )}
        </div>
        {activeId ? (
          <form
            className="p-4 border-t border-border/50 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(activeId, draft);
              setDraft("");
            }}
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={pt.typeMessage}
              className="flex-1 min-w-0 rounded-md border border-border px-3 py-2 text-sm"
            />
            <button
              type="submit"
              className="btn-hero px-4 py-2 rounded-md text-sm font-semibold shrink-0"
            >
              {pt.send}
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}
