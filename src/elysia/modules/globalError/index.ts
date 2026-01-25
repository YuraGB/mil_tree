import { Elysia } from "elysia";
import { ZodError } from "zod";

export const globalError = new Elysia({
  name: "global_error_handler",
}).onError(({ code, error, set }) => {
  if (code === "VALIDATION") {
    set.status = 422;

    const zodError = (error as { valueError?: unknown }).valueError;

    if (zodError instanceof ZodError) {
      return {
        type: "validation",
        status: 422,
        errors: zodError.issues.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      };
    }
    const customError = (error as { customError?: string } | null)?.customError;
    return {
      type: "validation",
      status: 422,
      message: customError ?? "Validation failed",
    };
  }

  set.status = 500;
  return { type: "internal_error" };
});
