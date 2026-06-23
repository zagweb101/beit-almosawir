import { getRequestHeader, getRequestIP } from "@tanstack/react-start/server";

type Attempt = { count: number; firstAt: number; lockedUntil?: number };

const attempts = new Map<string, Attempt>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // نافذة احتساب المحاولات
const LOCK_MS = 15 * 60 * 1000; // مدة القفل بعد تجاوز الحدّ

/** يستخرج IP العميل من ترويسات الطلب (Railway يضبط x-forwarded-for). */
export function getClientIp(): string {
  try {
    const xff = getRequestHeader("x-forwarded-for");
    if (xff) return xff.split(",")[0].trim();
    const real = getRequestHeader("x-real-ip");
    if (real) return real.trim();
    const ip = getRequestIP({ xForwardedFor: true });
    if (ip) return ip;
  } catch {
    /* لا يوجد سياق طلب */
  }
  return "unknown";
}

export function checkLoginRateLimit(key: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const a = attempts.get(key);
  if (a?.lockedUntil && a.lockedUntil > now) {
    return { allowed: false, retryAfterSec: Math.ceil((a.lockedUntil - now) / 1000) };
  }
  return { allowed: true, retryAfterSec: 0 };
}

export function recordLoginFailure(key: string): void {
  const now = Date.now();
  let a = attempts.get(key);
  if (!a || now - a.firstAt > WINDOW_MS) {
    a = { count: 0, firstAt: now };
  }
  a.count += 1;
  if (a.count >= MAX_ATTEMPTS) {
    a.lockedUntil = now + LOCK_MS;
  }
  attempts.set(key, a);
}

export function clearLoginAttempts(key: string): void {
  attempts.delete(key);
}
