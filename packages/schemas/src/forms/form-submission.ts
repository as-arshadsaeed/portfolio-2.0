import { z } from "zod";

/**
 * Form submission payload used by:
 * - apps/web API routes
 * - sanity submissions
 */
export const formSubmissionSchema = z.object({
  formId: z.string().min(1, "Form ID is required"),

  values: z.record(z.string(), z.string()),
});

export type FormSubmissionInput = z.infer<typeof formSubmissionSchema>;
