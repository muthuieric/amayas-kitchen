/**
 * Authentication and Cryptographic JWT Engine using Web Crypto API.
 * Fully compatible with Next.js Edge Middleware and Node.js Server Actions.
 */

export const ADMIN_COOKIE_NAME = "admin_session";
const DEFAULT_JWT_SECRET = "amayas-kitchen-secret-key-coastal-dining-2024-secure-token";
export const DEFAULT_ADMIN_PASSWORD = "AmayaAdmin2024!";

export interface AdminJWTPayload {
  sub: string;
  role: "admin";
  iat: number;
  exp: number;
}

function getJwtSecret(): string {
  return process.env.JWT_SECRET || DEFAULT_JWT_SECRET;
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
}

/**
 * Base64 URL Encoding & Decoding helpers for standard RFC 7519 JWT
 */
function base64UrlEncode(str: string): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(str).toString("base64url");
  }
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlEncodeBuffer(buffer: ArrayBuffer): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(buffer).toString("base64url");
  }
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(str: string): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(str, "base64url").toString("utf-8");
  }
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return atob(base64);
}

/**
 * Timing-safe string comparison to protect against side-channel timing attacks
 */
export function timingSafeCompare(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;
  if (a.length !== b.length) return false;

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Signs a JWT with HMAC-SHA256
 */
export async function signJWT(
  payload: Omit<AdminJWTPayload, "iat" | "exp">,
  expiresInSeconds: number = 60 * 60 * 24, // 24 hours
): Promise<string> {
  const secret = getJwtSecret();
  const encoder = new TextEncoder();
  const cryptoSubtle = globalThis.crypto?.subtle;

  if (!cryptoSubtle) {
    throw new Error("Web Crypto API is not available");
  }

  const key = await cryptoSubtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const now = Math.floor(Date.now() / 1000);
  const fullPayload: AdminJWTPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  };
  const body = base64UrlEncode(JSON.stringify(fullPayload));

  const dataToSign = encoder.encode(`${header}.${body}`);
  const signatureBuffer = await cryptoSubtle.sign("HMAC", key, dataToSign);
  const signature = base64UrlEncodeBuffer(signatureBuffer);

  return `${header}.${body}.${signature}`;
}

/**
 * Verifies a JWT and returns payload if valid, or null if invalid / expired
 */
export async function verifyJWT(token: string): Promise<AdminJWTPayload | null> {
  try {
    if (!token || typeof token !== "string") return null;

    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [headerB64, bodyB64, signatureB64] = parts;
    const secret = getJwtSecret();
    const encoder = new TextEncoder();
    const cryptoSubtle = globalThis.crypto?.subtle;

    if (!cryptoSubtle) return null;

    const key = await cryptoSubtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );

    const dataToVerify = encoder.encode(`${headerB64}.${bodyB64}`);
    const expectedSigBuffer = await cryptoSubtle.sign("HMAC", key, dataToVerify);
    const expectedSig = base64UrlEncodeBuffer(expectedSigBuffer);

    if (!timingSafeCompare(signatureB64, expectedSig)) {
      return null;
    }

    const payloadJson = base64UrlDecode(bodyB64);
    const payload = JSON.parse(payloadJson) as AdminJWTPayload;

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null; // Expired
    }

    if (payload.role !== "admin") {
      return null; // Invalid role
    }

    return payload;
  } catch {
    return null;
  }
}
