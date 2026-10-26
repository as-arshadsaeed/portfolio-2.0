import { logger } from "@portfolio/logger";
import { Middleware } from "../middleware";

export function errorMiddleware(): Middleware {
  return async () => {
    logger.info("request processed");
  };
}
