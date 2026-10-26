import { z } from "zod";
import { composeMiddleware } from "./middleware";
import { Middleware } from "./middleware";
import { logger } from "@portfolio/logger";

type HandlerCtx<T> = {
  body: T;
  req: Request;
};

export function apiHandler<TSchema extends z.ZodTypeAny>(config: {
  schema: TSchema;
  middleware?: Middleware[];
  handler: (ctx: HandlerCtx<z.infer<TSchema>>) => Promise<unknown>;
}) {
  return async (req: Request): Promise<Response> => {
    const start = Date.now();

    const runMiddleware = composeMiddleware(config.middleware ?? []);

    try {
      await runMiddleware({ req, startTime: start });

      const json = await req.json().catch(() => null);

      const parsed = config.schema.safeParse(json);

      if (!parsed.success) {
        return Response.json(
          {
            success: false,
            error: parsed.error.issues[0]?.message ?? "Invalid request",
          },
          { status: 400 },
        );
      }

      const result = await config.handler({
        body: parsed.data,
        req,
      });

      logger.info("REQUEST_SUCCESS", {
        duration: Date.now() - start,
      });

      return Response.json({
        success: true,
        data: result,
      });
    } catch (err) {
      logger.error(err);

      return Response.json(
        {
          success: false,
          error: err instanceof Error ? err.message : "Internal error",
        },
        { status: 500 },
      );
    }
  };
}
