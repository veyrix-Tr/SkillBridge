"use client";

import { useEffect, useRef, useState } from 'react';

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      title: "Career Exploration",
      tagline: "Real-world exposure, real career clarity",
      content: "SkillBridge connects students with real workplaces for hands-on career trials. We partner with firms and professionals to create meaningful experiences that help students discover their passions and make informed career choices.",
      details: "Students can explore diverse fields including medicine, law, engineering, architecture, design, and entrepreneurship. Each trial provides authentic exposure to daily work routines, challenges, and opportunities in different professions."
    },
    {
      title: "Our Mission", 
      tagline: "Experience before you choose",
      content: "We believe every student deserves to chance to experience different careers before committing to years of education and training. Our platform removes the guesswork from career decisions.",
      details: "By connecting curious students with willing professionals and organizations, we're creating a new pathway for career discovery that's based on experience rather than assumptions. This helps students make better choices, saves educational resources, and leads to more fulfilling careers."
    },
    {
      title: "Our Impact",
      tagline: "Transforming career education", 
      content: "We're transforming how students discover their future by providing structured, meaningful exposure to various professions before they make life-altering educational decisions.",
      details: "Our platform bridges the gap between classroom learning and real-world exposure, ensuring students can make informed choices about their career paths based on actual experience rather than theoretical knowledge."
    }
  ];

  const nextSection = () => {
    setActiveSection((prev: number) => (prev + 1) % sections.length);
  };

  const prevSection = () => {
    setActiveSection((prev: number) => (prev - 1 + sections.length) % sections.length);
  };

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
            What We Do
          </h2>
          <p className="text-lg text-gray-100">
            We're transforming career education
          </p>
        </div>

        <div className="relative scroll-reveal">
          {/* Navigation Progress */}
          <div className="mb-12">
            {/* Section Names with Better Spacing */}
            <div className="flex items-center justify-center mb-8">
              {sections.map((section, index) => (
                <div key={index} className="flex items-center">
                  {/* Section Name */}
                  <div 
                    onClick={() => setActiveSection(index)}
                    className={`cursor-pointer transition-all duration-300 px-6 py-2 rounded-lg ${
                      index === activeSection 
                        ? 'text-cyan-400 font-bold scale-110 bg-gray-800/50 border border-cyan-400/30' 
                        : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/30'
                    }`}
                  >
                    {section.title}
                  </div>
                  
                  {/* Neutral Connection Line */}
                  {index < sections.length - 1 && (
                    <div className="w-24 h-0.5 bg-gray-700 mx-4" />
                  )}
                </div>
              ))}
            </div>

            {/* Enhanced Circular Progress Indicators */}
            <div className="flex justify-center gap-8 mb-12">
              {sections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSection(index)}
                  className={`relative w-5 h-5 rounded-full transition-all duration-300 transform hover:scale-110 ${
                    index === activeSection 
                      ? 'bg-cyan-400 shadow-lg shadow-cyan-400/30 scale-125 ring-2 ring-cyan-400/50' 
                      : 'bg-gray-700 hover:bg-gray-600 ring-2 ring-gray-700/50'
                  }`}
                >
                  {index === activeSection && (
                    <div className="absolute inset-0 w-5 h-5 rounded-full bg-cyan-400 animate-ping opacity-50" />
                  )}
                </button>
              ))}
            </div>

            {/* Improved Navigation Arrows */}
            <div className="flex justify-between items-center mb-12">
              <button 
                onClick={prevSection}
                className="p-4 rounded-full bg-gray-800/50 border border-gray-700 hover:bg-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300 hover:scale-105"
                disabled={activeSection === 0}
              >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button 
                onClick={nextSection}
                className="p-4 rounded-full bg-gray-800/50 border border-gray-700 hover:bg-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300 hover:scale-105"
                disabled={activeSection === sections.length - 1}
              >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Large Content Display */}
          <div className="bg-gray-900/40 border border-gray-800 rounded-3xl p-12 backdrop-blur-sm min-h-[400px]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {sections[activeSection].title}
                  </h3>
                  <div className="text-xl text-cyan-400 mb-4">
                    {sections[activeSection].tagline}
                  </div>
                  <p className="text-gray-100 leading-relaxed text-lg">
                    {sections[activeSection].content}
                  </p>
                </div>
              </div>

              {/* Key Details Panel */}
              <div className="lg:col-span-1">
                <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Key Details
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-100 text-sm leading-relaxed">
                        {sections[activeSection].details}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
