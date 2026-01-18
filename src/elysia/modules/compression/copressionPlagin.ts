import Elysia from "elysia";

// Compression plugin for Elysia
export const compression = new Elysia({ name: "compressResponses" })
  .onAfterHandle(async ({ request, set, responseValue }) => {
    if (responseValue == null) return responseValue;

    const acceptEncoding = request.headers.get("accept-encoding") ?? "";
    const compressionRequested = acceptEncoding.includes("gzip");
    if (!compressionRequested) return responseValue;

    const isJson =
      typeof responseValue === "object" &&
      !(responseValue instanceof Uint8Array) &&
      !(responseValue instanceof ArrayBuffer);

    const text = isJson ? JSON.stringify(responseValue) : String(responseValue);
    if (text.length < 8) return responseValue;

    const cs = new CompressionStream("gzip");
    const writer = cs.writable.getWriter();
    const reader = cs.readable.getReader();

    await writer.write(new TextEncoder().encode(text));
    await writer.close();

    const chunks: Uint8Array[] = [];
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    const compressed = Buffer.concat(chunks);

    set.headers["Content-Encoding"] = "gzip";
    set.headers["Vary"] = "Accept-Encoding";
    set.headers["Content-Type"] = isJson
      ? "application/json; charset=utf-8"
      : "text/plain; charset=utf-8";

    return compressed;
  })
  .as("global");
