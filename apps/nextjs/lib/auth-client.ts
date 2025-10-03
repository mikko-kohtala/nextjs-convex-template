import { createAuthClient } from "better-auth/react";
import { convexClient } from "@convex-dev/better-auth/client/plugins";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { Session, User } from "better-auth/types";
import type { auth } from "@acme/database/convex/auth";

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    convexClient(),
  ],
});

export type AuthSession = Session;
export type AuthUser = User;
