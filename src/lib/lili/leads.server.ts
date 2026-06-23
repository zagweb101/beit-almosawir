import { randomUUID } from "node:crypto";
import { hasDatabase, prisma } from "@/lib/db/prisma.server";
import { notifyNewLead } from "./notifications.server";
import type { LeadInput, LeadRecord } from "@/types/lili";

// احتياطي في الذاكرة عند غياب قاعدة البيانات (تطوير محلي).
const memoryLeads = new Map<string, LeadRecord>();

type LeadRow = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  courseSlug: string | null;
  courseName: string | null;
  note: string | null;
  createdAt: Date;
};

function rowToLead(row: LeadRow): LeadRecord {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email ?? undefined,
    courseSlug: row.courseSlug ?? undefined,
    courseName: row.courseName ?? undefined,
    note: row.note ?? undefined,
    createdAt: row.createdAt.toISOString(),
  };
}

function normalize(input: LeadInput) {
  return {
    name: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email?.trim() || null,
    courseSlug: input.courseSlug?.trim() || null,
    courseName: input.courseName?.trim() || null,
    note: input.note?.trim() || null,
  };
}

export async function createLead(input: LeadInput): Promise<LeadRecord> {
  const data = normalize(input);
  if (!data.name || data.phone.replace(/\D/g, "").length < 9) {
    throw new Error("INVALID_LEAD");
  }

  if (hasDatabase()) {
    try {
      const row = await prisma.lead.create({ data });
      const lead = rowToLead(row);
      void notifyNewLead(lead);
      return lead;
    } catch (error) {
      console.error("[leads] DB create failed, using memory:", error);
    }
  }

  const lead: LeadRecord = {
    id: randomUUID(),
    name: data.name,
    phone: data.phone,
    email: data.email ?? undefined,
    courseSlug: data.courseSlug ?? undefined,
    courseName: data.courseName ?? undefined,
    note: data.note ?? undefined,
    createdAt: new Date().toISOString(),
  };
  memoryLeads.set(lead.id, lead);
  void notifyNewLead(lead);
  return lead;
}

export async function listLeads(): Promise<LeadRecord[]> {
  if (hasDatabase()) {
    try {
      const rows = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 500 });
      return rows.map(rowToLead);
    } catch (error) {
      console.error("[leads] DB list failed, using memory:", error);
    }
  }
  return [...memoryLeads.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function deleteLead(id: string): Promise<void> {
  if (hasDatabase()) {
    try {
      await prisma.lead.delete({ where: { id } });
      return;
    } catch (error) {
      console.error("[leads] DB delete failed, using memory:", error);
    }
  }
  memoryLeads.delete(id);
}
