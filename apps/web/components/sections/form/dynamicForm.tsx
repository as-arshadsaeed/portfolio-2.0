"use client";

import { Form } from "@portfolio/sanity";
import { useEffect, useState } from "react";
import { FieldRenderer } from "./fieldRenderer";
import Magnetic from "@/components/ui/magnetic";
import { useFormValidation } from "@/lib/forms/useFormValidation";

export function DynamicForm({ form }: { form: Form }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { errors, validate, validateField, clearErrors } = useFormValidation(
    form.fields,
  );

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [success]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formEl = e.currentTarget;

    const data = new FormData(formEl);

    const values: Record<string, string> = {};
    data.forEach((v, k) => {
      values[k] = typeof v === "string" ? v.trim() : "";
    });

    if (!validate(values)) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/forms/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formId: form._id,
          values,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err?.error || "Form submission failed");
      }
      clearErrors();
      formEl.reset();
      setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex-1">
      <form onSubmit={handleSubmit} noValidate>
        {form.fields.map((field, i) => (
          <FieldRenderer
            key={field._key}
            field={field}
            index={i}
            error={errors[field.fieldname]}
            validateField={validateField}
          />
        ))}

        <div className="px-10 md:px-20 pb-10 border-t border-t-page-dark-foreground/20 h-0 text-right">
          <Magnetic
            variant="circle"
            type="submit"
            className="cursor-pointer bg-gray-700  text-white md:text-xl translate-y-[-50%]"
            strength={100}
            textStrength={40}
          >
            {loading ? "Submitting..." : "Submit"}
          </Magnetic>
        </div>

        {success && (
          <div className="mt-4 text-green-600 font-medium">
            Form submitted successfully.
          </div>
        )}
      </form>
    </section>
  );
}
