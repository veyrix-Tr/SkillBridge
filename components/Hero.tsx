"use client";

import Spline from '@splinetool/react-spline';

export default function Hero() {
  const handleExploreCareers = () => {
    const careersSection = document.getElementById('careers');
    careersSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSeeHowItWorks = () => {
    const howItWorksSection = document.getElementById('how-it-works');
    howItWorksSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section">
      <div className="spline-background">
        <Spline scene="https://prod.spline.design/kMT5N1lSushR4Q9Z/scene.splinecode" />
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
            Designed for Class 9–12 and First-Year College Students.
          </p>
          
          
          <div className="button-group">
            <button
              onClick={handleExploreCareers}
              className="primary-button"
            >
              <span className="button-glow"></span>
              <span className="button-bg"></span>
              <span className="button-text">
                Explore Careers
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <a 
              href="#how-it-works" 
              onClick={handleSeeHowItWorks}
              className="secondary-button"
            >
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
