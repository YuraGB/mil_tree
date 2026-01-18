// otel/index.ts
import "server-only";
export const enableOtel =
  process.env.NODE_ENV === "development" && process.env.OTEL_ENABLED === "1";
