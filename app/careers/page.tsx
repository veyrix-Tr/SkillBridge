"use client";

import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Careers from '@/components/Careers';

const careerData = {
  medicine: {
    title: "Medicine & Healthcare",
    tagline: "Save lives, heal communities, advance medical science",
    description: "Experience the rewarding world of healthcare where you'll work alongside medical professionals, witness life-saving procedures, and understand the daily challenges and triumphs of those dedicated to patient care.",
    duration: "2-4 weeks",
    settings: ["Hospitals", "Clinics", "Research Labs", "Emergency Centers"],
    skills: ["Patient Care", "Medical Diagnosis", "Healthcare Ethics", "Emergency Response"],
    responsibilities: [
      "Assist in patient care and monitoring",
      "Learn medical terminology and procedures",
      "Observe surgeries and medical treatments",
      "Understand healthcare systems and workflows"
    ],
    outcomes: [
      "Clear understanding of medical career paths",
      "Hands-on experience with healthcare procedures",
      "Network with medical professionals",
      "Informed decision about medical education"
    ]
  },
  law: {
    title: "Law & Legal Services",
    tagline: "Uphold justice, advocate for rights, shape legal outcomes",
    description: "Step into the dynamic world of legal practice where you'll observe courtroom proceedings, assist in legal research, and understand how attorneys navigate complex legal challenges to protect their clients' interests.",
    duration: "3-6 weeks",
    settings: ["Law Firms", "Corporate Legal", "Court Systems", "Public Defender Offices"],
    skills: ["Legal Research", "Case Analysis", "Client Consultation", "Legal Writing"],
    responsibilities: [
      "Assist in case preparation and research",
      "Observe courtroom proceedings and client meetings",
      "Learn legal documentation and filing procedures",
      "Understand ethical considerations in legal practice"
    ],
    outcomes: [
      "Insight into various legal career paths",
      "Practical experience with legal research tools",
      "Understanding of courtroom dynamics",
      "Network with legal professionals"
    ]
  },
  engineering: {
    title: "Engineering & Technology",
    tagline: "Build solutions, drive innovation, shape the future",
    description: "Immerse yourself in the world of engineering and technology where you'll work on real projects, collaborate with experienced engineers, and see how innovative solutions are designed, developed, and deployed.",
    duration: "4-8 weeks",
    settings: ["Tech Companies", "Manufacturing", "R&D Labs", "Startups"],
    skills: ["Problem Solving", "Technical Design", "Project Management", "Programming"],
    responsibilities: [
      "Participate in design and development projects",
      "Learn engineering methodologies and tools",
      "Collaborate with cross-functional teams",
      "Understand product development lifecycle"
    ],
    outcomes: [
      "Hands-on engineering experience",
      "Understanding of different engineering disciplines",
      "Portfolio of project work",
      "Industry connections and mentorship"
    ]
  },
  architecture: {
    title: "Architecture & Design",
    tagline: "Create spaces, inspire experiences, build environments",
    description: "Explore the creative world of architecture and design where you'll work on real projects, learn design principles, and understand how architects transform concepts into functional, beautiful spaces.",
    duration: "3-6 weeks",
    settings: ["Design Studios", "Construction", "Urban Planning", "Interior Design"],
    skills: ["Creative Design", "Space Planning", "Project Visualization", "Technical Drawing"],
    responsibilities: [
      "Assist in design concept development",
      "Learn architectural software and tools",
      "Participate in client presentations",
      "Understand building codes and regulations"
    ],
    outcomes: [
      "Portfolio of design work",
      "Understanding of architectural processes",
      "Experience with industry-standard tools",
      "Network with design professionals"
    ]
  },
  business: {
    title: "Business & Entrepreneurship",
    tagline: "Lead ventures, drive growth, create value",
    description: "Dive into the world of business and entrepreneurship where you'll work with startups and established companies, learn business strategies, and understand how successful ventures are built and scaled.",
    duration: "2-4 weeks",
    settings: ["Startups", "Corporate Offices", "Business Consulting", "Venture Capital"],
    skills: ["Business Strategy", "Market Analysis", "Leadership", "Financial Planning"],
    responsibilities: [
      "Assist in business planning and strategy development",
      "Learn market research and analysis techniques",
      "Participate in team meetings and decision-making",
      "Understand financial modeling and budgeting"
    ],
    outcomes: [
      "Business acumen and strategic thinking",
      "Understanding of startup ecosystems",
      "Network with entrepreneurs and business leaders",
      "Experience with business development tools"
    ]
  },
  education: {
    title: "Education & Teaching",
    tagline: "Inspire minds, shape futures, transform lives",
    description: "Experience the fulfilling world of education where you'll work with students, assist in lesson planning, and understand how educators create engaging learning environments that inspire and empower learners.",
    duration: "2-3 weeks",
    settings: ["Schools", "Colleges", "EdTech Companies", "Educational Institutions"],
    skills: ["Teaching Methods", "Curriculum Design", "Student Engagement", "Educational Technology"],
    responsibilities: [
      "Assist in classroom activities and lesson delivery",
      "Learn curriculum development and assessment",
      "Participate in student mentoring and guidance",
      "Understand educational technology integration"
    ],
    outcomes: [
      "Teaching experience and classroom management skills",
      "Understanding of educational methodologies",
      "Experience with educational technology tools",
      "Network with education professionals"
    ]
  },
  data_science: {
    title: "Data Science & Analytics",
    tagline: "Uncover insights, drive decisions, predict futures",
    description: "Enter the data-driven world of analytics where you'll work with real datasets, learn statistical methods, and understand how data scientists transform raw information into actionable business insights.",
    duration: "3-5 weeks",
    settings: ["Tech Companies", "Research Labs", "Financial Institutions", "Consulting Firms"],
    skills: ["Statistical Analysis", "Machine Learning", "Data Visualization", "Programming"],
    responsibilities: [
      "Work with real datasets and analytical tools",
      "Learn data cleaning and preprocessing techniques",
      "Assist in building predictive models",
      "Understand data-driven decision making"
    ],
    outcomes: [
      "Hands-on data science experience",
      "Portfolio of analytical projects",
      "Understanding of industry tools and techniques",
      "Network with data professionals"
    ]
  },
  digital_marketing: {
    title: "Digital Marketing & Media",
    tagline: "Create campaigns, engage audiences, build brands",
    description: "Explore the dynamic world of digital marketing where you'll work on real campaigns, learn marketing strategies, and understand how brands connect with audiences in the digital landscape.",
    duration: "2-4 weeks",
    settings: ["Marketing Agencies", "Media Companies", "Brand Teams", "Social Media Companies"],
    skills: ["Content Creation", "Campaign Management", "Analytics", "Social Media Strategy"],
    responsibilities: [
      "Assist in campaign planning and execution",
      "Learn content creation and copywriting",
      "Participate in social media management",
      "Understand marketing analytics and metrics"
    ],
    outcomes: [
      "Digital marketing portfolio",
      "Understanding of marketing strategies",
      "Experience with marketing tools and platforms",
      "Network with marketing professionals"
    ]
  },
  finance: {
    title: "Finance & Investment",
    tagline: "Manage wealth, analyze markets, drive investments",
    description: "Step into the fast-paced world of finance where you'll work with investment strategies, analyze market trends, and understand how financial professionals make critical decisions that drive economic growth.",
    duration: "3-6 weeks",
    settings: ["Investment Firms", "Banks", "Financial Planning", "Corporate Finance"],
    skills: ["Financial Analysis", "Investment Strategy", "Risk Management", "Market Research"],
    responsibilities: [
      "Assist in financial analysis and reporting",
      "Learn investment research and portfolio management",
      "Participate in market trend analysis",
      "Understand financial planning and advisory"
    ],
    outcomes: [
      "Financial analysis experience",
      "Understanding of investment strategies",
      "Knowledge of financial markets",
      "Network with finance professionals"
    ]
  },
  environmental_science: {
    title: "Environmental Science & Sustainability",
    tagline: "Protect ecosystems, drive sustainability, create impact",
    description: "Engage with the critical field of environmental science where you'll work on conservation projects, learn sustainability practices, and understand how scientists address global environmental challenges.",
    duration: "3-5 weeks",
    settings: ["Environmental NGOs", "Research Institutes", "Government Agencies", "Sustainability Consulting"],
    skills: ["Environmental Research", "Conservation Methods", "Data Analysis", "Policy Understanding"],
    responsibilities: [
      "Participate in environmental research projects",
      "Learn conservation and sustainability techniques",
      "Assist in data collection and analysis",
      "Understand environmental policy and regulations"
    ],
    outcomes: [
      "Environmental research experience",
      "Understanding of sustainability practices",
      "Knowledge of conservation methods",
      "Network with environmental professionals"
    ]
  }
} as const;

