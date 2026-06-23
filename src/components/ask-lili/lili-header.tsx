import { Minus, RotateCcw, X } from "lucide-react";
import LiliAvatar from "./lili-avatar";
import LiliVoiceControls from "./lili-voice-controls";
import { useLili } from "@/lib/lili/context";

export default function LiliHeader() {
  const { setOpen, newConversation, settings } = useLili();

  return (
    <div className="flex items-center gap-3 px-3 py-3 border-b border-border/40 bg-gradient-to-l from-primary/10 to-transparent shrink-0">
      <LiliAvatar className="size-11 shrink-0" />
      <div className="flex-1 min-w-0 text-start">
        <div className="font-bold text-sm">{settings.assistantName}</div>
        <div className="text-xs text-muted-foreground truncate">المساعد الذكي لبيت المصور</div>
        <div className="text-[10px] text-primary mt-0.5">● متاحة للمساعدة</div>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <LiliVoiceControls />
        <button
          type="button"
          onClick={newConversation}
          className="size-9 rounded-lg border border-border/50 inline-flex items-center justify-center hover:bg-secondary/40"
          aria-label="محادثة جديدة"
        >
          <RotateCcw className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="size-9 rounded-lg border border-border/50 inline-flex items-center justify-center hover:bg-secondary/40 hidden sm:inline-flex"
          aria-label="تصغير"
        >
          <Minus className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="size-9 rounded-lg border border-border/50 inline-flex items-center justify-center hover:bg-secondary/40"
          aria-label="إغلاق"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
