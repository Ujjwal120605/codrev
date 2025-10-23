import React from 'react';
import { Link } from 'react-router-dom';
import LetterGlitch from './LetterGlitch';
import Nav from './Nav';

const Landing = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Nav */}
      <Nav />

      {/* Background */}
      <LetterGlitch
        glitchSpeed={50}
        centerVignette={true}
        outerVignette={false}
        smooth={true}
      />

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
        <p className="text-lg md:text-2xl text-gray-300 mb-12 max-w-2xl drop-shadow-md">
          Empowering your coding journey with cutting-edge tools and resources
        </p>

        {/* Get Started Button */}
        <Link
          to="/app"
          className="group relative inline-flex items-center justify-center px-20 py-7 md:px-32 md:py-8 text-xl md:text-2xl font-bold text-white rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.08] shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_80px_rgba(147,51,234,0.5)]"
        >
          {/* Glowing Background Layer */}
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-80 blur-xl transition-all duration-500 group-hover:opacity-100 group-hover:blur-2xl"></span>
          
          {/* Solid Gradient Background */}
          <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transition-all duration-500"></span>
          
          {/* Hover Shine Effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
          
          {/* Button Content */}
          <span className="relative z-10 flex items-center gap-3 tracking-wide">
            <span className="drop-shadow-lg">Start Code Review</span>
            <svg 
              className="w-6 h-6 md:w-7 md:h-7 transform group-hover:translate-x-2 transition-transform duration-300 drop-shadow-lg" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          
          {/* Border Glow */}
          <span className="absolute inset-0 rounded-2xl border-2 border-white/30 group-hover:border-white/50 transition-all duration-500"></span>
        </Link>
      </div>
    </div>
  );
};

export default Landing;