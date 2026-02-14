"use client";

import Navbar from './Navbar';
import Footer from './Footer';
import Hero from './About/Hero';
import WhatWeDo from './About/WhatWeDo';
import HowItWorks from './About/HowItWorks';
import WhyItMatters from './About/WhyItMatters';
import CTASection from './About/CTASection';

export default function About() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-20">
        <Hero />
        <WhatWeDo />
        <HowItWorks />
        <WhyItMatters />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}