// TODO: استبدال الصور المؤقتة بصور دورة تصوير البيوتي والجمال الأصلية عند توفرها.

import workBeauty from "@/assets/work-beauty.jpg";
import workshop from "@/assets/workshop.jpg";
import workVideo from "@/assets/work-video.jpg";

export const beautyPhotographyOgImage = workBeauty;

export const beautyPhotographyHeroImage = workBeauty;

export const beautyPhotographyGalleryImages = [
  { src: workBeauty, altKey: "beautySession" as const },
  { src: workVideo, altKey: "beautyVideo" as const },
  { src: workshop, altKey: "studioTeam" as const },
] as const;

/** TODO: إضافة الصورة والسيرة المعتمدة للمصور أحمد زغلول. */
export const beautyPhotographyTrainerImage = workshop;
