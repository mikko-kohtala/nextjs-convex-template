import { getStaticAuth } from "@convex-dev/better-auth";
import { createAuth } from "../auth";
import type { Id } from "./_generated/dataModel";
import { query } from "./_generated/server";

// Export a static instance for Better Auth schema generation
export const auth = getStaticAuth(createAuth);

// Example of an in-component function
// Feel free to edit, omit, etc.
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }
    return await ctx.db.get(identity.subject as Id<"user">);
  },
});
