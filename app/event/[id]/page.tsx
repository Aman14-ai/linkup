"use client";
import Navbar from "@/components/shared/Navbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { CalendarDays, MapPin, User, ArrowLeft, Clock, Share2, Heart } from "lucide-react";
import { notFound } from "next/navigation";
import React, { use, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMutationState } from "@/hooks/useMutationState";
import { toast } from "sonner";
import CommentBox from "./CommentBox";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

type Event = {
  _id: Id<"events">;
  title: string;
  imageUrl: string;
  description: string;
  location: string;
  date: string;
  category: string;
  creatorId: Id<"users">;
  createdAt: number;
  _creationTime: number;
};

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = React.use(params);
  const event = useQuery(api.event.getEventById, { id: id as Id<"events"> });
  const user = useQuery(
    api.user.getBy_id,
    event ? { id: event.creatorId } : "skip"
  );
  const comments = useQuery(
    api.comment.getCommentsByEvent,
    event ? { eventId: event._id } : "skip"
  );
  const currentLoggedInUser = useQuery(api.user.getCurrentUser);

  const [commentString, setCommentString] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { mutate: createComment } = useMutationState(api.comment.create);

  if (!event) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="text-center p-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
              <CalendarDays className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h2>
            <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Events
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentString.trim()) return;
    
    setIsLoading(true);
    try {
      const data = {
        eventId: event._id,
        userId: currentLoggedInUser?._id as Id<"users">,
        content: commentString,
      };
      await createComment(data);
      setCommentString("");
      toast.success("Comment submitted successfully!");
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Error while submitting comment in frontend", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50">
      <Navbar />

      {/* Hero Section with Image */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <Link href="/">
            <Button 
              variant="ghost" 
              className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 shadow-lg border border-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to events
            </Button>
          </Link>
        </div>

        {/* Category Badge */}
        <div className="absolute top-6 right-6 z-10">
          <span className="bg-blue-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg border border-white/20">
            {event.category}
          </span>
        </div>

        {/* Event Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {event.title}
            </h1>
            <div className="flex items-center gap-3 text-white/90">
              <User className="h-5 w-5" />
              <span className="font-medium">
                Hosted by {user?.username || "Unknown"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Event Details Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="p-3 bg-blue-600 rounded-lg">
                      <CalendarDays className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-600 uppercase tracking-wide">Date & Time</p>
                      <p className="text-lg font-bold text-gray-900">
                        {format(new Date(event.date), "MMMM do, yyyy")}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {format(new Date(event.date), "h:mm a")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                    <div className="p-3 bg-green-600 rounded-lg">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-600 uppercase tracking-wide">Location</p>
                      <p className="text-lg font-bold text-gray-900">
                        {event.location}
                      </p>
                      <button className="text-sm text-green-600 hover:text-green-700 hover:underline transition-colors">
                        Get directions →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    <p className="whitespace-pre-line">{event.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Comments</h2>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                    {comments?.length || 0} comments
                  </span>
                </div>

                {/* Comment Form */}
                <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
                  <form onSubmit={handleCommentSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="comment"
                        className="block text-sm font-semibold text-gray-700 mb-3"
                      >
                        Share your thoughts about this event
                      </label>
                      <textarea
                        value={commentString}
                        onChange={(e) => setCommentString(e.target.value)}
                        id="comment"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                        placeholder="What are your thoughts on this event? Share your experience or ask questions..."
                        disabled={isLoading}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        disabled={isLoading || !commentString.trim()}
                        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? "Posting..." : "Post Comment"}
                      </Button>
                    </div>
                  </form>
                </div>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments?.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h3>
                      <p className="text-gray-600">Be the first to share your thoughts about this event!</p>
                    </div>
                  ) : (
                    comments?.map((comment) => (
                      <CommentBox key={comment._id} comment={comment} />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-96 space-y-6">
            {/* Action Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-6">
              <div className="p-6">
                

                
              </div>

              {/* Event Stats */}
              <div className="border-t border-gray-100 p-6 bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-4">Event Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Event Type</span>
                    <span className="font-medium text-gray-900">{event.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created</span>
                    <span className="font-medium text-gray-900">
                      {format(new Date(event._creationTime), "MMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Organizer</span>
                    <span className="font-medium text-gray-900">{user?.username || "Unknown"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-bold text-gray-900 mb-3">Need Help?</h3>
              <p className="text-sm text-gray-700 mb-4">
                Have questions about this event? Contact the organizer or check our FAQ section.
              </p>
              <Button 
                variant="outline" 
                size="sm"
                className="border-blue-200 text-blue-700 hover:bg-blue-100"
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;