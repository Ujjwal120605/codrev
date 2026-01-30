import React from 'react';
import { Link } from 'react-router-dom';
import FaultyTerminal from './FaultyTerminal';
import Nav from './Nav';


const Landing = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Nav */}
      <Nav
        baseColor="rgba(20, 20, 20, 0.5)"
        pillColor="#00ff41"
        pillTextColor="#ffffff"
        hoveredPillTextColor="#00ff41"
        height="60px"
      />

      {/* Background */}
      {/* Background */}
      <FaultyTerminal
        tint="#00ff41"
        className="absolute inset-0 z-0"
      />
      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/70 z-0 pointer-events-none" />

      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
      </div>

      {/* Centered Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl">
          Welcome to {' '}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Coderev
          </span>
        </h1>
        <p className="text-lg md:text-2xl text-white mb-12 max-w-2xl leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
          Empowering your coding journey with cutting-edge tools and resources
        </p>




        {/* Get Started Button */}
        <Link
          to="/app"
          className="group relative inline-flex items-center justify-center px-20 py-7 md:px-32 md:py-8 text-xl md:text-2xl font-bold text-white rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.08] backdrop-blur-md bg-white/10 border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.1)] hover:shadow-[0_0_35px_rgba(255,255,255,0.25)]"
        >
          {/* Gradient Glow Layer */}
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-40 transition-opacity duration-500"></span>

          {/* Animated Light Sweep */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out"></span>

          {/* Subtle Radial Glow */}
          <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></span>

          {/* Button Content */}
          <button className="group relative z-10 flex items-center gap-3 px-8 py-3 text-white font-semibold tracking-wide uppercase bg-transparent transition-all duration-300 drop-shadow-lg">
            <span className="flex items-center gap-3">
              <span>Get Started</span>
              <svg
                className="w-6 h-6 md:w-7 md:h-7 transform group-hover:translate-x-2 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </button>
        </Link>

      </div>
    </div>
  );
};

export default Landing;