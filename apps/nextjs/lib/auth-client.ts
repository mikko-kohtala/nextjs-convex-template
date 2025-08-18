import { createAuthClient } from "better-auth/react"
import type { Session, User } from "better-auth/types"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_CONVEX_URL || "https://polished-basilisk-553.convex.cloud",
})

export type AuthSession = Session
export type AuthUser = User
