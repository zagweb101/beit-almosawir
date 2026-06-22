import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { hasDatabase } from "@/lib/db/prisma.server";
import {
  migrateFileStoreToDb,
  readAdminStoreFromDb,
  writeAdminStoreToDb,
} from "./store-db.server";
import type { AdminStore } from "./types";
import { EMPTY_ADMIN_STORE } from "./types";

const DATA_FILE = path.join(process.cwd(), "data", "admin-courses.json");

async function readAdminStoreFromFile(): Promise<AdminStore> {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as AdminStore;
    return {
      overrides: parsed.overrides ?? {},
      customCourses: parsed.customCourses ?? [],
      deletedSlugs: parsed.deletedSlugs ?? [],
    };
  } catch {
    return { ...EMPTY_ADMIN_STORE };
  }
}

async function writeAdminStoreToFile(store: AdminStore): Promise<void> {
  await mkdir(path.dirname(DATA_FILE), { recursive: true });
  await writeFile(DATA_FILE, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

export async function readAdminStore(): Promise<AdminStore> {
  if (hasDatabase()) {
    try {
      const fileStore = await readAdminStoreFromFile();
      await migrateFileStoreToDb(fileStore);
      return readAdminStoreFromDb();
    } catch (error) {
      console.error("[admin-store] DB read failed, falling back to file:", error);
    }
  }
  return readAdminStoreFromFile();
}

export async function writeAdminStore(store: AdminStore): Promise<void> {
  if (hasDatabase()) {
    try {
      await writeAdminStoreToDb(store);
      await writeAdminStoreToFile(store);
      return;
    } catch (error) {
      console.error("[admin-store] DB write failed, falling back to file:", error);
    }
  }
  await writeAdminStoreToFile(store);
}
