import { randomUUID } from "node:crypto";
import { hasDatabase, prisma } from "@/lib/db/prisma.server";
import type { AdminInstructor, AdminInstructorFields } from "./types";

// احتياطي في الذاكرة عند غياب قاعدة البيانات (تطوير محلي بدون Postgres).
const memoryInstructors = new Map<string, AdminInstructor>();

type InstructorRow = {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  photoUrl: string | null;
  email: string | null;
  phone: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

function rowToInstructor(row: InstructorRow): AdminInstructor {
  return {
    id: row.id,
    name: row.name,
    specialty: row.specialty,
    bio: row.bio,
    photoUrl: row.photoUrl ?? undefined,
    email: row.email ?? undefined,
    phone: row.phone ?? undefined,
    active: row.active,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function normalizeFields(fields: AdminInstructorFields) {
  return {
    name: fields.name.trim(),
    specialty: fields.specialty.trim(),
    bio: fields.bio.trim(),
    photoUrl: fields.photoUrl?.trim() || null,
    email: fields.email?.trim() || null,
    phone: fields.phone?.trim() || null,
    active: fields.active,
  };
}

export async function listInstructors(): Promise<AdminInstructor[]> {
  if (hasDatabase()) {
    try {
      const rows = await prisma.instructor.findMany({ orderBy: { createdAt: "asc" } });
      return rows.map(rowToInstructor);
    } catch (error) {
      console.error("[instructors] DB list failed, using memory:", error);
    }
  }
  return [...memoryInstructors.values()].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export async function createInstructor(fields: AdminInstructorFields): Promise<AdminInstructor> {
  const data = normalizeFields(fields);
  if (!data.name) throw new Error("INVALID_NAME");

  if (hasDatabase()) {
    try {
      const row = await prisma.instructor.create({ data });
      return rowToInstructor(row);
    } catch (error) {
      console.error("[instructors] DB create failed, using memory:", error);
    }
  }

  const now = new Date().toISOString();
  const instructor: AdminInstructor = {
    id: randomUUID(),
    ...data,
    photoUrl: data.photoUrl ?? undefined,
    email: data.email ?? undefined,
    phone: data.phone ?? undefined,
    createdAt: now,
    updatedAt: now,
  };
  memoryInstructors.set(instructor.id, instructor);
  return instructor;
}

export async function updateInstructor(
  id: string,
  fields: AdminInstructorFields,
): Promise<AdminInstructor> {
  const data = normalizeFields(fields);
  if (!data.name) throw new Error("INVALID_NAME");

  if (hasDatabase()) {
    try {
      const row = await prisma.instructor.update({ where: { id }, data });
      return rowToInstructor(row);
    } catch (error) {
      console.error("[instructors] DB update failed, using memory:", error);
    }
  }

  const existing = memoryInstructors.get(id);
  if (!existing) throw new Error("NOT_FOUND");
  const updated: AdminInstructor = {
    ...existing,
    ...data,
    photoUrl: data.photoUrl ?? undefined,
    email: data.email ?? undefined,
    phone: data.phone ?? undefined,
    updatedAt: new Date().toISOString(),
  };
  memoryInstructors.set(id, updated);
  return updated;
}

export async function deleteInstructor(id: string): Promise<void> {
  if (hasDatabase()) {
    try {
      await prisma.instructor.delete({ where: { id } });
      return;
    } catch (error) {
      console.error("[instructors] DB delete failed, using memory:", error);
    }
  }
  memoryInstructors.delete(id);
}
