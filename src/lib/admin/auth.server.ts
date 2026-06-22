import { randomUUID, timingSafeEqual } from "node:crypto";
import { hasDatabase, prisma } from "@/lib/db/prisma.server";

const TTL_MS = 12 * 60 * 60 * 1000;

const memorySessions = new Map<string, number>();

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "changeme-strong-password-here";
}

function safeEqualString(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) {
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

export async function createAdminSession(): Promise<string> {
  const token = randomUUID();
  const expiresAt = new Date(Date.now() + TTL_MS);

  if (hasDatabase()) {
    try {
      await prisma.adminSession.create({
        data: { token, expiresAt },
      });
      return token;
    } catch (error) {
      console.error("[admin-auth] DB session create failed, using memory:", error);
    }
  }

  memorySessions.set(token, Date.now() + TTL_MS);
  return token;
}

export async function assertAdminSession(token: string | undefined): Promise<void> {
  if (!token) throw new Error("UNAUTHORIZED");

  if (hasDatabase()) {
    try {
      const session = await prisma.adminSession.findUnique({ where: { token } });
      if (!session) throw new Error("UNAUTHORIZED");
      if (session.expiresAt.getTime() < Date.now()) {
        await prisma.adminSession.delete({ where: { token } }).catch(() => {});
        throw new Error("UNAUTHORIZED");
      }
      return;
    } catch (error) {
      if (error instanceof Error && error.message === "UNAUTHORIZED") throw error;
      console.error("[admin-auth] DB session check failed, using memory:", error);
    }
  }

  const expires = memorySessions.get(token);
  if (!expires || Date.now() > expires) {
    memorySessions.delete(token);
    throw new Error("UNAUTHORIZED");
  }
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const expected = getAdminPassword();
  return safeEqualString(password, expected);
}

export async function cleanupExpiredSessions(): Promise<void> {
  if (hasDatabase()) {
    try {
      await prisma.adminSession.deleteMany({
        where: { expiresAt: { lt: new Date() } },
      });
    } catch (error) {
      console.error("[admin-auth] session cleanup failed:", error);
    }
  }
  const now = Date.now();
  for (const [token, expires] of memorySessions) {
    if (expires < now) memorySessions.delete(token);
  }
}
