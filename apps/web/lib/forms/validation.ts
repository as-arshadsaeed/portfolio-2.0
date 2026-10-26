import { z } from "zod";

export const fieldValidators = {
  text: () => z.string(),

  textarea: () => z.string(),

  email: () =>
    z.string().refine((value) => !value || z.email().safeParse(value).success, {
      message: "Invalid email address",
    }),

  number: () => z.coerce.number(),

  phone: () =>
    z.string().regex(/^[0-9+\-\s]{7,20}$/, "Phone number is invalid"),

  select: () => z.string(),
} as const;
