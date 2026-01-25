import Elysia from "elysia";
import { IS_VERCEL } from "@/constants";
import { batchSpanProcessor } from "@/lib/otel/batchSpanProcessor";
import { utilityRoutes } from "@/elysia/modules/utilityRoutes/utilityHandlers";
import { betterAuthView } from "@/elysia/modules/auth/auth.route";
import { globalError } from "@/elysia/modules/globalError";
import { apiRoutesPath } from "@/elysia/modules/apiRoutes";

/**
 * Main application instance combining utility routes, authentication, API routes, and global error handling.
 * Includes optional shutdown logic for flushing telemetry data.
 */
const app = new Elysia()
  // Utility routes
  .use(utilityRoutes)
  // Authentication routes
  .all("/api/auth/*", betterAuthView)
  // API routes
  .use(apiRoutesPath)
  // Global error handler
  .use(globalError);

// Optional shutdown logic
const shutdown = async (): Promise<void> => {
  if (!IS_VERCEL && batchSpanProcessor) {
    await batchSpanProcessor.forceFlush();
  }
};

if (!IS_VERCEL) {
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

// Export the application type for use elsewhere
export type App = typeof app;

// Export HTTP method handlers
export const GET = app.fetch;
export const POST = app.fetch;
export const PUT = app.fetch;
export const DELETE = app.fetch;
export const PATCH = app.fetch;
