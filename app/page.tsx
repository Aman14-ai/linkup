'use client'
import DisplayAllEvents from "@/components/shared/DisplayAllEvents";
import Hero from "@/components/shared/Hero";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="mt-8">
        <DisplayAllEvents />
      </div>
    </>
  );
}
