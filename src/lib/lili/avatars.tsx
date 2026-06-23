import type { LucideIcon } from "lucide-react";
import { Aperture, Camera, Heart, Lightbulb, Sparkles, Star, Sun } from "lucide-react";
import liliAvatarImg from "@/assets/lili-avatar.png";
import { cn } from "@/lib/utils";

export type AvatarPreset = {
  id: string;
  name: string;
  bg: string;
  Icon: LucideIcon;
};

/** أفاتارات جاهزة بأسماء مقترحة — يختار منها الأدمن. */
export const AVATAR_PRESETS: AvatarPreset[] = [
  { id: "noor", name: "نور", bg: "linear-gradient(135deg,#f59e0b,#f97316)", Icon: Sun },
  { id: "siraj", name: "سراج", bg: "linear-gradient(135deg,#f97316,#ef4444)", Icon: Lightbulb },
  { id: "adasa", name: "عدسة", bg: "linear-gradient(135deg,#0ea5e9,#6366f1)", Icon: Aperture },
  { id: "lamsa", name: "لمسة", bg: "linear-gradient(135deg,#ec4899,#a855f7)", Icon: Sparkles },
  { id: "wamid", name: "وميض", bg: "linear-gradient(135deg,#8b5cf6,#6366f1)", Icon: Star },
  { id: "reem", name: "ريم", bg: "linear-gradient(135deg,#f43f5e,#ec4899)", Icon: Heart },
  { id: "camera", name: "كادر", bg: "linear-gradient(135deg,#475569,#0f172a)", Icon: Camera },
];

export function getAvatarPreset(id: string): AvatarPreset | undefined {
  return AVATAR_PRESETS.find((p) => p.id === id);
}

function isImageUrl(avatar: string): boolean {
  return /^https?:\/\//i.test(avatar) || avatar.startsWith("data:image");
}

/**
 * يعرض أفاتار المساعد حسب الإعداد:
 * - رابط صورة (http/data) → صورة مخصّصة
 * - معرّف preset → دائرة متدرّجة بأيقونة
 * - فارغ/default → الصورة الافتراضية
 */
export function AssistantAvatar({
  avatar = "",
  name = "المساعد الذكي",
  className = "size-10",
}: {
  avatar?: string;
  name?: string;
  className?: string;
}) {
  const base = "rounded-full object-cover aspect-square shrink-0 ring-2 ring-white/15";

  if (isImageUrl(avatar)) {
    return (
      <img
        src={avatar}
        alt={name}
        className={cn(base, "bg-black/40", className)}
        loading="lazy"
        decoding="async"
      />
    );
  }

  const preset = getAvatarPreset(avatar);
  if (preset) {
    const { Icon } = preset;
    return (
      <span
        role="img"
        aria-label={name}
        style={{ background: preset.bg }}
        className={cn(
          "rounded-full aspect-square shrink-0 ring-2 ring-white/15 grid place-items-center text-white",
          className,
        )}
      >
        <Icon className="size-[55%]" strokeWidth={2.25} />
      </span>
    );
  }

  return (
    <img
      src={liliAvatarImg}
      alt={name}
      className={cn(base, "object-[center_12%] bg-black/40", className)}
      loading="lazy"
      decoding="async"
    />
  );
}
