import type { NextAuthConfig } from "next-auth"

// الصفحات المسموح بها بدون تسجيل دخول
const publicPaths = [
  "/",
  "/signin",
  "/signup",
  "/terms",
  "/privacy",
  "/pricing",
  "/about",
  "/features",
  "/blog",
  "/faq",
  "/api/auth", // للسماح بـ Magic Links
]

// التحقق إذا كان المسار عام
function isPublicPath(pathname: string): boolean {
  return publicPaths.some((path) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  })
}

export const authConfig = {
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isPublic = isPublicPath(nextUrl.pathname)
      const isAuthPage = nextUrl.pathname.startsWith("/signin") || nextUrl.pathname.startsWith("/signup")

      // إذا كان مسجل دخول ويحاول الوصول لصفحات التسجيل
      if (isLoggedIn && isAuthPage) {
        return Response.redirect(new URL("/dashboard", nextUrl))
      }

      // إذا لم يكن مسجل دخول ويحاول الوصول لصفحة محمية
      if (!isLoggedIn && !isPublic) {
        return false // سيتم redirect تلقائياً إلى signIn page
      }

      return true
    },
  },
  providers: [], // Add providers with an empty array for Edge compatibility
} satisfies NextAuthConfig
