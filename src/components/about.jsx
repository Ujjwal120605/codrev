import React from 'react';
import FaultyTerminal from './FaultyTerminal';
import Nav from './Nav';

export const About = () => {
  return (
   
    
     
    
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Nav />
      {/* Terminal Background - Full Screen */}
      <div className="fixed inset-0 z-0">
        <FaultyTerminal
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.8}
          pause={false}
          scanlineIntensity={0.8}
          glitchAmount={0.5}
          flickerAmount={0.7}
          noiseAmp={0.8}
          chromaticAberration={2}
          dither={0.3}
          curvature={0.1}
          tint="#00ff88"
          mouseReact={true}
          mouseStrength={0.4}
          pageLoadAnimation={true}
          brightness={0.6}
        />
      </div>

      {/* Content - Centered */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-5xl w-full">
          {/* Main Heading */}
          <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 text-white drop-shadow-[0_0_30px_rgba(16,185,129,0.5)]">
  About Us
</h1>

            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-green-400 to-teal-400 rounded-full"></div>
          </div>
          
          {/* Content Card */}
          <div className="backdrop-blur-xl bg-black/60 p-10 md:p-12 rounded-2xl border border-green-500/40 shadow-[0_0_50px_rgba(16,185,129,0.2)] hover:shadow-[0_0_80px_rgba(16,185,129,0.3)] transition-all duration-500">
            <div className="space-y-8 text-center">
              <p className="text-xl md:text-2xl leading-relaxed text-gray-200 font-light">
                Welcome to our digital realm. We are pioneers in creating immersive 
                experiences that blend technology with art.
              </p>
              
              <p className="text-xl md:text-2xl leading-relaxed text-gray-200 font-light">
  <strong>Coderev</strong> — built with <strong>React + Vite</strong> by <strong>Ujjwal Bajpai</strong> — is a modern platform crafted for students passionate about coding and Data Structures & Algorithms (DSA). 
  It empowers learners to <strong>analyze, review, and refine</strong> their code efficiently, blending intelligent design with an intuitive user experience. 
  Coderev isn’t just a tool — it’s your <strong>personal code reviewer</strong> for mastering problem-solving and writing cleaner, optimized solutions.
</p>

              
              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-8">
                <div className="group bg-gradient-to-br from-green-900/40 to-black/40 backdrop-blur-sm p-8 rounded-xl border border-green-500/50 hover:border-green-400 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">⚡</div>
                  <h3 className="text-2xl font-bold mb-3 text-green-300">Innovation</h3>
                  <p className="text-base text-gray-300 leading-relaxed">
                    Pushing boundaries with cutting-edge technology
                  </p>
                </div>
                
                <div className="group bg-gradient-to-br from-emerald-900/40 to-black/40 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50 hover:border-emerald-400 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🎨</div>
                  <h3 className="text-2xl font-bold mb-3 text-emerald-300">Design</h3>
                  <p className="text-base text-gray-300 leading-relaxed">
                    Crafting beautiful, immersive digital experiences
                  </p>
                </div>
                
                <div className="group bg-gradient-to-br from-teal-900/40 to-black/40 backdrop-blur-sm p-8 rounded-xl border border-teal-500/50 hover:border-teal-400 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🚀</div>
                  <h3 className="text-2xl font-bold mb-3 text-teal-300">Performance</h3>
                  <p className="text-base text-gray-300 leading-relaxed">
                    Optimized for speed and smooth interactions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;