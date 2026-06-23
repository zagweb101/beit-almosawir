import { hasDatabase, prisma } from "@/lib/db/prisma.server";
import { DEFAULT_ASSISTANT_SETTINGS } from "./assistant-settings.defaults";
import type { AssistantSettings } from "@/types/lili";

const SETTINGS_ID = "default";

export { DEFAULT_ASSISTANT_SETTINGS };

// احتياطي في الذاكرة عند غياب قاعدة البيانات.
let memorySettings: AssistantSettings | null = null;

type SettingsRow = {
  assistantName: string;
  avatar: string;
  greeting: string;
  whatsappNumber: string;
  disclaimer: string;
  enabled: boolean;
  leadFormEnabled: boolean;
  collectEmail: boolean;
};

function rowToSettings(row: SettingsRow): AssistantSettings {
  return {
    assistantName: row.assistantName || DEFAULT_ASSISTANT_SETTINGS.assistantName,
    avatar: row.avatar ?? "",
    greeting: row.greeting || DEFAULT_ASSISTANT_SETTINGS.greeting,
    whatsappNumber: row.whatsappNumber || DEFAULT_ASSISTANT_SETTINGS.whatsappNumber,
    disclaimer: row.disclaimer || DEFAULT_ASSISTANT_SETTINGS.disclaimer,
    enabled: row.enabled,
    leadFormEnabled: row.leadFormEnabled,
    collectEmail: row.collectEmail,
  };
}

export async function getAssistantSettings(): Promise<AssistantSettings> {
  if (hasDatabase()) {
    try {
      const row = await prisma.assistantSettings.findUnique({ where: { id: SETTINGS_ID } });
      if (row) return rowToSettings(row);
      return DEFAULT_ASSISTANT_SETTINGS;
    } catch (error) {
      console.error("[assistant-settings] DB read failed, using defaults:", error);
    }
  }
  return memorySettings ?? DEFAULT_ASSISTANT_SETTINGS;
}

export async function saveAssistantSettings(
  fields: AssistantSettings,
): Promise<AssistantSettings> {
  const data: SettingsRow = {
    assistantName: fields.assistantName.trim() || DEFAULT_ASSISTANT_SETTINGS.assistantName,
    avatar: fields.avatar.trim(),
    greeting: fields.greeting.trim() || DEFAULT_ASSISTANT_SETTINGS.greeting,
    whatsappNumber: fields.whatsappNumber.trim() || DEFAULT_ASSISTANT_SETTINGS.whatsappNumber,
    disclaimer: fields.disclaimer.trim() || DEFAULT_ASSISTANT_SETTINGS.disclaimer,
    enabled: fields.enabled,
    leadFormEnabled: fields.leadFormEnabled,
    collectEmail: fields.collectEmail,
  };

  if (hasDatabase()) {
    try {
      const row = await prisma.assistantSettings.upsert({
        where: { id: SETTINGS_ID },
        create: { id: SETTINGS_ID, ...data },
        update: data,
      });
      return rowToSettings(row);
    } catch (error) {
      console.error("[assistant-settings] DB write failed, using memory:", error);
    }
  }

  memorySettings = data;
  return data;
}
