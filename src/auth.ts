import { linkOAuthAccount } from "@/actions/auth"
import { getUserByEmail } from "@/actions/user"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcryptjs from "bcryptjs"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { Resend } from "resend"

import { prisma } from "@/config/db"
import { signInWithPasswordSchema } from "@/validations/auth"

console.log("🔍 Auth: GOOGLE_ID =", process.env.GOOGLE_ID?.substring(0, 20))
console.log("🔍 Auth: GOOGLE_SECRET exists =", !!process.env.GOOGLE_SECRET)

// Initialize Resend for email sending
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  debug: true,
  providers: [
    Google,
    // Email Provider with Resend for Magic Links
    EmailProvider({
      server: {
        host: process.env.RESEND_HOST || "smtp.resend.com",
        port: Number(process.env.RESEND_PORT) || 465,
        auth: {
          user: process.env.RESEND_USERNAME || "resend",
          pass: process.env.RESEND_API_KEY || "",
        },
      },
      from: process.env.RESEND_EMAIL_FROM || "noreply@rialmind.com",
      // Custom sendVerificationRequest for better email design
      async sendVerificationRequest({ identifier: email, url, provider }) {
        if (!resend) {
          console.error("Resend is not configured. Please set RESEND_API_KEY.")
          throw new Error("Email service not configured")
        }
        
        try {
          await resend.emails.send({
            from: provider.from || "noreply@rialmind.com",
            to: email,
            subject: "تسجيل الدخول إلى ريال مايند | Sign in to Riyal Mind",
            html: `
              <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #059669 0%, #d97706 100%); padding: 30px; border-radius: 16px; text-align: center;">
                  <h1 style="color: white; margin: 0; font-size: 28px;">ريال مايند</h1>
                  <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">إدارة ذكية للمصاريف</p>
                </div>
                <div style="background: #f9fafb; padding: 30px; border-radius: 16px; margin-top: 20px;">
                  <h2 style="color: #064e3b; margin: 0 0 20px 0;">مرحباً بك!</h2>
                  <p style="color: #374151; line-height: 1.8;">اضغط على الزر أدناه لتسجيل الدخول إلى حسابك:</p>
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${url}" style="background: linear-gradient(135deg, #059669 0%, #d97706 100%); color: white; padding: 15px 40px; border-radius: 10px; text-decoration: none; font-weight: bold; display: inline-block;">تسجيل الدخول</a>
                  </div>
                  <p style="color: #6b7280; font-size: 14px;">هذا الرابط صالح لمدة 24 ساعة فقط.</p>
                  <p style="color: #6b7280; font-size: 14px;">إذا لم تطلب هذا البريد، يمكنك تجاهله.</p>
                </div>
                <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
                  <p>© 2025 ريال مايند - جميع الحقوق محفوظة</p>
                </div>
              </div>
            `,
          })
          console.log("✅ Verification email sent to:", email)
        } catch (error) {
          console.error("❌ Error sending verification email:", error)
          throw new Error("Failed to send verification email")
        }
      },
    }),
    CredentialsProvider({
      async authorize(rawCredentials) {
        const validatedCredentials =
          signInWithPasswordSchema.safeParse(rawCredentials)

        if (validatedCredentials.success) {
          const user = await getUserByEmail({
            email: validatedCredentials.data.email,
          })
          if (!user || !user.passwordHash) return null

          const passwordIsValid = await bcryptjs.compare(
            validatedCredentials.data.password,
            user.passwordHash
          )

          if (passwordIsValid) return user
        }
        return null
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  events: {
    async linkAccount({ user }) {
      if (user.id) await linkOAuthAccount({ userId: user.id })
    },
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as "USER" | "ADMIN"
        session.user.id = token.id as string
      }
      return session
    },
    async signIn({ user, account, profile }) {
      console.log("🔍 signIn callback:", { 
        userId: user?.id, 
        provider: account?.provider,
        email: user?.email,
        profileEmail: (profile as any)?.email
      })
      
      // للمستخدمين الجدد من Google أو Email، قد لا يكون لديهم id بعد
      if (account?.provider === "google" || account?.provider === "email") {
        console.log(`✅ ${account?.provider} sign in allowed`)
        return true
      }
      
      if (!user.id) {
        console.log("❌ No user id")
        return false
      }
      
      return true
    },
  },
})
