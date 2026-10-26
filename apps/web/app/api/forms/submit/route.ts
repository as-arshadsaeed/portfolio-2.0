import { apiHandler } from "@/lib/api/api-handler";
import { formSubmissionSchema } from "@portfolio/schemas";
import { sanityWriteClient } from "@/lib/sanity/client";
import { loggerMiddleware } from "@/lib/api/middlewares/logger";
import { rateLimitMiddleware } from "@/lib/api/middlewares/rate-limit";

export const POST = apiHandler({
  schema: formSubmissionSchema,

  middleware: [loggerMiddleware(), rateLimitMiddleware()],

  async handler({ body }) {
    const { formId, values } = body;

    const formattedValues = Object.entries(values).map(([key, value]) => ({
      _key: crypto.randomUUID(),
      _type: "object",
      key,
      value: String(value ?? ""),
    }));

    const doc = await sanityWriteClient.create({
      _type: "formSubmission",
      form: {
        _type: "reference",
        _ref: formId,
      },
      submittedAt: new Date().toISOString(),
      values: formattedValues,
    });

    return { id: doc._id };
  },
});
