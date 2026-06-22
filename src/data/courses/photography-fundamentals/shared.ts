import heroWorkshop from "@/assets/workshop.jpg";
import workBeauty from "@/assets/work-beauty.jpg";
import workWedding from "@/assets/work-wedding.jpg";
import workFood from "@/assets/work-food.jpg";
import workVideo from "@/assets/work-video.jpg";
import heroBg from "@/assets/hero.jpg";

export const photographyFundamentalsOgImage = heroWorkshop;

export const photographyFundamentalsGalleryImages = [
  { src: heroWorkshop, altKey: "workshop" as const },
  { src: workBeauty, altKey: "beauty" as const },
  { src: workVideo, altKey: "video" as const },
  { src: workWedding, altKey: "wedding" as const },
  { src: workFood, altKey: "food" as const },
  { src: heroBg, altKey: "studio" as const },
] as const;

export type GalleryAltKey = (typeof photographyFundamentalsGalleryImages)[number]["altKey"];
