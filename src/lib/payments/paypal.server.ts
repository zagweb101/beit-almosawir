import type { PaymentConfig } from "./payment-settings.server";

/** تكامل PayPal عبر REST API. تُمرَّر الإعدادات من قاعدة البيانات (أو متغيرات البيئة). */

function getBaseUrl(env: PaymentConfig["env"]): string {
  return env === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
}

async function getAccessToken(config: PaymentConfig): Promise<string> {
  const auth = Buffer.from(`${config.clientId}:${config.secret}`).toString("base64");
  const res = await fetch(`${getBaseUrl(config.env)}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      authorization: `Basic ${auth}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) {
    throw new Error(`PAYPAL_AUTH_FAILED:${res.status}`);
  }
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export async function createPaypalOrder(
  config: PaymentConfig,
  input: { amount: number; currency: string; description: string; referenceId: string },
): Promise<{ id: string }> {
  const token = await getAccessToken(config);
  const res = await fetch(`${getBaseUrl(config.env)}/v2/checkout/orders`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: input.referenceId,
          description: input.description.slice(0, 127),
          amount: { currency_code: input.currency, value: input.amount.toFixed(2) },
        },
      ],
    }),
  });
  if (!res.ok) {
    throw new Error(`PAYPAL_CREATE_FAILED:${res.status}:${await res.text()}`);
  }
  const data = (await res.json()) as { id: string };
  return { id: data.id };
}

export async function capturePaypalOrder(
  config: PaymentConfig,
  paypalOrderId: string,
): Promise<{ status: string; payer?: { name?: string; email?: string } }> {
  const token = await getAccessToken(config);
  const res = await fetch(`${getBaseUrl(config.env)}/v2/checkout/orders/${paypalOrderId}/capture`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
  });
  if (!res.ok) {
    throw new Error(`PAYPAL_CAPTURE_FAILED:${res.status}:${await res.text()}`);
  }
  const data = (await res.json()) as {
    status: string;
    payer?: { name?: { given_name?: string; surname?: string }; email_address?: string };
  };
  const given = data.payer?.name?.given_name ?? "";
  const surname = data.payer?.name?.surname ?? "";
  return {
    status: data.status,
    payer: {
      name: `${given} ${surname}`.trim() || undefined,
      email: data.payer?.email_address,
    },
  };
}
