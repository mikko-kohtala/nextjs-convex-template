import {
  createClient,
  type AuthFunctions,
  type GenericCtx,
  getStaticAuth,
} from "@convex-dev/better-auth";
import { betterAuth } from "better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { components, internal } from "./_generated/api";
import type { DataModel, Id } from "./_generated/dataModel";
import { query, type QueryCtx } from "./_generated/server";

const authFunctions: AuthFunctions = internal.auth;

// Initialize the auth component with triggers to sync with users table
export const authComponent = createClient<DataModel>(components.betterAuth, {
  authFunctions,
  triggers: {
    user: {
      onCreate: async (ctx, authUser) => {
        // Create a corresponding user in your app's users table
        const userId = await ctx.db.insert("users", {
          email: authUser.email,
        });
        // Map Better Auth user ID to your app's user ID
        // This is needed for migration from older versions
        await authComponent.setUserId(ctx, authUser._id, userId);
      },
      onUpdate: async (ctx, oldUser, newUser) => {
        // Keep email in sync between auth and users table
        if (newUser.email !== oldUser.email && newUser.userId) {
          await ctx.db.patch(newUser.userId as Id<"users">, {
            email: newUser.email,
          });
        }
      },
      onDelete: async (ctx, authUser) => {
        // Delete the corresponding user from your app's users table
        if (authUser.userId) {
          await ctx.db.delete(authUser.userId as Id<"users">);
        }
      },
    },
  },
});

export const { onCreate, onUpdate, onDelete } = authComponent.triggersApi();

// Create auth function with database adapter
export const createAuth = (
  ctx: GenericCtx<DataModel>,
  { optionsOnly } = { optionsOnly: false }
): ReturnType<typeof betterAuth> => {
  return betterAuth({
    baseURL: process.env.SITE_URL || "http://localhost:3000",
    database: authComponent.adapter(ctx),
    // When createAuth is called just to generate options, we don't want to
    // log anything
    logger: {
      disabled: optionsOnly,
    },
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    plugins: [convex()],
  });
};

// Export a static instance for Better Auth schema generation
export const auth: ReturnType<typeof betterAuth> = getStaticAuth(createAuth);

// Helper functions for getting the current user
export const safeGetUser = async (ctx: QueryCtx) => {
  const authUser = await authComponent.safeGetAuthUser(ctx);
  if (!authUser || !authUser.userId) {
    return null;
  }
  // Get user data from your application's database
  const user = await ctx.db.get(authUser.userId as Id<"users">);
  return user ? { ...user, ...authUser } : authUser;
};

export const getUser = async (ctx: QueryCtx) => {
  const authUser = await authComponent.getAuthUser(ctx);
  if (!authUser.userId) {
    return authUser;
  }
  // Get user data from your application's database
  const user = await ctx.db.get(authUser.userId as Id<"users">);
  return user ? { ...user, ...authUser } : authUser;
};

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return safeGetUser(ctx);
  },
});
