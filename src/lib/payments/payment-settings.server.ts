import { hasDatabase, prisma } from "@/lib/db/prisma.server";

const SETTINGS_ID = "default";

export type PaymentConfig = {
  clientId: string;
  secret: string;
  env: "sandbox" | "live";
  currency: string;
  enabled: boolean;
};

/** نسخة آمنة للعرض في لوحة الإدارة — بلا السرّ. */
export type AdminPaymentSettings = {
  clientId: string;
  env: "sandbox" | "live";
  currency: string;
  enabled: boolean;
  hasSecret: boolean;
};

let memorySettings: {
  paypalClientId: string;
  paypalSecret: string;
  paypalEnv: string;
  currency: string;
  enabled: boolean;
} | null = null;

function fromEnv() {
  const clientId = process.env.PAYPAL_CLIENT_ID ?? "";
  const secret = process.env.PAYPAL_SECRET ?? "";
  return {
    paypalClientId: clientId,
    paypalSecret: secret,
    paypalEnv: process.env.PAYPAL_ENV === "live" ? "live" : "sandbox",
    currency: process.env.PAYPAL_CURRENCY || "USD",
    enabled: Boolean(clientId && secret),
  };
}

async function readRaw() {
  if (hasDatabase()) {
    try {
      const row = await prisma.paymentSettings.findUnique({ where: { id: SETTINGS_ID } });
      if (row && (row.paypalClientId || row.paypalSecret)) {
        return {
          paypalClientId: row.paypalClientId,
          paypalSecret: row.paypalSecret,
          paypalEnv: row.paypalEnv === "live" ? "live" : "sandbox",
          currency: row.currency || "USD",
          enabled: row.enabled,
        };
      }
    } catch (error) {
      console.error("[payment-settings] DB read failed, using env/memory:", error);
    }
  }
  return memorySettings ?? fromEnv();
}

export async function getPaymentConfig(): Promise<PaymentConfig> {
  const raw = await readRaw();
  const enabled = raw.enabled && Boolean(raw.paypalClientId && raw.paypalSecret);
  return {
    clientId: raw.paypalClientId,
    secret: raw.paypalSecret,
    env: raw.paypalEnv === "live" ? "live" : "sandbox",
    currency: raw.currency || "USD",
    enabled,
  };
}

export async function getAdminPaymentSettings(): Promise<AdminPaymentSettings> {
  const raw = await readRaw();
  return {
    clientId: raw.paypalClientId,
    env: raw.paypalEnv === "live" ? "live" : "sandbox",
    currency: raw.currency || "USD",
    enabled: raw.enabled,
    hasSecret: Boolean(raw.paypalSecret),
  };
}

export async function savePaymentSettings(input: {
  clientId: string;
  secret?: string; // فارغ = إبقاء السرّ الحالي
  env: "sandbox" | "live";
  currency: string;
  enabled: boolean;
}): Promise<AdminPaymentSettings> {
  const current = await readRaw();
  const secret = input.secret && input.secret.trim() ? input.secret.trim() : current.paypalSecret;

  const data = {
    paypalClientId: input.clientId.trim(),
    paypalSecret: secret,
    paypalEnv: input.env === "live" ? "live" : "sandbox",
    currency: input.currency.trim() || "USD",
    enabled: input.enabled,
  };

  if (hasDatabase()) {
    try {
      await prisma.paymentSettings.upsert({
        where: { id: SETTINGS_ID },
        create: { id: SETTINGS_ID, ...data },
        update: data,
      });
      return toAdmin(data);
    } catch (error) {
      console.error("[payment-settings] DB write failed, using memory:", error);
    }
  }

  memorySettings = data;
  return toAdmin(data);
}

function toAdmin(data: {
  paypalClientId: string;
  paypalSecret: string;
  paypalEnv: string;
  currency: string;
  enabled: boolean;
}): AdminPaymentSettings {
  return {
    clientId: data.paypalClientId,
    env: data.paypalEnv === "live" ? "live" : "sandbox",
    currency: data.currency,
    enabled: data.enabled,
    hasSecret: Boolean(data.paypalSecret),
  };
}
