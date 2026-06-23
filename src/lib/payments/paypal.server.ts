/**
 * تكامل PayPal عبر REST API. يُفعّل بمتغيرات البيئة:
 * - PAYPAL_CLIENT_ID, PAYPAL_SECRET (مطلوبة)
 * - PAYPAL_ENV: "live" أو "sandbox" (افتراضي sandbox)
 * - PAYPAL_CURRENCY: عملة التحصيل في PayPal (افتراضي USD — PayPal لا يدعم SAR)
 */

export function isPaypalEnabled(): boolean {
  return Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_SECRET);
}

export function getPaypalClientId(): string {
  return process.env.PAYPAL_CLIENT_ID ?? "";
}

export function getPaypalCurrency(): string {
  return process.env.PAYPAL_CURRENCY || "USD";
}

function getBaseUrl(): string {
  return process.env.PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
}

async function getAccessToken(): Promise<string> {
  const id = process.env.PAYPAL_CLIENT_ID ?? "";
  const secret = process.env.PAYPAL_SECRET ?? "";
  const auth = Buffer.from(`${id}:${secret}`).toString("base64");
  const res = await fetch(`${getBaseUrl()}/v1/oauth2/token`, {
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

export async function createPaypalOrder(input: {
  amount: number;
  currency: string;
  description: string;
  referenceId: string;
}): Promise<{ id: string }> {
  const token = await getAccessToken();
  const res = await fetch(`${getBaseUrl()}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: input.referenceId,
          description: input.description.slice(0, 127),
          amount: {
            currency_code: input.currency,
            value: input.amount.toFixed(2),
          },
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
  paypalOrderId: string,
): Promise<{ status: string; payer?: { name?: string; email?: string } }> {
  const token = await getAccessToken();
  const res = await fetch(`${getBaseUrl()}/v2/checkout/orders/${paypalOrderId}/capture`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
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
