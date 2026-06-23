import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { mergedCatalog } from "@/lib/admin/catalog.server";
import { readAdminStore } from "@/lib/admin/store.server";
import { assertAdminSession } from "@/lib/admin/auth.server";
import { convertAmount } from "@/lib/money";
import type { CurrencyCode } from "@/types/platform";
import {
  capturePaypalOrder,
  createPaypalOrder,
  getPaypalClientId,
  getPaypalCurrency,
  isPaypalEnabled,
} from "./paypal.server";
import {
  attachPaypalOrderId,
  createPendingOrder,
  listOrders,
  markOrderStatus,
} from "./orders.server";

type CoursePayment = {
  payable: boolean;
  name: string;
  amount: number;
  currency: string;
};

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

function toPaypalAmount(amount: number, fromCurrency: string): number {
  const target = getPaypalCurrency();
  if (fromCurrency === target) return amount;
  return convertAmount(amount, fromCurrency as CurrencyCode, target as CurrencyCode);
}

export const getPaymentConfigFn = createServerFn({ method: "GET" }).handler(async () => {
  return {
    enabled: isPaypalEnabled(),
    clientId: getPaypalClientId(),
    paypalCurrency: getPaypalCurrency(),
  };
});

export const getCoursePaymentInfoFn = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string().min(1) }))
  .handler(async ({ data }) => {
    const info = await getCoursePayment(data.slug);
    return {
      ...info,
      paypalEnabled: isPaypalEnabled(),
      paypalAmount: info.payable ? toPaypalAmount(info.amount, info.currency) : 0,
      paypalCurrency: getPaypalCurrency(),
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
    if (!isPaypalEnabled()) throw new Error("PAYMENTS_DISABLED");
    const info = await getCoursePayment(data.courseSlug);
    if (!info.payable) throw new Error("COURSE_NOT_PAYABLE");

    const paypalCurrency = getPaypalCurrency();
    const paypalAmount = toPaypalAmount(info.amount, info.currency);

    const order = await createPendingOrder({
      courseSlug: data.courseSlug,
      courseName: info.name,
      amount: paypalAmount,
      currency: paypalCurrency,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
    });

    const paypalOrder = await createPaypalOrder({
      amount: paypalAmount,
      currency: paypalCurrency,
      description: `دورة ${info.name}`,
      referenceId: order.id,
    });

    await attachPaypalOrderId(order.id, paypalOrder.id);
    return { orderId: order.id, paypalOrderId: paypalOrder.id };
  });

export const capturePaypalOrderFn = createServerFn({ method: "POST" })
  .validator(z.object({ paypalOrderId: z.string().min(1) }))
  .handler(async ({ data }) => {
    if (!isPaypalEnabled()) throw new Error("PAYMENTS_DISABLED");
    const result = await capturePaypalOrder(data.paypalOrderId);
    const paid = result.status === "COMPLETED";
    await markOrderStatus(data.paypalOrderId, paid ? "paid" : "failed", result.payer);
    return { ok: paid, status: result.status };
  });

export const listOrdersFn = createServerFn({ method: "GET" })
  .validator(z.object({ token: z.string().min(1) }))
  .handler(async ({ data }) => {
    await assertAdminSession(data.token);
    return listOrders();
  });
