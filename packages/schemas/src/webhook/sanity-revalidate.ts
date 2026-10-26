import { z } from "zod";

export const sanityRevalidateSchema = z.object({
  _type: z.string(),
  slug: z
    .union([
      z.string(),
      z.object({
        current: z.string(),
      }),
      z.null(),
      z.undefined(),
    ])
    .optional(),
});

export type SanityRevalidateInput = z.infer<typeof sanityRevalidateSchema>;
