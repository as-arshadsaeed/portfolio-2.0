export type FormFieldType = "text" | "email" | "number" | "textarea" | "select";

export type FormField = {
  _key?: string;
  fieldname: string;
  label: string;
  placeholder: string;
  type: FormFieldType;
  options?: string[];
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
  };
};

export interface Form {
  _id: string;
  title: string;
  fields: FormField[];
}

export interface FormSection {
  _key: string;
  _type: "formSection";

  heading?: string;
  description?: string;

  form: Form;
}
