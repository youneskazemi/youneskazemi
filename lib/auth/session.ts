import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "admin_session";

function getSecretKey(): Uint8Array {
  const secret =
    process.env.ADMIN_SESSION_SECRET ||
    "fallback-secret-for-development-change-in-production-min-32-chars";
  return new TextEncoder().encode(secret);
}

export type AdminSessionPayload = {
  role: "admin";
  iat: number;
  exp: number;
};

export async function createAdminToken(): Promise<string> {
  const secret = getSecretKey();
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyAdminToken(
  token: string
): Promise<AdminSessionPayload | null> {
  try {
    const secret = getSecretKey();
    const { payload } = await jwtVerify(token, secret);
    if (payload && payload.role === "admin") {
      return payload as AdminSessionPayload;
    }
    return null;
  } catch {
    return null;
  }
}

export async function checkIsAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;
  const verified = await verifyAdminToken(token);
  return Boolean(verified);
}

export async function setAdminSessionCookie(): Promise<void> {
  const token = await createAdminToken();
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAdminSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
