"use client";

import Navbar from './Navbar';
import Footer from './Footer';
import Hero from './About/Hero';
import OurMission from './About/WhatWeDo';
import WhyItMatters from './About/WhyItMatters';
import CTASection from './About/CTASection';

export default function About() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-20">
        <Hero />
        <OurMission />
        <WhyItMatters />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}