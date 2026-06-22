const sessions = new Map<string, number>();
const TTL_MS = 12 * 60 * 60 * 1000;

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "beit-almosawer-admin";
}

export function createAdminSession(): string {
  const token = crypto.randomUUID();
  sessions.set(token, Date.now() + TTL_MS);
  return token;
}

export function assertAdminSession(token: string | undefined): void {
  if (!token) throw new Error("UNAUTHORIZED");
  const expires = sessions.get(token);
  if (!expires || Date.now() > expires) {
    sessions.delete(token ?? "");
    throw new Error("UNAUTHORIZED");
  }
}

export function verifyAdminPassword(password: string): boolean {
  return password === getAdminPassword();
}
