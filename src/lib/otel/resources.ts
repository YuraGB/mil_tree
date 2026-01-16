import 'server-only';
import { resourceFromAttributes } from '@opentelemetry/resources';

export const otelResource = resourceFromAttributes({
  'service.name': 'elysia-api',
  'service.version': '1.0.0',
  'deployment.environment': process.env.NODE_ENV ?? 'development',
});
