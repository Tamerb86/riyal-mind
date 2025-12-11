import type { DefaultSession } from "next-auth"

export type Role = "USER" | "ADMIN"

declare module "next-auth" {
  interface User {
    id: string
    role: Role
  }

  interface Session {
    user: User & DefaultSession["user"]
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string
    role: Role
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: Role
  }
}
