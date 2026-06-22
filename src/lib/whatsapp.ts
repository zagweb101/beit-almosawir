import { SITE } from "@/lib/site-config";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