export default function CareersPage() {
  const searchParams = useSearchParams();
  const careerId = searchParams.get('careers') as keyof typeof careerData;
  const career = careerId ? careerData[careerId] : null;

  // If no career is selected, show all careers overview
  if (!careerId) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <main className="pt-20">
          <Careers />
        </main>
        <Footer />
      </div>
    );
  }

  // If career is selected but not found
  if (!career) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Career Not Found</h1>
          <p className="text-gray-400 mb-8">The career you're looking for doesn't exist.</p>
          <a href="/careers" className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
            Back to Careers
          </a>
        </div>
      </div>
    );
  }

  // If career is found, show career details
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-b from-black via-gray-900/50 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent mb-4">
              {career.title}
            </h1>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              {career.tagline}
            </p>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              {career.description}
            </p>
          </div>
        </section>

        {/* Career Details */}
        <section className="relative py-10 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Basic Info */}
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-gray-900/80 border border-gray-800">
                  <h3 className="text-xl font-bold text-white mb-4">Program Details</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-cyan-400 font-semibold mb-2">Duration</h4>
                      <p className="text-gray-100">{career.duration}</p>
                    </div>
                    <div>
                      <h4 className="text-cyan-400 font-semibold mb-2">Work Settings</h4>
                      <div className="flex flex-wrap gap-2">
                        {career.settings.map((setting, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full">
                            {setting}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-8">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                  <div className="relative p-8 rounded-2xl bg-gray-900/80 backdrop-blur-xl border border-gray-800 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-semibold text-white tracking-tight">
                        Skills You'll Learn
                      </h3>
                      <div className="h-1 w-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {career.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 text-sm font-medium text-cyan-300 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-full hover:scale-105 hover:bg-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 ease-out shadow-sm hover:shadow-cyan-500/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Responsibilities */}
            <div className="mb-12">
              <div className="p-6 rounded-2xl bg-gray-900/80 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">What You'll Do</h3>
                <ul className="space-y-3">
                  {career.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-3 group">
                      <div className="relative mt-2 flex-shrink-0">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <div className="absolute -inset-1 w-4 h-4 bg-cyan-400/20 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <span className="text-gray-100 group-hover:text-white transition-colors duration-300">
                        {responsibility}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Outcomes */}
            <div className="space-y-4 pt-10">
              <h2 className="text-3xl font-semibold text-[#FACA15] mb-4">
                Career Outcomes
              </h2>
              {career.outcomes.map((outcome, index) => (
                <div
                  key={index}
                  className="group relative p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 hover:border-green-500/30 hover:from-green-500/10 hover:to-emerald-500/10 transition-all duration-300 ease-out cursor-pointer"
                >
                  <div className="absolute -inset-px bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-start gap-4">
                    <div className="relative mt-1 flex-shrink-0">
                      <div className="w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg shadow-green-500/20"></div>
                      <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-20"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-100 leading-relaxed group-hover:text-white transition-colors duration-300">
                        {outcome}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-9 pt-7">
              <a 
                href="/coming-soon" 
                className="relative inline-block px-8 py-4 font-bold text-lg text-white transition-all duration-300 ease-out hover:scale-105 group"
              >
                <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity"></span>
                <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 rounded-full"></span>
                <span className="relative flex items-center gap-2">
                  Apply for This Career
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
