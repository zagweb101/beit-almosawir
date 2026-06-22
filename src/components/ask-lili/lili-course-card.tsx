import type { LiliRichCard } from "@/types/lili";
import { Link } from "@tanstack/react-router";

export default function LiliCourseCard({
  card,
  onRegister,
}: {
  card: Extract<LiliRichCard, { type: "course" }>;
  onRegister: () => void;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-secondary/30 overflow-hidden text-start">
      {card.image ? (
        <img src={card.image} alt="" className="w-full h-24 object-cover" loading="lazy" />
      ) : null}
      <div className="p-3 space-y-2">
        <div className="font-semibold text-sm leading-snug">{card.title}</div>
        <p className="text-xs text-muted-foreground line-clamp-2">{card.description}</p>
        <div className="text-xs text-muted-foreground">{card.level}</div>
        <div className="text-xs">{card.scheduleLabel}</div>
        <div className="text-xs font-medium text-primary">{card.priceLabel}</div>
        <div className="flex flex-wrap gap-2 pt-1">
          <Link
            to={card.url}
            className="text-xs px-3 py-2 rounded-full border border-primary/40 hover:bg-primary/10 min-h-9 inline-flex items-center"
          >
            التفاصيل
          </Link>
          <button
            type="button"
            onClick={onRegister}
            className="text-xs px-3 py-2 rounded-full bg-primary text-primary-foreground min-h-9"
          >
            التسجيل
          </button>
        </div>
      </div>
    </div>
  );
}
