import { useLili } from "@/lib/lili/context";

export default function LiliQuickReplies() {
  const { quickReplies, sendMessage } = useLili();

  return (
    <div className="px-3 pb-2 flex flex-wrap gap-2">
      {quickReplies.map((q) => (
        <button
          key={q.id}
          type="button"
          onClick={() => sendMessage(q.message)}
          className="text-xs px-3 py-2 rounded-full border border-border/70 bg-background/60 hover:bg-secondary/40 min-h-9"
        >
          {q.label}
        </button>
      ))}
    </div>
  );
}
