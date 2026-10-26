type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const store = new Map<string, RateLimitEntry>();

type RateLimitOptions = {
  limit: number; // max requests
  windowMs: number; // time window
};

export function rateLimit(
  key: string,
  options: RateLimitOptions,
): { success: boolean; remaining: number; retryAfter?: number } {
  const now = Date.now();

  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, {
      count: 1,
      resetAt: now + options.windowMs,
    });

    return {
      success: true,
      remaining: options.limit - 1,
    };
  }

  if (entry.count >= options.limit) {
    return {
      success: false,
      remaining: 0,
      retryAfter: entry.resetAt,
    };
  }

  entry.count++;

  return {
    success: true,
    remaining: options.limit - entry.count,
  };
}
