import { SocketAddress } from "@/types/server";
import stringifyObjectUtil from "@/utils/stringifyObject";
import Elysia from "elysia";
import { DefaultContext, rateLimit } from "elysia-rate-limit";

const ipGenerator = (
  _r: Request,
  _s: unknown,
  { ip }: { ip: SocketAddress | null },
) => ip?.address ?? "unknown";

export const rateLimiter = new Elysia({ name: "rate_limiter" }).use(
  rateLimit({
    duration: 60_000,
    max: 100,
    headers: true,
    generator: ipGenerator,
    context: new DefaultContext(10_000),
    countFailedRequest: true,
    errorResponse: new Response(
      stringifyObjectUtil({ error: "Too many requests" }),
      { status: 429 },
    ),
  }),
);
