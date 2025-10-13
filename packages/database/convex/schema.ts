import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  todos: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
    // References the Better Auth user ID directly (from betterAuth component)
    userId: v.string(),
  }).index("by_user", ["userId"]),
});
