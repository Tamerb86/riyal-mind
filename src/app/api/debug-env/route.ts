import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    hasGoogleId: !!process.env.GOOGLE_ID,
    hasGoogleSecret: !!process.env.GOOGLE_SECRET,
    googleIdLength: process.env.GOOGLE_ID?.length || 0,
    googleSecretLength: process.env.GOOGLE_SECRET?.length || 0,
    googleIdPrefix: process.env.GOOGLE_ID?.substring(0, 20) || "MISSING",
    hasAuthSecret: !!process.env.AUTH_SECRET,
    nodeEnv: process.env.NODE_ENV,
  })
}
