import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new event
export const createEvent = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    location: v.string(),
    date: v.string(), // e.g., new Date().toISOString()
    imageUrl:v.string(),
    category: v.string(),
    creatorId: v.id("users"),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("events", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// Get all events (realtime)
export const getEvents = query({
  handler: async (ctx) => {
    return await ctx.db.query("events").order("desc").collect();
  },
});

export const getEventById = query({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
})

// Get events by category
export const getEventsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("events")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .order("desc")
      .collect();
  },
});

// Get events by user
export const getEventsByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("events")
      .withIndex("by_creator", (q) => q.eq("creatorId", args.userId))
      .order("desc")
      .collect();
  },
});

// get all events

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("events").order("desc").collect();
  },
});

