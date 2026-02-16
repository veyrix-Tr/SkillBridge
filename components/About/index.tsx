"use client";

import Navbar from '../Navbar';
import Footer from '../Footer';
import Hero from './Hero';
import WhatWeDo from './WhatWeDo';
import OurMission from './WhyItMatters';
import CTASection from './CTASection';

export default function About() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-16">
        <Hero />
        <WhatWeDo />
        <OurMission />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
