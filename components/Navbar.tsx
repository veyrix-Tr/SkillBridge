"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();

  // Load profile state from localStorage on mount and save on changes
  useEffect(() => {
    const savedProfileState = localStorage.getItem('showProfile');
    if (savedProfileState === 'true') {
      setShowProfile(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('showProfile', showProfile.toString());
  }, [showProfile]);

  useEffect(() => {
    // Set active section based on current path or scroll position
    if (pathname === '/about') {
      setActiveSection('about');
    } else if (pathname.startsWith('/careers')) {
      // Handle careers page with or without query parameters
      setActiveSection('careers');
    } else if (pathname === '/') {
      // Handle scroll-based active section on home page
      const handleScroll = () => {
        const sections = ['home', 'careers', 'how-it-works', 'cta'];
        const scrollPosition = window.scrollY + 100;

        let currentSection = '';
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              currentSection = section;
              break;
            }
          }
        }
        
        // Map CTA to how-it-works for navbar highlighting
        if (currentSection === 'cta') {
          setActiveSection('how-it-works');
        } else {
          // Set default to 'home' if no section is detected
          setActiveSection(currentSection || 'home');
        }
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial position

      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setActiveSection('');
    }
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate to home first
    if (pathname !== '/') {
      window.location.href = `/#${targetId}`;
      return;
    }

    // If we're on the home page, scroll to the section
    const element = document.getElementById(targetId);
    if (element) {
      const navbarHeight = 80; // h-20 = 80px
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 rounded-lg flex items-center justify-center mr-4">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
              SkillBridge
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#home" 
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'home')}
            >
              Home
            </a>
            <a 
              href="#careers" 
              className={`nav-link ${activeSection === 'careers' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'careers')}
            >
              Careers
            </a>
            <a 
              href="#how-it-works" 
              className={`nav-link ${activeSection === 'how-it-works' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'how-it-works')}
            >
              How It Works
            </a>
            <div className="w-px h-6 bg-gray-600"></div>
            <a 
              href="/about" 
              className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
            >
              About
            </a>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Login Button */}
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="px-6 py-2 font-semibold text-white border border-purple-500/40 rounded-full backdrop-blur-sm hover:bg-purple-500/20 hover:border-purple-400/60 transition-all duration-300"
            >
              {showProfile ? 'Profile' : 'Login'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-gray-800">
          <div className="px-4 py-4 space-y-3">
            <a 
              href="#home" 
              className={`nav-link block ${activeSection === 'home' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'home')}
            >
              Home
            </a>
            <a 
              href="#careers" 
              className={`nav-link block ${activeSection === 'careers' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'careers')}
            >
              Careers
            </a>
            <a 
              href="#how-it-works" 
              className={`nav-link block ${activeSection === 'how-it-works' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'how-it-works')}
            >
              How It Works
            </a>
            <div className="w-full h-px bg-gray-600 my-2"></div>
            <a 
              href="/about" 
              className={`nav-link block ${activeSection === 'about' ? 'active' : ''}`}
            >
              About
            </a>
            
            <div className="pt-3 border-t border-gray-800">
              {/* Mobile Login Button */}
              <button
                onClick={() => {
                  setShowProfile(!showProfile);
                  setIsMenuOpen(false);
                }}
                className="w-full px-6 py-2 font-semibold text-white border border-purple-500/40 rounded-full backdrop-blur-sm hover:bg-purple-500/20 hover:border-purple-400/60 transition-all duration-300"
              >
                {showProfile ? 'Profile' : 'Login'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
