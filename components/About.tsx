"use client";

import { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function About() {
  const mainRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      title: "Career Exploration",
      tagline: "Real-world exposure, real career clarity",
      content: "SkillBridge connects students with real workplaces for hands-on career trials. We partner with schools, companies, and professionals to create meaningful experiences that help students discover their passions and make informed career choices.",
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
      details: "Our platform bridges the gap between classroom learning and real-world application, ensuring students can make informed choices about their career paths based on actual experience rather than theoretical knowledge."
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

    const elements = mainRef.current?.querySelectorAll('.scroll-reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main ref={mainRef} className="pt-16">
        {/* Hero Section */}
        <section className="relative py-24 px-4 overflow-hidden">
          <div className="max-w-6xl mx-auto text-center scroll-reveal">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent mb-6">
              About SkillBridge
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
              We're transforming career education by giving students real-world exposure to different professions before they make life-changing decisions.
            </p>
          </div>
        </section>

        {/* What We Do Section */}
        <section ref={mainRef} className="relative py-20 px-4 bg-gradient-to-b from-black via-gray-900/50 to-black">
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

        {/* How It Works Section */}
        <section className="relative py-20 px-4 bg-black">
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

        {/* Why It Matters Section */}
        <section className="relative py-20 px-4 bg-gradient-to-b from-black via-gray-900/50 to-black">
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

        {/* CTA Section */}
        <section className="relative py-20 px-4 bg-black">
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
      </main>

      <Footer />
    </div>
  );
}