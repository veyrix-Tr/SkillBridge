import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Careers from '@/components/Careers';
import HowItWorks from '@/components/HowItWorks';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen">
        <Hero />
        <Careers />
        <HowItWorks />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
