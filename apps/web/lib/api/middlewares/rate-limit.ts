import { logger } from "@portfolio/logger";
import { Middleware } from "../middleware";

export function rateLimitMiddleware(): Middleware {
  return async (ctx) => {
    logger.info("RATE_LIMIT_CHECK", {
      url: ctx.req.url,
    });
  };
}
