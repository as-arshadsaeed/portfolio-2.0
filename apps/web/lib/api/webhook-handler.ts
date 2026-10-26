import { logger } from "@portfolio/logger";

type Handler = (req: Request) => Promise<unknown>;

export function webhookHandler(handler: Handler) {
  return async (req: Request): Promise<Response> => {
    logger.info("WEBHOOK_RECEIVED");

    try {
      const result = await handler(req);

      logger.info("WEBHOOK_SUCCESS");

      return Response.json({
        success: true,
        data: result,
      });
    } catch (err) {
      logger.error(err);

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
