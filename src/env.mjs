import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    DATABASE_URL: z.string().optional().default("file:./prisma/dev.db"),
    AUTH_SECRET: z.string().optional().default("development-secret-key-change-in-production"),
    GOOGLE_ID: z.string().optional().default(""),
    GOOGLE_SECRET: z.string().optional().default(""),
    GITHUB_ID: z.string().optional().default(""),
    GITHUB_SECRET: z.string().optional().default(""),
    RESEND_API_KEY: z.string().optional().default(""),
    RESEND_EMAIL_FROM: z.string().optional().default("noreply@rialmind.com"),
    RESEND_EMAIL_TO: z.string().optional().default("contact@rialmind.com"),
    RESEND_HOST: z.string().optional().default("smtp.resend.com"),
    RESEND_USERNAME: z.string().optional().default("resend"),
    RESEND_PORT: z.string().optional().default("587"),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().optional().default("http://localhost:3000"),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_EMAIL_FROM: process.env.RESEND_EMAIL_FROM,
    RESEND_EMAIL_TO: process.env.RESEND_EMAIL_TO,
    RESEND_HOST: process.env.RESEND_HOST,
    RESEND_USERNAME: process.env.RESEND_USERNAME,
    RESEND_PORT: process.env.RESEND_PORT,
  },
  
  /**
   * Skip validation in development for easier testing
   */
  skipValidation: process.env.NODE_ENV === "development",
})
