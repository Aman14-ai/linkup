import { Users, Calendar, Sparkles } from "lucide-react";

const Hero = () => {
  const staticWord = "Connect"; // Static fallback word

  return (
    <div className="rounded-b-lg relative max-h-[80vh] md:max-h-[60vh] bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs - Smaller and fewer on mobile */}
        <div className="absolute left-4 w-16 h-16 md:left-10 md:w-32 md:h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-0 right-4 w-24 h-24 md:right-20 md:w-48 md:h-48 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-16 left-1/4 w-20 h-20 md:bottom-32 md:w-40 md:h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse delay-2000"></div>

        {/* Grid Pattern - Simplified for mobile */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 md:grid-cols-12 gap-2 md:gap-4 h-full">
            {[...Array(48)].map((_, i) => (
              <div
                key={i}
                className="border border-blue-300 rounded-sm md:rounded-lg animate-pulse"
                style={{
                  animationDelay: `${i * 100}ms`,
                  animationDuration: "4s",
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 flex flex-col items-center justify-center py-8 md:py-16 text-center">
        {/* Main Heading */}
        <div className="mb-2 md:mb-4 px-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-snug md:leading-tight">
            <span className="block">Where People</span>
            <div className="flex items-center justify-center space-x-2 md:space-x-4">
              <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                {staticWord}
              </span>
              <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-yellow-300 animate-spin" style={{ animationDuration: "3s" }} />
            </div>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="mb-8 md:mb-12 px-4">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 max-w-2xl md:max-w-3xl leading-relaxed">
            Discover amazing events, meet like-minded people, and build meaningful connections in your community
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-16">
            <div className="text-center group">
              <div className="flex items-center justify-center mb-1 md:mb-2">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-blue-300 mr-1 md:mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">10K+</span>
              </div>
              <p className="text-sm md:text-base text-blue-200">Members</p>
            </div>
            <div className="text-center group">
              <div className="flex items-center justify-center mb-1 md:mb-2">
                <Calendar className="w-6 h-6 md:w-8 md:h-8 text-blue-300 mr-1 md:mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">500+</span>
              </div>
              <p className="text-sm md:text-base text-blue-200">Events</p>
            </div>
            <div className="text-center group">
              <div className="flex items-center justify-center">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-blue-300 mr-1 md:mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">50+</span>
              </div>
              <p className="text-sm md:text-base text-blue-200">Cities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;