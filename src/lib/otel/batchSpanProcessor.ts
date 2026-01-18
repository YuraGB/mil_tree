// otel/batchSpanProcessor.ts
import "server-only";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

export const batchSpanProcessor = new BatchSpanProcessor(
  new OTLPTraceExporter({
    // локальний collector
    url: "http://localhost:4318/v1/traces",
    headers: {},
  }),
  {
    maxQueueSize: 1000,
    maxExportBatchSize: 512,
    scheduledDelayMillis: 5000,
    exportTimeoutMillis: 30000,
  },
);
