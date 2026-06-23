import { useEffect, useRef } from "react";
import { useLili } from "@/lib/lili/context";
import LiliMessage from "./lili-message";
import { LILI_DISCLAIMER } from "@/lib/lili/constants";

export default function LiliMessages() {
  const { messages, isTyping, settings } = useLili();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 min-h-0">
      {messages.map((m) => (
        <LiliMessage key={m.id} message={m} />
      ))}
      {isTyping ? (
        <div className="text-xs text-muted-foreground px-2">{settings.assistantName} تكتب الآن…</div>
      ) : null}
      <p className="text-[10px] text-muted-foreground text-center px-2 pt-2">{LILI_DISCLAIMER}</p>
      <div ref={endRef} />
    </div>
  );
}
