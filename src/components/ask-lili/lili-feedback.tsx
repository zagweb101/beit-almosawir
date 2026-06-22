import { useLili } from "@/lib/lili/context";

export default function LiliFeedback() {
  const { showFeedback, submitFeedback } = useLili();
  if (!showFeedback) return null;

  return (
    <div className="px-3 pb-2 text-center space-y-2">
      <p className="text-xs text-muted-foreground">هل كانت إجابة لي لي مفيدة؟</p>
      <div className="flex justify-center gap-2">
        {(
          [
            ["yes", "نعم"],
            ["partial", "إلى حد ما"],
            ["no", "لا"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => submitFeedback(value)}
            className="text-xs px-3 py-2 rounded-full border border-border/60 min-h-9"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
