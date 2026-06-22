import liliAvatarImg from "@/assets/lili-avatar.png";
import { cn } from "@/lib/utils";

export default function LiliAvatar({ className = "size-10" }: { className?: string }) {
  return (
    <img
      src={liliAvatarImg}
      alt="لي لي — المساعد الذكي لبيت المصور"
      className={cn(
        "rounded-full object-cover object-[center_12%] aspect-square shrink-0",
        "ring-2 ring-white/15 bg-black/40",
        className,
      )}
      loading="lazy"
      decoding="async"
    />
  );
}
