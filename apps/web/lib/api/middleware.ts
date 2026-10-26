import { MiddlewareCtx } from "./types";

export type Middleware = (ctx: MiddlewareCtx) => void | Promise<void>;

export function composeMiddleware(middlewares: Middleware[]) {
  return async (ctx: MiddlewareCtx) => {
    for (const mw of middlewares) {
      await mw(ctx);
    }
  };
}
