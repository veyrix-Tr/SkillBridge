"use client";

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Careers() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll('.career-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const careers = [
    {
      id: 'medicine',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      iconBg: "from-red-500 to-pink-600",
      hoverBgColor: "rgba(239, 68, 68, 0.2)",
      title: "Medicine & Healthcare",
      description: "Experience the daily life of doctors, nurses, and healthcare professionals in hospitals and clinics.",
      duration: "2-4 weeks",
      settings: ["Hospitals", "Clinics", "Research Labs"],
      skills: ["Patient Care", "Medical Diagnosis", "Healthcare Ethics"]
    },
    {
      id: 'law',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
      iconBg: "from-blue-500 to-indigo-600",
      hoverBgColor: "rgba(59, 130, 246, 0.2)",
      title: "Law & Legal Services",
      description: "Work alongside lawyers and legal professionals in law firms and courtrooms.",
      duration: "3-6 weeks",
      settings: ["Law Firms", "Corporate Legal", "Court Systems"],
      skills: ["Legal Research", "Case Analysis", "Client Consultation"]
    },
    {
      id: 'engineering',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      iconBg: "from-green-500 to-teal-600",
      hoverBgColor: "rgba(16, 185, 129, 0.2)",
      title: "Engineering & Technology",
      description: "Build and innovate with engineers in tech companies and manufacturing plants.",
      duration: "4-8 weeks",
      settings: ["Tech Companies", "Manufacturing", "R&D Labs"],
      skills: ["Problem Solving", "Technical Design", "Project Management"]
    },
    {
      id: 'architecture',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      iconBg: "from-purple-500 to-violet-600",
      hoverBgColor: "rgba(168, 85, 247, 0.2)",
      title: "Architecture & Design",
      description: "Create spaces and experiences with architects and designers in studios and construction sites.",
      duration: "3-6 weeks",
      settings: ["Design Studios", "Construction", "Urban Planning"],
      skills: ["Creative Design", "Space Planning", "Project Visualization"]
    },
    {
      id: 'business',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      iconBg: "from-orange-500 to-amber-600",
      hoverBgColor: "rgba(249, 115, 22, 0.2)",
      title: "Business & Entrepreneurship",
      description: "Learn business operations and startup culture with entrepreneurs and business leaders.",
      duration: "2-4 weeks",
      settings: ["Startups", "Corporate Offices", "Business Consulting"],
      skills: ["Business Strategy", "Market Analysis", "Leadership"]
    },
    {
      id: 'education',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
      iconBg: "from-cyan-500 to-blue-600",
      hoverBgColor: "rgba(14, 165, 233, 0.2)",
      title: "Education & Teaching",
      description: "Experience teaching and educational administration in schools and educational institutions.",
      duration: "2-3 weeks",
      settings: ["Schools", "Colleges", "EdTech Companies"],
      skills: ["Teaching Methods", "Curriculum Design", "Student Engagement"]
    }
  ];

  const handleCareerClick = (careerId: string) => {
    router.push(`/careers?careers=${careerId}`);
  };

  return (
    <section ref={sectionRef} id="careers" className="relative py-24 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
            Explore Career Paths
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Discover your passion by experiencing real careers before making life-changing decisions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careers.map((career, index) => {
            const isHovered = hoveredIndex === index;
            
            return (
              <a
                key={index}
                href={`/careers?careers=${career.id}`}
                className="career-card opacity-0 translate-y-10 block cursor-pointer"
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className="card-content p-6 rounded-3xl border border-gray-800 backdrop-blur-sm transition-all duration-500"
                  style={{
                    backgroundColor: isHovered ? career.hoverBgColor : 'rgba(17, 24, 39, 0.5)',
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    borderColor: isHovered ? '#4b5563' : '#1f2937'
                  }}
                >
                  <div 
                    className={`icon-box w-12 h-12 rounded-2xl bg-gradient-to-br ${career.iconBg} flex items-center justify-center mb-4 text-white transition-transform duration-300`}
                    style={{
                      transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                    }}
                  >
                    {career.icon}
                  </div>
                  
                  <h3 className="card-title text-xl font-bold text-white mb-2">
                    {career.title}
                  </h3>
                  
                  <p className="card-description text-gray-400 text-sm leading-relaxed mb-4">
                    {career.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{career.duration}</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {career.settings.slice(0, 2).map((setting, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-full">
                          {setting}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
