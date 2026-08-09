import { createHash } from "node:crypto";
import { createClient } from "@/lib/supabase/server";

type RateLimitRow = {
  allowed: boolean;
  retry_after_seconds: number;
};

type RateLimitResult = {
  allowed: boolean;
  retryAfter: number;
};

function getRequestIdentifier(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";

  return `${ip}:${userAgent}`;
}

export async function checkRateLimit(
  request: Request,
  scope: string,
  limit: number,
  windowSeconds: number,
): Promise<RateLimitResult> {
  const identifier = getRequestIdentifier(request);
  const salt =
    process.env.RATE_LIMIT_SECRET ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "interbearing";
  const key = createHash("sha256")
    .update(`${salt}:${scope}:${identifier}`)
    .digest("hex");

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("check_request_rate_limit", {
      p_key: key,
      p_limit: limit,
      p_window_seconds: windowSeconds,
    });

    if (error) {
      console.error("Rate limit check failed", { scope, error });
      return { allowed: true, retryAfter: 0 };
    }

    const row = (Array.isArray(data) ? data[0] : data) as RateLimitRow | null;

    if (!row) {
      return { allowed: true, retryAfter: 0 };
    }

    return {
      allowed: Boolean(row.allowed),
      retryAfter: Math.max(1, Number(row.retry_after_seconds) || 1),
    };
  } catch (error) {
    console.error("Rate limit service failed", { scope, error });
    return { allowed: true, retryAfter: 0 };
  }
}

