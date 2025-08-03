"use client";
import Logo from "@/lib/Logo";
import { useAuth, UserButton } from "@clerk/nextjs";
import { LogIn, PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="">
      <nav className="bg-background shadow-md shadow-blue-50 border border-b border-blue-1  00 flex fixed top-0 w-full justify-between items-center px-6 md:px-8 py-2">
        <div className="">
          <Logo />
        </div>
        <div>
          {isSignedIn ? (
            <>
              <div className="flex items-center gap-4">
                <Link href={'/create'}><PlusCircle className="size-7"/></Link>
                <UserButton />
              </div>
            </>
          ) : (
            <Link href="/sign-in"><LogIn /></Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
