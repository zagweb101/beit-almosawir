// TODO: استبدال الصور المؤقتة بصور دورة احتراف الإضاءة الأصلية عند توفرها.

import workVideo from "@/assets/work-video.jpg";
import workBeauty from "@/assets/work-beauty.jpg";
import workshop from "@/assets/workshop.jpg";
import heroStudio from "@/assets/hero.jpg";

export const lightingMasteryOgImage = workVideo;

export const lightingMasteryHeroImage = workVideo;

export const lightingMasteryGalleryImages = [
  { src: workVideo, altKey: "lightingTraining" as const },
  { src: workBeauty, altKey: "beautyLighting" as const },
  { src: workshop, altKey: "studioWorkshop" as const },
  { src: heroStudio, altKey: "studioEnvironment" as const },
] as const;

export type LightingGalleryAltKey = (typeof lightingMasteryGalleryImages)[number]["altKey"];

/** TODO: إضافة الصورة والسيرة المعتمدة للمصور أحمد زغلول. */
export const lightingMasteryTrainerImage = workshop;
