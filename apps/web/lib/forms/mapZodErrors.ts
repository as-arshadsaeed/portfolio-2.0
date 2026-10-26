import { z } from "zod";

export function mapZodErrors(
  result: z.ZodSafeParseError<unknown>,
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const issue of result.error.issues) {
    const key = String(issue.path[0]);

    if (!key) continue;

    if (!errors[key]) {
      errors[key] = issue.message;
    }
  }

  return errors;
}
