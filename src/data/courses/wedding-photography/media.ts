// TODO: استبدال الصور المؤقتة بصور دورة تصوير الأعراس الأصلية عند توفرها.

import workWedding from "@/assets/work-wedding.jpg";
import workshop from "@/assets/workshop.jpg";
import workVideo from "@/assets/work-video.jpg";

export const weddingPhotographyOgImage = workWedding;

export const weddingPhotographyHeroImage = workWedding;

export const weddingPhotographyGalleryImages = [
  { src: workWedding, altKey: "weddingSession" as const },
  { src: workshop, altKey: "weddingSimulation" as const },
  { src: workVideo, altKey: "weddingVideo" as const },
] as const;

/** TODO: إضافة الصورة والسيرة المعتمدة للمصور أحمد زغلول. */
export const weddingPhotographyTrainerImage = workshop;
