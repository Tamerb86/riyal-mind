import { getUserByEmail } from "@/actions/user"
import bcryptjs from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

import { signInWithPasswordSchema } from "@/validations/auth"

// Log for debugging
console.log("🔍 Loading auth config...")
console.log("🔍 GOOGLE_ID exists:", !!process.env.GOOGLE_ID)
console.log("🔍 GOOGLE_SECRET exists:", !!process.env.GOOGLE_SECRET)

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
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
} satisfies NextAuthConfig
