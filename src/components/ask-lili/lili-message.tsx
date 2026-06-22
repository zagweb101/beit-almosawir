import type { LiliMessage as LiliMessageType } from "@/types/lili";
import LiliAvatar from "./lili-avatar";
import LiliCourseCard from "./lili-course-card";
import { useLili } from "@/lib/lili/context";

export default function LiliMessage({ message }: { message: LiliMessageType }) {
  const { runAction } = useLili();
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {!isUser ? <LiliAvatar className="size-8 shrink-0 mt-1" /> : null}
      <div
        className={`max-w-[88%] space-y-2 ${isUser ? "items-end" : "items-start"} flex flex-col`}
      >
        <div
          className={`rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap break-words ${
            isUser
              ? "bg-primary text-primary-foreground rounded-tl-sm"
              : "bg-secondary/50 border border-border/40 rounded-tr-sm"
          }`}
        >
          {message.content}
        </div>
        {message.cards?.map((card, i) =>
          card.type === "course" ? (
            <LiliCourseCard
              key={i}
              card={card}
              onRegister={() =>
                runAction({
                  type: "START_REGISTRATION",
                  label: "التسجيل",
                  courseId: card.courseId,
                  url: card.url,
                })
              }
            />
          ) : null,
        )}
        {message.actions?.length ? (
          <div className="flex flex-wrap gap-2">
            {message.actions.map((action, i) => (
              <button
                key={i}
                type="button"
                onClick={() => runAction(action)}
                className="text-xs px-3 py-2 rounded-full border border-primary/40 hover:bg-primary/10 min-h-9"
              >
                {action.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
