import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  
  const clientId = process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_ID
  
  if (!clientId) {
    console.error("❌ GOOGLE_ID not found!")
    return NextResponse.json({ error: "Google OAuth not configured" }, { status: 500 })
  }

  const redirectUri = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/auth/google/callback`
  
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent",
    state: Buffer.from(JSON.stringify({ callbackUrl })).toString("base64url"),
  })

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  
  console.log("🔍 Redirecting to Google OAuth...")
  console.log("🔍 Client ID:", clientId.substring(0, 20) + "...")
  console.log("🔍 Redirect URI:", redirectUri)
  
  return NextResponse.redirect(googleAuthUrl)
}
