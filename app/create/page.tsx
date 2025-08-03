"use client";
import Navbar from "@/components/shared/Navbar";
import { api } from "@/convex/_generated/api";
import { useMutationState } from "@/hooks/useMutationState";
import { useAuth, useUser } from "@clerk/nextjs";
import { ConvexError } from "convex/values";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useQuery } from "convex/react";

// Define validation schema
const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(4, "Minimum 4 characters required"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Minimum 10 characters required"),
  location: z
    .string()
    .min(1, "Location is required")
    .min(4, "Minimum 4 characters required"),
  date: z
    .string()
    .min(1, "Date is required")
    .min(4, "Minimum 4 characters required"),
  category: z
    .string()
    .min(1, "Category is required")
    .min(4, "Minimum 4 characters required"),
  imageUrl: z
    .string()
    .url("Please enter a valid URL")
    .min(1, "Image URL is required"),
});

type FormData = z.infer<typeof formSchema>;

const CreatePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    redirect("/sign-in");
  }

  const { mutate: createRequest, pending } = useMutationState(
    api.event.createEvent
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { user } = useUser();
  const userData = useQuery(api.user.get, {
    clerkId: user?.id ?? "",
  });

  if (!userData) return <p>Loading user...</p>;

  const handleCreateEvent = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const data = formData
      if (!userData?._id) {
        toast.error("User not found. Please log in.");
        return;
      }

      const fullData = {
        ...data,
        creatorId: userData._id,
      };
      await createRequest(fullData); // fullData now includes creatorId

      toast.success("Event created successfully!");
    } catch (error) {
      toast.error(
        error instanceof ConvexError
          ? error.data
          : "An unexpected error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">
          Create New Event
        </h1>

        <form
          onSubmit={handleSubmit(handleCreateEvent)}
          className="space-y-6 bg-white p-8 rounded-lg shadow-md border border-blue-100"
        >
          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-blue-700 mb-1"
            >
              Title
            </label>
            <input
              id="title"
              {...register("title")}
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Event title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-blue-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              rows={4}
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Event description"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Location Field */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-blue-700 mb-1"
            >
              Location
            </label>
            <input
              id="location"
              {...register("location")}
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Event location"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Date Field */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-blue-700 mb-1"
            >
              Date
            </label>
            <input
              id="date"
              type="date"
              {...register("date")}
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
            )}
          </div>

          {/* Category Field */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-blue-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              {...register("category")}
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              <option value="concert">Concert</option>
              <option value="conference">Conference</option>
              <option value="workshop">Workshop</option>
              <option value="sports">Sports</option>
              <option value="other">Other</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Image URL Field */}
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-blue-700 mb-1"
            >
              Image URL
            </label>
            <input
              id="imageUrl"
              {...register("imageUrl")}
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl && (
              <p className="mt-1 text-sm text-red-600">
                {errors.imageUrl.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <p className="flex items-center justify-center gap-3">
                Creating... <Loader2 className="animate-spin " />
              </p>
            ) : (
              "Create Event"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
