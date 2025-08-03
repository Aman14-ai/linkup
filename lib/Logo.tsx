import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center space-x-3 select-none">
      {/* Logo Icon */}
      <div className="relative">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
          <div className="relative">
            <div className="w-6 h-6 border-2 border-white rounded-full">
              <div className="absolute -right-3 top-0 w-6 h-6 border-2 border-white rounded-full" />
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute -top-1 -right-1">
          <div className="w-2 h-2 bg-blue-300 rounded-full" />
        </div>
        <div className="absolute -bottom-1 -left-1">
          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
        </div>
      </div>

      {/* Logo Text */}
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          LinkUp
        </h1>
        <div className="relative mt-1">
          <div className="h-0.5 bg-gradient-to-r from-blue-500 to-blue-700 w-full" />
        </div>
      </div>
    </div>
  );
};

export default Logo;
