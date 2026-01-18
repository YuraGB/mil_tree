import { stringifyObjectUtil } from "@/utils/stringifyObject";
import Elysia from "elysia";
import { IS_VERCEL } from "@/constants";
import { batchSpanProcessor } from "@/lib/otel/batchSpanProcessor";
import { betterAuthView } from "@/elysia/modules/auth/auth.route";
import { utilityRoutes } from "@/elysia/modules/utilityRoutes/utilityHandlers";
import { DefaultContext, rateLimit } from "elysia-rate-limit";
import { compression } from "@/elysia/modules/compression/copressionPlagin";
import { overviewRoute } from "@/elysia/modules/overview/overview.route";
import { reportRoutes } from "@/elysia/modules/report/report.route";
import { personRoutes } from "@/elysia/modules/person/person.route";
import { mapRoutes } from "@/elysia/modules/map/map.route";

const isNext = process.env.NEXT_RUNTIME === "nodejs";

interface SocketAddress {
  address: string;
  port: number;
  family: "IPv4" | "IPv6";
}

const ipGenerator = (
  _r: Request,
  _s: unknown,
  { ip }: { ip: SocketAddress | null }
) => ip?.address ?? "unknown";

// **Не експортуємо app напряму**
const app = new Elysia()
  .use(compression)
  .use(utilityRoutes)
  .all("/api/auth/*", betterAuthView)
  .group("/api", (api) => {
    if (!isNext) {
      api.use(
        rateLimit({
          duration: 60_000,
          max: 100,
          headers: true,
          generator: ipGenerator,
          context: new DefaultContext(10_000),
          countFailedRequest: true,
          errorResponse: new Response(
            stringifyObjectUtil({ error: "Too many requests" }),
            { status: 429 }
          ),
        })
      );
    }

    return api
      .get("/test1", () => ({ message: "It's working!" }))
      .use(overviewRoute)
      .use(reportRoutes)
      .use(personRoutes)
      .use(mapRoutes)
      .onError(({ code, error, set }) => {
        set.status = code === "NOT_FOUND" ? 404 : 500;
        return stringifyObjectUtil({
          error:
            error instanceof Error
              ? stringifyObjectUtil({ error })
              : stringifyObjectUtil({ error }),
          status: set.status,
        });
      });
  });

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

export type App = typeof app;

export const GET = app.fetch;
export const POST = app.fetch;
export const PUT = app.fetch;
export const DELETE = app.fetch;
export const PATCH = app.fetch;
