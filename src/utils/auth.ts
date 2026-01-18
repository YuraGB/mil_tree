import "server-only";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import * as schema from "@/db/schemas/auth-schema";

export const auth = betterAuth({
  basePath: "/auth",
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: {
      user: schema.person, // 🔥
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  logger: {
    level: "debug",
  },
  rateLimit: {
    enabled: true,
    window: 1000, // time window in seconds
    max: 100, // max requests in the window
    storage: "memory",
    modelName: "rateLimit",
  },

  // modelName: 'verifications',
  // fields: {
  //   value: 'user_id',
  // },
  // disableCleanup: false,
  // hooks: {
  //   before: createAuthMiddleware(async (ctx) => {
  //     // Execute before processing the request
  //     console.log('Request path:', ctx.path);
  //   }),
  //   after: createAuthMiddleware(async (ctx) => {
  //     // Execute after processing the request
  //     console.log('Response:', ctx.context.returned);
  //   }),
  // },
  telemetry: {
    enabled: false,
  },
  onAPIError: {
    throw: true,
    onError: (error) => {
      // Custom error handling
      console.error("Auth error:", error);
    },
    errorURL: "/auth/error",
    customizeDefaultErrorPage: {
      colors: {
        background: "#ffffff",
        foreground: "#000000",
        primary: "#0070f3",
        primaryForeground: "#ffffff",
        mutedForeground: "#666666",
        border: "#e0e0e0",
        destructive: "#ef4444",
        titleBorder: "#0070f3",
        titleColor: "#000000",
        gridColor: "#f0f0f0",
        cardBackground: "#ffffff",
        cornerBorder: "#0070f3",
      },
      size: {
        radiusSm: "0.25rem",
        radiusMd: "0.5rem",
        radiusLg: "1rem",
        textSm: "0.875rem",
        text2xl: "1.5rem",
        text4xl: "2.25rem",
        text6xl: "3.75rem",
      },
      font: {
        defaultFamily: "system-ui, sans-serif",
        monoFamily: "monospace",
      },
      disableTitleBorder: false,
      disableCornerDecorations: false,
      disableBackgroundGrid: false,
    },
  },
  cookie: {
    name: "auth_token",
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    },
  },

  session: {
    modelName: "session",
    fields: {
      userId: "userId",
    },
    expiresIn: 604800, // 7 days
    updateAge: 86400, // 1 day
    disableSessionRefresh: true, // Disable session refresh so that the session is not updated regardless of the `updateAge` option. (default: `false`)
    additionalFields: {
      // Additional fields for the session table
      customField: {
        type: "string",
      },
    },
    storeSessionInDatabase: true, // Store session in database when secondary storage is provided (default: `false`)
    preserveSessionInDatabase: false, // Preserve session records in database when deleted from secondary storage (default: `false`)
    cookieCache: {
      enabled: true, // Enable caching session in cookie (default: `false`)
      maxAge: 300, // 5 minutes
    },
  },
  emailAndPassword: {
    enabled: true,
  },
});

export type AuthType = typeof auth;
