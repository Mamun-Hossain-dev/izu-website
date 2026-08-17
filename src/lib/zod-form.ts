import type { ZodType } from "zod";

export function getFieldErrors(
  schema: ZodType,
  values: unknown
): Record<string, string> {
  const result = schema.safeParse(values);
  if (result.success) return {};

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const path = issue.path.join(".");
    if (!path || errors[path]) continue;
    errors[path] = issue.message;
  }
  return errors;
}