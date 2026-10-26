import * as Sentry from "@sentry/nextjs";
import { z } from "zod";
import { ApiError } from "./api-error";

type HandlerCtx<TBody> = {
  body: TBody;
  req: Request;
};

type SchemaMode<TSchema extends z.ZodTypeAny | undefined> =
  TSchema extends z.ZodTypeAny ? z.infer<TSchema> : unknown;

export function apiHandler<TSchema extends z.ZodTypeAny | undefined>(config: {
  schema?: TSchema;
  handler: (ctx: HandlerCtx<SchemaMode<TSchema>>) => Promise<unknown>;
}) {
  return async (req: Request): Promise<Response> => {
    try {
      let body: unknown;

      if (config.schema) {
        const json = await req.json().catch(() => null);

        const parsed = config.schema.safeParse(json);

        if (!parsed.success) {
          throw new ApiError(
            parsed.error.issues[0]?.message || "Invalid request",
            400,
          );
        }

        body = parsed.data;
      }

      const data = await config.handler({
        body: body as SchemaMode<TSchema>,
        req,
      });

      return Response.json({
        success: true,
        data,
      });
    } catch (err) {
      Sentry.captureException(err);

      const status = err instanceof ApiError ? err.status : 500;

      return Response.json(
        {
          success: false,
          error: err instanceof Error ? err.message : "Internal Server Error",
        },
        { status },
      );
    }
  };
}
