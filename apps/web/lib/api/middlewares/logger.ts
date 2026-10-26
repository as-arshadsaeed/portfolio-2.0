import { logger } from "@portfolio/logger";
import { Middleware } from "../middleware";

export function loggerMiddleware(): Middleware {
  return async (ctx) => {
    logger.info("REQUEST_START", {
      url: ctx.req.url,
      time: ctx.startTime,
    });
  };
}
