"use client";

import { useEffect, useRef } from 'react';

export default function OurMission() {
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
    <section ref={sectionRef} className="relative py-20 px-4 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Our Mission, Our Vision
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Empowering the next generation through career clarity and purpose-driven education
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Mission Section */}
          <div className="relative group scroll-reveal h-full">
            <div className="relative bg-gray-900/90 border border-cyan-500/20 rounded-3xl p-8 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300 h-full flex flex-col">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white">Our Mission</h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">
                To provide every student with real-world career exposure before making life-changing educational decisions. We bridge the gap between classroom learning and professional reality, enabling informed career choices through hands-on experiences with industry professionals.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 mt-auto">
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">Real Experience</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">Informed Choices</span>
                <span className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm">Hands-on Learning</span>
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="relative group scroll-reveal h-full" style={{ transitionDelay: '200ms' }}>
            <div className="relative bg-gray-900/90 border border-purple-500/20 rounded-3xl p-8 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 h-full flex flex-col">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white">Our Vision</h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">
                To create a world where every young person chooses their career path with confidence and clarity. We envision an education system where career exploration is integral to learning, reducing dropout rates and increasing career satisfaction by aligning passion with profession from the start.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 mt-auto">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">Career Clarity</span>
                <span className="px-3 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm">Educational Integration</span>
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm">Passion-driven</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 scroll-reveal" style={{ transitionDelay: '400ms' }}>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-gray-300">Together, we're shaping the future of career education</span>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
