export class HttpError extends Error {
  constructor(public status: number, message: string, public details?: unknown) {
    super(message);
  }
}

export const ok = <T>(data: T, meta?: Record<string, unknown>) => ({
  data,
  ...(meta ? { meta } : {})
});
