import type { Config } from "drizzle-kit";

if (!process.env.DB_URL || !process.env.DB_AUTH_TOKEN) {
  throw new Error("DB URL is missing");
}

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: process.env.DB_URL,
    authToken: process.env.DB_AUTH_TOKEN!,
  },

  driver: "libsql",
} satisfies Config;
