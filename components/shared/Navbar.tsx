"use client";
import Logo from "@/lib/Logo";
import { useAuth, UserButton } from "@clerk/nextjs";
import { LogIn, PlusCircle } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="">
      <nav className={`${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-200/50' 
          : 'bg-white/90 backdrop-blur-sm shadow-md border-b border-blue-100'
      } z-50 flex fixed top-0 w-full justify-between items-center px-6 md:px-8 py-3 transition-all duration-300`}>
        
        <div className="transform transition-transform duration-200 hover:scale-105">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        
        <div>
          {isSignedIn ? (
            <>
              <div className="flex items-center gap-6">
                <Link 
                  href={'/create'}
                  className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <PlusCircle className="size-5 group-hover:rotate-90 transition-transform duration-200"/>
                  <span className="hidden sm:inline text-sm">Create Event</span>
                </Link>
                
                <div className="flex items-center">
                 
                    
                      <UserButton 
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            avatarBox: "w-8 h-8 rounded-full border-2 border-transparent hover:border-blue-200 transition-colors duration-200"
                          }
                        }}
                      />
                    
                 
                </div>
              </div>
            </>
          ) : (
            <Link 
              href="/sign-in"
              className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <LogIn className="size-5 group-hover:translate-x-1 transition-transform duration-200" />
              <span className="text-sm">Sign In</span>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;