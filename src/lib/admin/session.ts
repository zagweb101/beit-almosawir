const TOKEN_KEY = "bm_admin_token";

export function getAdminToken(): string | null {
  if (typeof sessionStorage === "undefined") return null;
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

export function requireAdminToken(): string {
  const token = getAdminToken();
  if (!token) throw new Error("UNAUTHORIZED");
  return token;
}
