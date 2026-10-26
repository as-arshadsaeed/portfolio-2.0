import * as Sentry from "@sentry/nextjs";

export type LogMeta = Record<string, unknown>;

function isProd() {
  return process.env.NODE_ENV === "production";
}

export const logger = {
  info(message: string, meta?: LogMeta) {
    if (!isProd()) {
      console.info(message, meta);
    }

    Sentry.addBreadcrumb({
      message,
      level: "info",
      data: meta,
    });
  },

  warn(message: string, meta?: LogMeta) {
    if (!isProd()) {
      console.warn(message, meta);
    }

    Sentry.addBreadcrumb({
      message,
      level: "warning",
      data: meta,
    });
  },

  error(error: unknown, meta?: LogMeta) {
    if (!isProd()) {
      console.error(error);
    }

    Sentry.captureException(error, {
      extra: meta,
    });
  },
};
