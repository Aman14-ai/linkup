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
    <div className="flex gap-3 sm:gap-4">
      <div className="flex-shrink-0">
        {user?.imageUrl ? (
          <Image
            src={user.imageUrl}
            alt={user.username}
            width={36}
            height={36}
            className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover"
            priority={false}
          />
        ) : (
          <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0"> {/* Added min-w-0 to prevent overflow */}
        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mb-2">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                {user?.username || "Anonymous"}
              </h4>
              {user?.imageUrl && (
                <span className="text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 bg-blue-100 text-blue-800 rounded-full">
                  Verified
                </span>
              )}
            </div>
            <span className="text-xs sm:text-sm text-gray-500">
              {formatDistanceToNow(new Date(comment._creationTime), {
                addSuffix: true,
              })}
            </span>
          </div>
          <p className="text-gray-700 text-sm sm:text-base whitespace-pre-line break-words">
            {comment.content}
          </p>
          <div className="mt-2 sm:mt-3 flex gap-3 sm:gap-4">
            <button className="text-xs sm:text-sm text-gray-500 hover:text-blue-600 active:scale-95 transition-transform">
              Reply
            </button>
            <button className="text-xs sm:text-sm text-gray-500 hover:text-blue-600 active:scale-95 transition-transform">
              Like
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;