// Landing.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import LetterGlitch from './LetterGlitch';
import Nav from './Nav';


const Landing = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Nav */}
     

      {/* Background */}
      <LetterGlitch
        glitchSpeed={50}
        centerVignette={true}
        outerVignette={false}
        smooth={true}
      />

      {/* Centered Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
          Welcome to Coderev
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10 drop-shadow-md">
          Empowering your coding journey
        </p>

        {/* Get Started Button */}
        <Link
          to="/app"
          className="relative inline-block px-16 py-6 text-lg md:text-xl font-bold text-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 blur-md transition-all duration-500 hover:opacity-100"></span>
          <span className="relative z-10">Get Started</span>
        </Link>
      </div>

      
    </div>
  );
};

export default Landing;
