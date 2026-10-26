export function normalizeText(value?: string) {
  if (!value) return "";
  return value.replace(/\\n/g, "\n");
}
