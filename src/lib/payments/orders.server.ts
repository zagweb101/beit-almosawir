import { randomUUID } from "node:crypto";
import { hasDatabase, prisma } from "@/lib/db/prisma.server";
import type { AdminOrder } from "@/lib/admin/types";

const memoryOrders = new Map<string, AdminOrder>();

type OrderRow = {
  id: string;
  courseSlug: string;
  courseName: string;
  amount: number;
  currency: string;
  paypalOrderId: string | null;
  status: string;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  createdAt: Date;
};

function rowToOrder(row: OrderRow): AdminOrder {
  return {
    id: row.id,
    courseSlug: row.courseSlug,
    courseName: row.courseName,
    amount: row.amount,
    currency: row.currency,
    paypalOrderId: row.paypalOrderId ?? undefined,
    status: row.status as AdminOrder["status"],
    customerName: row.customerName ?? undefined,
    customerEmail: row.customerEmail ?? undefined,
    customerPhone: row.customerPhone ?? undefined,
    createdAt: row.createdAt.toISOString(),
  };
}

export async function createPendingOrder(input: {
  courseSlug: string;
  courseName: string;
  amount: number;
  currency: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
}): Promise<AdminOrder> {
  const data = {
    courseSlug: input.courseSlug,
    courseName: input.courseName,
    amount: input.amount,
    currency: input.currency,
    status: "pending",
    customerName: input.customerName ?? null,
    customerEmail: input.customerEmail ?? null,
    customerPhone: input.customerPhone ?? null,
  };

  if (hasDatabase()) {
    try {
      const row = await prisma.order.create({ data });
      return rowToOrder(row);
    } catch (error) {
      console.error("[orders] DB create failed, using memory:", error);
    }
  }
  const order: AdminOrder = {
    id: randomUUID(),
    ...input,
    status: "pending",
  };
  memoryOrders.set(order.id, order);
  return order;
}

export async function attachPaypalOrderId(id: string, paypalOrderId: string): Promise<void> {
  if (hasDatabase()) {
    try {
      await prisma.order.update({ where: { id }, data: { paypalOrderId } });
      return;
    } catch (error) {
      console.error("[orders] DB attach failed, using memory:", error);
    }
  }
  const order = memoryOrders.get(id);
  if (order) memoryOrders.set(id, { ...order, paypalOrderId });
}

export async function markOrderStatus(
  paypalOrderId: string,
  status: AdminOrder["status"],
  payer?: { name?: string; email?: string },
): Promise<AdminOrder | null> {
  if (hasDatabase()) {
    try {
      const row = await prisma.order.update({
        where: { paypalOrderId },
        data: {
          status,
          ...(payer?.name ? { customerName: payer.name } : {}),
          ...(payer?.email ? { customerEmail: payer.email } : {}),
        },
      });
      return rowToOrder(row);
    } catch (error) {
      console.error("[orders] DB status update failed, using memory:", error);
    }
  }
  for (const [id, order] of memoryOrders) {
    if (order.paypalOrderId === paypalOrderId) {
      const updated = { ...order, status };
      memoryOrders.set(id, updated);
      return updated;
    }
  }
  return null;
}

export async function listOrders(): Promise<AdminOrder[]> {
  if (hasDatabase()) {
    try {
      const rows = await prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 500 });
      return rows.map(rowToOrder);
    } catch (error) {
      console.error("[orders] DB list failed, using memory:", error);
    }
  }
  return [...memoryOrders.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
