"use client";

import { useEffect, useRef } from 'react';

export default function CTASection() {
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
      <div className="max-w-4xl mx-auto text-center scroll-reveal">
        <h2 className="text-4xl font-bold text-white mb-6">
          Join the Career Discovery Movement
        </h2>
        <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
          Whether you're a student looking for direction, a school wanting to offer better opportunities, or a company interested in building future talent, SkillBridge is your platform for meaningful career connections.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <button className="relative px-8 py-4 font-bold text-lg text-white transition-all duration-300 ease-out hover:scale-105 cursor-pointer group">
            <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity"></span>
            <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 rounded-full"></span>
            <span className="relative flex items-center gap-2">
              Get Started
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
          <a href="#contact" className="px-8 py-4 font-bold text-lg text-white border-2 border-cyan-500/40 rounded-full backdrop-blur-sm hover:bg-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
