import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video 
        autoPlay 
        muted 
        loop 
        className="absolute top-0 left-0 min-w-full min-h-full object-cover z-0"
      >
        <source src="https://ik.imagekit.io/i3divn77k/Blockchain/video%20(1080p).mp4?updatedAt=1709418358040" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10">
        <div className="flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center">
            Track Your Crypto Portfolio
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-center max-w-3xl">
            Real-time cryptocurrency tracking, portfolio management, and market insights all in one place
          </p>
          <div className="space-x-4">
            <Link
              to="/dashboard"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Launch App
            </Link>
            <a
              href="#features"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-black px-8 py-3 rounded-lg text-lg font-semibold transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing; 