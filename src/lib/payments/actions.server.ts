import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { mergedCatalog } from "@/lib/admin/catalog.server";
import { readAdminStore } from "@/lib/admin/store.server";
import { assertAdminSession } from "@/lib/admin/auth.server";
import { convertAmount } from "@/lib/money";
import type { CurrencyCode } from "@/types/platform";
import { capturePaypalOrder, createPaypalOrder } from "./paypal.server";
import {
  getAdminPaymentSettings,
  getPaymentConfig,
  savePaymentSettings,
} from "./payment-settings.server";
import {
  attachPaypalOrderId,
  createPendingOrder,
  listOrders,
  markOrderStatus,
} from "./orders.server";

type CoursePayment = { payable: boolean; name: string; amount: number; currency: string };

async function getCoursePayment(slug: string): Promise<CoursePayment> {
  const store = await readAdminStore();
  const custom = store.customCourses.find((c) => c.slug === slug);
  const override = store.overrides[slug];
  const amount = custom?.priceAmount ?? override?.priceAmount;
  const currency = custom?.currency ?? override?.currency ?? "SAR";

  const catalog = await mergedCatalog("ar");
  const entry = catalog.find((e) => e.course.slug === slug);
  const name = entry?.course.name ?? slug;

  return {
    payable: typeof amount === "number" && amount > 0,
    name,
    amount: amount ?? 0,
    currency,
  };
}

function toPaypalAmount(amount: number, fromCurrency: string, targetCurrency: string): number {
  if (fromCurrency === targetCurrency) return amount;
  return convertAmount(amount, fromCurrency as CurrencyCode, targetCurrency as CurrencyCode);
}

// ——— القراءة العامة (للموقع) ———

export const getPaymentConfigFn = createServerFn({ method: "GET" }).handler(async () => {
  const config = await getPaymentConfig();
  return {
    enabled: config.enabled,
    clientId: config.clientId,
    paypalCurrency: config.currency,
  };
});

export const getCoursePaymentInfoFn = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string().min(1) }))
  .handler(async ({ data }) => {
    const config = await getPaymentConfig();
    const info = await getCoursePayment(data.slug);
    return {
      ...info,
      paypalEnabled: config.enabled,
      paypalAmount: info.payable ? toPaypalAmount(info.amount, info.currency, config.currency) : 0,
      paypalCurrency: config.currency,
    };
  });

export const createPaypalOrderFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      courseSlug: z.string().min(1),
      customerName: z.string().optional(),
      customerEmail: z.string().optional(),
      customerPhone: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const config = await getPaymentConfig();
    if (!config.enabled) throw new Error("PAYMENTS_DISABLED");
    const info = await getCoursePayment(data.courseSlug);
    if (!info.payable) throw new Error("COURSE_NOT_PAYABLE");

    const paypalAmount = toPaypalAmount(info.amount, info.currency, config.currency);
    const order = await createPendingOrder({
      courseSlug: data.courseSlug,
      courseName: info.name,
      amount: paypalAmount,
      currency: config.currency,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
    });

    const paypalOrder = await createPaypalOrder(config, {
      amount: paypalAmount,
      currency: config.currency,
      description: `دورة ${info.name}`,
      referenceId: order.id,
    });

    await attachPaypalOrderId(order.id, paypalOrder.id);
    return { orderId: order.id, paypalOrderId: paypalOrder.id };
  });

export const capturePaypalOrderFn = createServerFn({ method: "POST" })
  .validator(z.object({ paypalOrderId: z.string().min(1) }))
  .handler(async ({ data }) => {
    const config = await getPaymentConfig();
    if (!config.enabled) throw new Error("PAYMENTS_DISABLED");
    const result = await capturePaypalOrder(config, data.paypalOrderId);
    const paid = result.status === "COMPLETED";
    await markOrderStatus(data.paypalOrderId, paid ? "paid" : "failed", result.payer);
    return { ok: paid, status: result.status };
  });

// ——— إدارة (محمية) ———

export const listOrdersFn = createServerFn({ method: "GET" })
  .validator(z.object({ token: z.string().min(1) }))
  .handler(async ({ data }) => {
    await assertAdminSession(data.token);
    return listOrders();
  });

export const getPaymentSettingsFn = createServerFn({ method: "GET" })
  .validator(z.object({ token: z.string().min(1) }))
  .handler(async ({ data }) => {
    await assertAdminSession(data.token);
    return getAdminPaymentSettings();
  });

export const savePaymentSettingsFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      token: z.string().min(1),
      clientId: z.string(),
      secret: z.string().optional(),
      env: z.enum(["sandbox", "live"]),
      currency: z.string(),
      enabled: z.boolean(),
    }),
  )
  .handler(async ({ data }) => {
    await assertAdminSession(data.token);
    return savePaymentSettings({
      clientId: data.clientId,
      secret: data.secret,
      env: data.env,
      currency: data.currency,
      enabled: data.enabled,
    });
  });
