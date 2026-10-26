import * as Sentry from "@sentry/nextjs";

type Handler = (req: Request) => Promise<unknown>;

export function webhookHandler(handler: Handler) {
  return async (req: Request): Promise<Response> => {
    try {
      const data = await handler(req);

      return Response.json({ success: true, data });
    } catch (err) {
      Sentry.captureException(err);

      return Response.json(
        {
          success: false,
          error: err instanceof Error ? err.message : "Webhook error",
        },
        { status: 500 },
      );
    }
  };
}
