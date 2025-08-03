import { Users, Calendar, Sparkles } from "lucide-react";

const Hero = () => {
  const staticWord = "Connect"; // Static fallback word

  return (
    <div className="rounded-b-lg relative max-h-[60vh] bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div className="absolute left-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-0 right-20 w-48 h-48 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse delay-2000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-4 h-full">
            {[...Array(60)].map((_, i) => (
              <div
                key={i}
                className="border border-blue-300 rounded-lg animate-pulse"
                style={{
                  animationDelay: `${i * 100}ms`,
                  animationDuration: "4s",
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Floating Particles */}
        
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center py-4 text-center">
        {/* Main Heading */}
        <div className="mb-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block">Where People</span>
            <div className="flex items-center justify-center space-x-4">
              <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                {staticWord}
              </span>
              <Sparkles className="w-12 h-12 text-yellow-300 animate-spin" style={{ animationDuration: "3s" }} />
            </div>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="mb-12">
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Discover amazing events, meet like-minded people, and build meaningful connections in your community
          </p>
        </div>

        {/* Stats */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center group">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8 text-blue-300 mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-3xl md:text-4xl font-bold text-white">10K+</span>
              </div>
              <p className="text-blue-200">Members</p>
            </div>
            <div className="text-center group">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="w-8 h-8 text-blue-300 mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-3xl md:text-4xl font-bold text-white">500+</span>
              </div>
              <p className="text-blue-200">Events</p>
            </div>
            <div className="text-center group">
              <div className="flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-blue-300 mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-3xl md:text-4xl font-bold text-white">50+</span>
              </div>
              <p className="text-blue-200">Cities</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          100% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
