"use client";

import { useEffect, useRef } from 'react';

export default function WhyItMatters() {
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
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why It Matters
          </h2>
          <p className="text-lg text-gray-100">
            The impact of real career exposure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-gray-900/80 border border-gray-800 backdrop-blur-sm scroll-reveal">
            <h3 className="text-2xl font-bold text-white mb-4">
              For Students
            </h3>
            <p className="text-gray-100 leading-relaxed">
              Make better career decisions based on real experience rather than assumptions. Save time and money by avoiding wrong educational paths. Build confidence in your career choices through hands-on exposure to different professions.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gray-900/80 border border-gray-800 backdrop-blur-sm scroll-reveal" style={{ transitionDelay: '100ms' }}>
            <h3 className="text-2xl font-bold text-white mb-4">
              For Schools & Companies
            </h3>
            <p className="text-gray-100 leading-relaxed">
              Connect with motivated students interested in your field. Build future talent pipelines with early exposure. Contribute to education while showcasing your industry and career opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
