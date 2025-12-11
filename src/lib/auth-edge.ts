import NextAuth from "next-auth"
import { authConfig } from "@/auth.config"

// This is used ONLY in Edge Runtime (middleware)
// No Prisma, no database - JWT only
export const { auth: authEdge } = NextAuth(authConfig)
