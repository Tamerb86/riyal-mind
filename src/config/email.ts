import { Resend } from "resend"

import { env } from "@/env.mjs"

// Make Resend optional - initialize with dummy key if not provided to prevent build errors
// Use a dummy key during build if not provided to prevent build errors
const apiKey = env.RESEND_API_KEY || "re_dummy_key_for_build"
export const resend = new Resend(apiKey)

// Export a flag to check if Resend is properly configured
export const isResendConfigured = !!env.RESEND_API_KEY && env.RESEND_API_KEY !== "re_dummy_key_for_build"
