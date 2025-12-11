import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // إضافة Security Headers
  const response = NextResponse.next()
  
  // منع clickjacking
  response.headers.set("X-Frame-Options", "DENY")
  
  // منع MIME type sniffing
  response.headers.set("X-Content-Type-Options", "nosniff")
  
  // تفعيل XSS Protection
  response.headers.set("X-XSS-Protection", "1; mode=block")
  
  // Content Security Policy
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.stripe.com; frame-src https://js.stripe.com;"
  )
  
  // Referrer Policy
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  
  // Permissions Policy
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  )

  // ملاحظة: لا نستخدم auth() هنا لأن middleware يعمل في Edge Runtime
  // وPrisma لا يعمل في Edge Runtime
  // الحماية تتم داخل كل API route باستخدام getAuthSession()

  // حماية صفحات Dashboard - فقط redirect بدون التحقق من session
  // التحقق الفعلي يتم في الصفحة نفسها
  const protectedPaths = [
    "/dashboard",
    "/add-expense",
    "/expenses",
    "/expenses-list",
    "/budgets",
    "/goals",
    "/occasions",
    "/settings",
    "/profile",
    "/income",
    "/analytics",
    "/reports",
    "/family",
    "/notifications",
    "/billing",
    "/account",
    "/groups",
  ]

  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))

  if (isProtectedPath) {
    // نتحقق من وجود session token في cookies
    const authToken = request.cookies.get("authjs.session-token") || 
                     request.cookies.get("__Secure-authjs.session-token")
    
    if (!authToken) {
      const url = new URL("/signin", request.url)
      url.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(url)
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
