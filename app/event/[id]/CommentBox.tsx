'use client'
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React from "react";
import { SignedIn, useAuth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

type Comment = {
  content: string;
  createdAt: number;
  eventId: Id<"events">;
  userId: Id<"users">;
  _creationTime: number;
  _id: Id<"comments">;
};

type Props = {
  comment: Comment;
};

const CommentBox = ({ comment }: Props) => {
    const {isSignedIn} = useAuth();
    if(!isSignedIn) {
        redirect("/sign-in");
    }
  const user = useQuery(
    api.user.getBy_id,
    comment ? { id: comment.userId } : "skip"
  );
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        {user?.imageUrl ? (
          <Image
            src={user.imageUrl}
            alt={user.username}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-gray-900">
                {user?.username || "Anonymous"}
              </h4>
              {user?.imageUrl && (
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                  Verified
                </span>
              )}
            </div>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(comment._creationTime), {
                addSuffix: true,
              })}
            </span>
          </div>
          <p className="text-gray-700 whitespace-pre-line">{comment.content}</p>
          <div className="mt-3 flex gap-4">
            <button className="text-sm text-gray-500 hover:text-blue-600">
              Reply
            </button>
            <button className="text-sm text-gray-500 hover:text-blue-600">
              Like
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
