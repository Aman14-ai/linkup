"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import React from "react";
import { CalendarDays, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Link from "next/link";

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

type Props = {
  event: Event;
};

const EventItems = ({ event }: Props) => {
  const user = useQuery(api.user.getBy_id, { id: event.creatorId });
  const eventOwner = user?.username ?? "Loading...";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
    >
      <div className="relative">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
          {event.category}
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
            {event.title}
          </h3>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-gray-700">
            <CalendarDays className="h-4 w-4 text-blue-600" />
            <span>{format(new Date(event.date), "PPP")}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span className="line-clamp-1">{event.location}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <User className="h-4 w-4 text-blue-600" />
            <span>Hosted by {eventOwner}</span>
          </div>
        </div>
        <Link href={"/event/" + event._id} className={"text-white"}>
          <Button className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700">
            View Details
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default EventItems;
