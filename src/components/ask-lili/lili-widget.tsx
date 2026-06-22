import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLili } from "@/lib/lili/context";
import LiliAvatar from "./lili-avatar";
import LiliHeader from "./lili-header";
import LiliMessages from "./lili-messages";
import LiliQuickReplies from "./lili-quick-replies";
import LiliInput from "./lili-input";
import LiliLeadForm from "./lili-lead-form";
import LiliFeedback from "./lili-feedback";

export default function LiliWidget() {
  const { open, setOpen, teaserVisible, dismissTeaser } = useLili();

  return (
    <>
      {teaserVisible && !open ? (
        <button
          type="button"
          onClick={() => {
            dismissTeaser();
            setOpen(true);
          }}
          className="fixed z-[60] bottom-[calc(5.5rem+env(safe-area-inset-bottom))] start-4 max-w-[14rem] rounded-2xl border border-border/60 bg-card/95 backdrop-blur px-3 py-2 text-xs shadow-lg text-start animate-in fade-in slide-in-from-bottom-2"
        >
          تحتاج مساعدة في اختيار الدورة؟
        </button>
      ) : null}

      {open ? (
        <div
          role="dialog"
          aria-label="محادثة لي لي"
          className={cn(
            "fixed z-[70] flex flex-col bg-background border border-border/50 shadow-2xl overflow-hidden",
            "inset-0 sm:inset-auto sm:bottom-6 sm:start-6 sm:w-[min(100vw-2rem,24rem)] sm:h-[min(85vh,640px)] sm:rounded-2xl",
          )}
        >
          <LiliHeader />
          <LiliMessages />
          <LiliLeadForm />
          <LiliQuickReplies />
          <LiliFeedback />
          <LiliInput />
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed z-[60] bottom-[calc(1rem+env(safe-area-inset-bottom))] start-4",
          "flex items-center gap-2 rounded-full pe-4 ps-2 py-2 min-h-12",
          "bg-[image:var(--gradient-brand)] text-primary-foreground shadow-lg hover:opacity-95 transition-opacity",
        )}
        aria-expanded={open}
        aria-label="اسأل لي لي"
      >
        <LiliAvatar className="size-10" />
        <span className="text-sm font-semibold hidden sm:inline">اسأل لي لي</span>
        <MessageCircle className="size-5 sm:hidden" />
      </button>
    </>
  );
}
