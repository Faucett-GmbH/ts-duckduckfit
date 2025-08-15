import type { ZodError } from 'zod';

export function issuesToFieldMap(
  issues: Array<{ path: Array<string | number | symbol>; message?: string }>
) {
  const out: Record<string, string> = {};
  for (const i of issues) {
    const key = i.path.length ? i.path.join('.') : '_root';
    if (!out[key] && i.message) out[key] = i.message;
  }
  return out;
}


export type ValidationResult<T> = {
  ok: boolean;
  data?: T,
  errors: Record<string, string>;
}

export function validate<T>(
  schema: {
    safeParse: (v: unknown) => { success: true; data: T } | { success: false; error: ZodError<unknown> }
  },
  v: unknown
): ValidationResult<T> {
  const result = schema.safeParse(v);
  if (result.success) {
    return {
      ok: true,
      data: result.data,
      errors: {}
    }
  } else {
    return {
      ok: false,
      errors: issuesToFieldMap(result.error.issues)
    }
  }
}