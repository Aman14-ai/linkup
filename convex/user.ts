import { internalMutation, internalQuery, query } from "./_generated/server";
import { v } from "convex/values";

export const create = internalMutation({
  args: {
    username: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", args);
  },
});

// GET user by Clerk ID
export const get = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();
  },
});

export const getBy_id = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getCurrentUser = query(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Not authenticated");
  }

  const user = await ctx.db
    .query("users")
    .filter((q) => q.eq(q.field("clerkId"), identity.subject)) // `subject` is Clerk user ID
    .first();

  return user;
});

// UPDATE or CREATE user (UPSERT)
export const updateOrCreate = internalMutation({
  args: {
    username: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (existingUser) {
      await ctx.db.patch(existingUser._id, {
        username: args.username,
        imageUrl: args.imageUrl,
        email: args.email,
      });
    } else {
      await ctx.db.insert("users", args);
    }
  },
});

// now i have to connect clerk and this schema of convex for this create http.ts

/*
Situation	                                        Use
Fetching data internally	                        internalQuery
Updating/deleting/creating data internally	        internalMutation
Calling from frontend	                            useQuery, useMutation, useAction
Calling from server(but not exposing to frontend)	internalQuery / internalMutation
*/
