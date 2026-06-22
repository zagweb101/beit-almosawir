import { SITE } from "@/lib/site-config";
import { LILI_DISCLAIMER, LILI_OPENING } from "./constants";
import type { AssistantSettings } from "@/types/lili";

/** الإعدادات الافتراضية للمساعد — آمنة للعميل (بدون قاعدة بيانات). */
export const DEFAULT_ASSISTANT_SETTINGS: AssistantSettings = {
  greeting: LILI_OPENING,
  whatsappNumber: SITE.whatsappNumber,
  disclaimer: LILI_DISCLAIMER,
  enabled: true,
  leadFormEnabled: true,
  collectEmail: true,
};
