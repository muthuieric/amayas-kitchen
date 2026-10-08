/**
 * In-memory sliding window rate limiter for brute-force attack prevention.
 */

interface RateLimitRecord {
  count: number;
  firstAttempt: number;
  blockedUntil?: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean up stale entries every 10 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      if (now - record.firstAttempt > 1000 * 60 * 60) {
        rateLimitStore.delete(key);
      }
    }
  }, 1000 * 60 * 10);
}

export interface RateLimitOptions {
  maxAttempts: number;
  windowMs: number;
  blockDurationMs: number;
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = {
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes window
    blockDurationMs: 15 * 60 * 1000, // 15 minutes block
  },
): { allowed: boolean; remainingAttempts: number; retryAfterSeconds?: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  // If currently blocked
  if (record?.blockedUntil && now < record.blockedUntil) {
    const retryAfterSeconds = Math.ceil((record.blockedUntil - now) / 1000);
    return {
      allowed: false,
      remainingAttempts: 0,
      retryAfterSeconds,
    };
  }

  // First attempt or expired window
  if (!record || now - record.firstAttempt > options.windowMs) {
    return {
      allowed: true,
      remainingAttempts: options.maxAttempts,
    };
  }

  // Within window
  const remaining = Math.max(0, options.maxAttempts - record.count);
  return {
    allowed: remaining > 0,
    remainingAttempts: remaining,
  };
}

export function recordFailedAttempt(
  identifier: string,
  options: RateLimitOptions = {
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000,
    blockDurationMs: 15 * 60 * 1000,
  },
): { blocked: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  let record = rateLimitStore.get(identifier);

  if (!record || now - record.firstAttempt > options.windowMs) {
    record = {
      count: 1,
      firstAttempt: now,
    };
  } else {
    record.count += 1;
  }

  if (record.count >= options.maxAttempts) {
    record.blockedUntil = now + options.blockDurationMs;
    rateLimitStore.set(identifier, record);
    return {
      blocked: true,
      retryAfterSeconds: Math.ceil(options.blockDurationMs / 1000),
    };
  }

  rateLimitStore.set(identifier, record);
  return { blocked: false };
}

export function resetRateLimit(identifier: string): void {
  rateLimitStore.delete(identifier);
}
