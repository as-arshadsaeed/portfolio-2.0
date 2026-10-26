import { useMemo, useState } from "react";
import { buildZodSchema } from "./buildZodSchema";
import { FormField } from "@portfolio/sanity";
import { mapZodErrors } from "./mapZodErrors";

export function useFormValidation(fields: FormField[]) {
  const schema = useMemo(() => buildZodSchema(fields), [fields]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(values: Record<string, string>) {
    const result = schema.safeParse(values);

    if (!result.success) {
      setErrors(mapZodErrors(result));
      return false;
    }

    setErrors({});
    return true;
  }

  function validateField(name: string, value: unknown) {
    const fieldSchema = schema.shape[name];

    if (!fieldSchema) return true;

    const result = fieldSchema.safeParse(value);

    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        [name]: result.error.issues[0]?.message ?? "Invalid field",
      }));

      return false;
    }

    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });

    return true;
  }

  return {
    errors,
    validate,
    validateField,
    clearErrors: () => setErrors({}),
  };
}
