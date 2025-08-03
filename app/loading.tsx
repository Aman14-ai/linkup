import Logo from "@/lib/Logo";
import React from "react";

const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* Main Loading Spinner */}
        <div className="relative">
          {/* Outer Ring */}
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>

          {/* Inner Ring */}
          <div className="animate-reverse absolute top-2 left-2 h-12 w-12 animate-spin rounded-full border-4 border-gray-100 border-t-purple-500"></div>

          {/* Center Dot */}
          <div className="absolute top-6 left-6 h-4 w-4 animate-pulse rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
        </div>

        {/* Loading Text */}
        <div className="mt-6 space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Loading
            <span className="ml-1 inline-flex">
              <span className="animate-bounce delay-0">.</span>
              <span className="animate-bounce delay-100">.</span>
              <span className="animate-bounce delay-200">.</span>
            </span>
          </h2>
          <p className="text-sm text-gray-500">
            Please wait while we prepare your content
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mx-auto mt-8 w-64">
          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full animate-pulse rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Loading;
