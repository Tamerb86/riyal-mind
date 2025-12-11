import { NextResponse } from "next/server"
import { redirect } from "next/navigation"

export async function GET() {
  const clientId = process.env.GOOGLE_ID
  const clientSecret = process.env.GOOGLE_SECRET
  
  if (!clientId || !clientSecret) {
    return NextResponse.json({
      error: "Missing credentials",
      hasClientId: !!clientId,
      hasClientSecret: !!clientSecret,
    })
  }

  // Build Google OAuth URL manually
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: "http://localhost:3000/api/auth/callback/google",
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent",
  })

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`

  return NextResponse.json({
    message: "Google OAuth URL generated",
    url: googleAuthUrl,
    clientIdPrefix: clientId.substring(0, 20),
  })
}
