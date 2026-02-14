"use client";

import { useEffect, useRef } from 'react';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

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

    const elements = heroRef.current?.querySelectorAll('.scroll-reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={heroRef} className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center scroll-reveal">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent mb-6">
          About SkillBridge
        </h1>
        <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
          We're transforming career education by giving students real-world exposure to different professions before they make life-changing decisions.
        </p>
      </div>
    </section>
  );
}
