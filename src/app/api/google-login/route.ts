import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  
  const clientId = process.env.GOOGLE_ID
  
  if (!clientId) {
    return NextResponse.json({ error: "GOOGLE_ID not found" }, { status: 500 })
  }

  // Build Google OAuth URL
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: "http://localhost:3000/api/auth/callback/google",
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent",
    state: Buffer.from(JSON.stringify({ callbackUrl })).toString("base64"),
  })

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  
  return NextResponse.redirect(googleAuthUrl)
}
