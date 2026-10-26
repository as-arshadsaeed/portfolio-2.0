"use client";

import { FormField } from "@portfolio/sanity";

type Props = {
  field: FormField;
  index: number;
  error?: string;
  validateField: (name: string, value: string) => void;
};

export function FieldRenderer({ field, index, error, validateField }: Props) {
  const fieldId = field.fieldname || field._key;

  const placeholder = field.validation?.required
    ? `${field.placeholder} *`
    : field.placeholder;

  const baseProps = {
    id: fieldId,
    name: fieldId,
    placeholder,
    className:
      "w-full bg-transparent text-[clamp(1em,2.3vw,1.3em)] outline-none",
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    validateField(field.fieldname, e.target.value);
  };

  const renderField = () => {
    switch (field.type) {
      case "textarea":
        return (
          <textarea
            {...baseProps}
            rows={4}
            onChange={(e) => validateField(field.fieldname, e.target.value)}
            className="resize-none w-full"
          />
        );

      case "select":
        return (
          <select {...baseProps} defaultValue="" onChange={handleChange}>
            <option value="" disabled>
              Select an option
            </option>

            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case "email":
        return (
          <input
            {...baseProps}
            type="email"
            autoComplete="email"
            onChange={handleChange}
          />
        );

      case "number":
        return (
          <input
            {...baseProps}
            type="number"
            inputMode="numeric"
            onChange={handleChange}
          />
        );

      case "text":
      default:
        return <input {...baseProps} type="text" onChange={handleChange} />;
    }
  };

  return (
    <div className="relative border-t border-t-page-dark-foreground/20 py-10 md:py-15 px-10 md:px-20">
      <span className="absolute left-0 text-xs opacity-50">
        {String(index + 1).padStart(2, "0")}
      </span>

      <label
        htmlFor={fieldId}
        className="mb-3 -mt-1 block text-[clamp(1em,2.3vw,1.3em)] font-medium"
      >
        {field.label}
      </label>

      {renderField()}

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
