"use client";

import { useState, useEffect } from "react";

export default function Hero() {
  const [SplineComponent, setSplineComponent] = useState<any>(null);

  useEffect(() => {
    const loadSpline = async () => {
      const mod = await import("@splinetool/react-spline");
      setSplineComponent(() => mod.default);
    };

    loadSpline();
  }, []);

  const handleExploreCareers = () => {
    const careersSection = document.getElementById("careers");
    careersSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSeeHowItWorks = () => {
    const howItWorksSection = document.getElementById("how-it-works");
    howItWorksSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero-section">
      <div className="spline-background">
        {SplineComponent ? (
          <SplineComponent scene="https://prod.spline.design/kMT5N1lSushR4Q9Z/scene.splinecode" />
        ) : (
          <div className="fallback-background">
            <img 
              src="/bg.png" 
              alt="SkillBridge Background"
              className="w-full h-full object-cover"
              onLoad={() => console.log('Image loaded successfully')}
              onError={(e) => {
                console.error('Image failed to load:', e);
                console.log('Current src:', e.currentTarget.src);
              }}
            />
            <div className="bg-overlay"></div>
          </div>
        )}
      </div>

      <div className="overlay"></div>

      <div className="hero-content">
        <div className="content-wrapper">
          <h1 className="hero-title">
            Try Your Career <span className="gradient-text">Before Choosing It</span>
          </h1>

          <p className="hero-description">
            SkillBridge allows students to explore real workplaces — from clinics and law firms to architecture studios and startups — before making lifelong career decisions.
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Designed for Class 9–12 Students.
          </p>

          <div className="button-group">
            <button onClick={handleExploreCareers} className="primary-button">
              <span className="button-glow"></span>
              <span className="button-bg"></span>
              <span className="button-text">
                Explore Careers
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>

            <a href="#how-it-works" onClick={handleSeeHowItWorks} className="secondary-button">
              See How It Works
            </a>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-box">
            <div className="scroll-dot"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
