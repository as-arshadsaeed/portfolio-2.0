import { z } from "zod";
import { fieldValidators } from "./validation";
import { FormField } from "@portfolio/sanity";

export function buildZodSchema(fields: FormField[]) {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const field of fields) {
    if (!field.fieldname) continue;

    let schema: z.ZodTypeAny = fieldValidators[field.type]?.() ?? z.string();

    if (schema instanceof z.ZodString) {
      let stringSchema = schema;
      if (field.validation?.required) {
        stringSchema = stringSchema.min(1, `${field.label} is required`);
      }

      if (field.validation?.minLength) {
        stringSchema = stringSchema.min(
          field.validation.minLength,
          `${field.label} must be at least ${field.validation.minLength} characters`,
        );
      }

      if (field.validation?.maxLength) {
        stringSchema = stringSchema.max(
          field.validation.maxLength,
          `${field.label} must be at most ${field.validation.maxLength} characters`,
        );
      }
      schema = stringSchema;
    }

    if (!field.validation?.required) {
      schema = schema.optional();
    }

    shape[field.fieldname] = schema;
  }

  return z.object(shape);
}
