"use client";

import { useEffect, useRef } from 'react';

export default function HowItWorks() {
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
    <section ref={sectionRef} className="relative py-20 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-100">
            Simple steps to real career discovery
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-2xl bg-gray-900/80 border border-gray-800 backdrop-blur-sm scroll-reveal hover:border-cyan-500/60 transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332-.477 4.5-1.247m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332-.477-4.5-1.247" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Explore</h3>
            <p className="text-gray-100">Browse available career trials and choose what interests you</p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-gray-900/80 border border-gray-800 backdrop-blur-sm scroll-reveal hover:border-cyan-500/60 transition-all duration-300" style={{ transitionDelay: '100ms' }}>
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Experience</h3>
            <p className="text-gray-100">Visit real workplaces and learn from professionals</p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-gray-900/80 border border-gray-800 backdrop-blur-sm scroll-reveal hover:border-cyan-500/60 transition-all duration-300" style={{ transitionDelay: '200ms' }}>
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Decide</h3>
            <p className="text-gray-100">Make informed career choices with real experience</p>
          </div>
        </div>
      </div>
    </section>
  );
}
