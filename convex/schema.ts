import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    email: v.string(),
  })
    .index("by_email", ["email"])
    .index("by_clerkId", ["clerkId"]),

  events: defineTable({
    title: v.string(),
    description: v.string(),
    location: v.string(),
    date: v.string(), // Store ISO string like `new Date().toISOString()`
    category: v.string(),
    imageUrl: v.string(),
    createdAt: v.number(), // Use `Date.now()` when inserting
    creatorId: v.id("users"), // Reference to users table
  })
    .index("by_creator", ["creatorId"])
    .index("by_category", ["category"])
    .index("by_date", ["date"]),

  comments: defineTable({
    eventId: v.id("events"),
    userId: v.id("users"),
    content: v.string(),
    createdAt: v.number(), // Date.now()
  }).index("by_eventId", ["eventId"]),
});
