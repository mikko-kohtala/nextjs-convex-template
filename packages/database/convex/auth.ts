import { createClient, type GenericCtx, getStaticAuth } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { type BetterAuthOptions, betterAuth } from "better-auth";
import { components } from "./_generated/api";
import type { DataModel } from "./betterAuth/_generated/dataModel";
import { type QueryCtx, query } from "./betterAuth/_generated/server";
import authSchema from "./betterAuth/schema";

// This implementation uses Local Install to have full control over the Better Auth schema
const siteUrl = process.env.SITE_URL || "http://localhost:3000";

// Initialize the auth component with local schema
export const authComponent = createClient<DataModel, typeof authSchema>(components.betterAuth, {
  local: {
    schema: authSchema,
  },
  verbose: false,
});

// Create auth function with database adapter
export const createAuth = (
  ctx: GenericCtx<DataModel>,
  { optionsOnly } = { optionsOnly: false }
): ReturnType<typeof betterAuth> =>
  betterAuth({
    baseURL: siteUrl,
    database: authComponent.adapter(ctx),
    // When createAuth is called just to generate options, we don't want to
    // log anything
    logger: {
      disabled: optionsOnly,
      level: "debug",
    },
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    plugins: [convex()],
    user: {
      additionalFields: {
        role: {
          type: "string",
          required: false,
          defaultValue: "user",
          input: false, // don't allow user to set role
        },
      },
    },
  } satisfies BetterAuthOptions);

// Export a static instance for Better Auth schema generation
export const auth = getStaticAuth(createAuth);

// Helper functions for getting the current user
export const safeGetUser = async (ctx: QueryCtx) => authComponent.safeGetAuthUser(ctx);

export const getUser = async (ctx: QueryCtx) => authComponent.getAuthUser(ctx);

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => safeGetUser(ctx),
});
