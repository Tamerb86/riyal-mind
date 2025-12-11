import { NextResponse } from "next/server"
import { prisma } from "@/config/db"
import { cookies } from "next/headers"
import * as jose from "jose"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const error = searchParams.get("error")

  if (error) {
    console.error("❌ Google OAuth error:", error)
    return NextResponse.redirect(new URL(`/signin?error=${error}`, request.url))
  }

  if (!code) {
    console.error("❌ No code received from Google")
    return NextResponse.redirect(new URL("/signin?error=NoCode", request.url))
  }

  let callbackUrl = "/dashboard"
  if (state) {
    try {
      const decoded = JSON.parse(Buffer.from(state, "base64url").toString())
      callbackUrl = decoded.callbackUrl || "/dashboard"
    } catch (e) {
      console.error("❌ Failed to decode state:", e)
    }
  }

  try {
    const clientId = process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_ID
    const clientSecret = process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_SECRET
    const redirectUri = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/auth/google/callback`

    // Exchange code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId!,
        client_secret: clientSecret!,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    })

    const tokens = await tokenResponse.json()

    if (tokens.error) {
      console.error("❌ Token exchange error:", tokens.error)
      return NextResponse.redirect(new URL(`/signin?error=${tokens.error}`, request.url))
    }

    // Get user info from Google
    const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    })

    const googleUser = await userInfoResponse.json()
    console.log("✅ Google user:", googleUser.email)

    // Find or create user in database
    let user = await prisma.user.findUnique({
      where: { email: googleUser.email },
    })

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          email: googleUser.email,
          name: googleUser.name,
          image: googleUser.picture,
          emailVerified: new Date(),
        },
      })
      console.log("✅ Created new user:", user.id)
    } else {
      // Update existing user
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: googleUser.name || user.name,
          image: googleUser.picture || user.image,
        },
      })
      console.log("✅ Updated existing user:", user.id)
    }

    // Find or create account
    const existingAccount = await prisma.account.findFirst({
      where: {
        provider: "google",
        providerAccountId: googleUser.id,
      },
    })

    if (!existingAccount) {
      await prisma.account.create({
        data: {
          userId: user.id,
          type: "oauth",
          provider: "google",
          providerAccountId: googleUser.id,
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expires_at: tokens.expires_in ? Math.floor(Date.now() / 1000) + tokens.expires_in : null,
          token_type: tokens.token_type,
          scope: tokens.scope,
          id_token: tokens.id_token,
        },
      })
      console.log("✅ Created account link")
    }

    // Create JWT session token
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET)
    const token = await new jose.SignJWT({
      sub: user.id,
      email: user.email,
      name: user.name,
      picture: user.image,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30d")
      .sign(secret)

    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set("authjs.session-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    })

    console.log("✅ Session created, redirecting to:", callbackUrl)
    return NextResponse.redirect(new URL(callbackUrl, request.url))

  } catch (error) {
    console.error("❌ OAuth callback error:", error)
    return NextResponse.redirect(new URL("/signin?error=OAuthCallback", request.url))
  }
}
