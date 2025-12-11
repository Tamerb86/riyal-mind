import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    hasGoogleId: !!process.env.GOOGLE_ID,
    hasGoogleSecret: !!process.env.GOOGLE_SECRET,
    hasAuthSecret: !!process.env.AUTH_SECRET,
    hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
    googleIdPrefix: process.env.GOOGLE_ID?.substring(0, 20) + "...",
    nextAuthUrl: process.env.NEXTAUTH_URL,
    nodeEnv: process.env.NODE_ENV,
  })
}
