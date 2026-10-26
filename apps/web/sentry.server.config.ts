import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enabled: process.env.NODE_ENV === "production",
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.05 : 0.05,
  sendDefaultPii: false,
});
