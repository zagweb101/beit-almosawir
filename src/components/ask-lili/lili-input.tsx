import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { useLili } from "@/lib/lili/context";

export default function LiliInput() {
  const { sendMessage } = useLili();
  const [value, setValue] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const text = value.trim();
    if (!text) return;
    sendMessage(text);
    setValue("");
  }

  return (
    <form onSubmit={onSubmit} className="p-3 border-t border-border/40 flex gap-2">
      <label className="sr-only" htmlFor="lili-input">
        اكتب رسالتك
      </label>
      <input
        id="lili-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="اكتب سؤالك…"
        className="flex-1 min-h-11 rounded-xl border border-border/60 bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        autoComplete="off"
        maxLength={800}
      />
      <button
        type="submit"
        className="size-11 shrink-0 rounded-xl bg-primary text-primary-foreground inline-flex items-center justify-center"
        aria-label="إرسال"
      >
        <Send className="size-4" />
      </button>
    </form>
  );
}
