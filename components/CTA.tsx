"use client";

import { useEffect, useRef } from 'react';

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.scroll-reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="cta" className="relative py-24 px-4 bg-gradient-to-b from-black via-cyan-900/20 to-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="relative max-w-6xl mx-auto">
        <div className="space-y-8 scroll-reveal">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-500 mb-6">
              Why does it really matters ?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Most students choose careers without real exposure. SkillBridge allows them to experience industries before committing years of time and money.
            </p>
          </div>
          
          {/* Benefits Grid with Cross Structure */}
          <div className="pt-12 relative max-w-5xl mx-auto scroll-reveal" style={{ transitionDelay: '200ms' }}>
            {/* Central Star Symbol */}
            <div className="absolute top-[54%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <svg className="w-11 h-11 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
            
            {/* Connecting Lines */}
            <div className="absolute top-[54%] left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent transform -translate-y-1/2 pointer-events-none z-10"></div>
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent transform -translate-x-1/2 pointer-events-none z-10"></div>
            
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Top Left Card */}
              <div className="text-center p-8 rounded-2xl bg-gray-900/60 backdrop-blur-xl border border-gray-800/60 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Clarity Before Commitment</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Avoid wasting years in the wrong career path. Make decisions based on real-world experience, not assumptions or societal pressure. Test your aptitude and interest before investing in expensive education.
                </p>
              </div>
              
              {/* Top Right Card */}
              <div className="text-center p-8 rounded-2xl bg-gray-900/60 backdrop-blur-xl border border-gray-800/60 hover:border-teal-500/30 transition-all duration-300 relative overflow-hidden group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-teal-500 to-green-600 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Real-World Exposure</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Observe actual workflows in clinics, law firms, architecture studios, engineering teams, and startups. Learn from professionals doing the work daily, not theoretical case studies or textbooks.
                </p>
              </div>
              
              {/* Bottom Left Card */}
              <div className="text-center p-8 rounded-2xl bg-gray-900/60 backdrop-blur-xl border border-gray-800/60 hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Risk Reduction</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Reduce academic and financial misalignment. Prevent costly career pivots that waste time, money, and emotional energy. Make informed choices that align with your natural strengths and interests.
                </p>
              </div>
              
              {/* Bottom Right Card */}
              <div className="text-center p-8 rounded-2xl bg-gray-900/60 backdrop-blur-xl border border-gray-800/60 hover:border-purple-500/30 transition-all duration-300 relative overflow-hidden group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Confident Decision-Making</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Choose your path based on clarity and firsthand experience, not external pressure or outdated advice. Build the confidence that comes from knowing you've tested your future career before committing to it.
                </p>
              </div>
            </div>
          </div>
          
          {/* Soft CTA */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-12">
            <a
              href="#careers"
              className="group relative px-8 py-4 font-bold text-lg text-white transition-all duration-300 ease-out hover:scale-105 cursor-pointer"
            >
              <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-orange-200 via-amber-200 to-yellow-100 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity"></span>
              <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-orange-500/80 to-yellow-500/80 rounded-full"></span>
              <span className="relative flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                Explore Career Programs
              </span>
            </a>
            
            <a
              href="/about"
              className="px-8 py-4 font-bold text-lg text-white border-2 border-cyan-500/40 rounded-full backdrop-blur-sm hover:bg-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300"
            >
              Know About Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
