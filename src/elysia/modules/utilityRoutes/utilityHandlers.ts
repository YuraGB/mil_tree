import { BASE_URL } from '@/constants';
import { helmetConfig } from '@/lib/csp';
import { batchSpanProcessor } from '@/lib/otel/batchSpanProcessor';
import { otelResource } from '@/lib/otel/resources';
import cors from '@elysiajs/cors';
import { opentelemetry } from '@elysiajs/opentelemetry';
import serverTiming from '@elysiajs/server-timing';
import { Elysia } from 'elysia';
import { ip } from 'elysia-ip';
import { elysiaHelmet } from 'elysiajs-helmet';

console.log(Elysia);
export const utilityRoutes = new Elysia({ name: 'utility_handlers' })

  .trace(
    /**
     * Configures tracing hooks for before/after/error handling.
     * Logs timing and errors for each request.
     * @param {object} param0 - The tracing context.
     */
    async ({ onBeforeHandle, onAfterHandle, onError }) => {
      onBeforeHandle(({ begin, onStop }) => {
        onStop(({ end }) => {
          console.log(end, begin);
        });
      });
      onAfterHandle(({ begin, onStop }) => {
        onStop(({ end }) => {
          console.log(end, begin);
        });
      });
      onError(({ begin, onStop }) => {
        onStop(({ end, error }) => {
          console.log(end, begin, error);
        });
      });
    },
  )
  .use(elysiaHelmet(helmetConfig))
  .use(ip())
  .use(
    // Only use OpenTelemetry in local development
    batchSpanProcessor
      ? opentelemetry({
          resource: otelResource,
          spanProcessors: [batchSpanProcessor],
        })
      : new Elysia(),
  )
  .use(
    serverTiming({
      trace: {
        request: true,
        parse: true,
        transform: true,
        beforeHandle: true,
        handle: true,
        afterHandle: true,
        error: true,
        mapResponse: true,
        total: true,
      },
    }),
  )
  // // --- CORS configuration for cross-origin requests ---
  .use(
    cors({
      origin: BASE_URL, // Configurable frontend URL
      methods: ['GET', 'POST', 'OPTIONS'], // Specify allowed HTTP methods
      allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
      credentials: true, // Allow credentials (e.g., cookies, authorization headers)
      maxAge: 86_400, // Cache the preflight response for 24 hours
    }),
  );
