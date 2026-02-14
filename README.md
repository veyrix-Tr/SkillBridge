# SkillBridge - Career Exploration Platform

SkillBridge is a career discovery platform that connects students with real-world workplace experiences. We help students explore different career paths through practical experiences before making educational decisions.

## Overview

SkillBridge enables students to explore careers like medicine, law, engineering, architecture, business, and education through real workplace exposure. Our platform provides detailed career information and helps students make informed decisions about their future.

## Key Features

### Career Discovery
- **6 Career Categories**: Medicine, Law, Engineering, Architecture, Business, Education
- **Detailed Information**: Each career includes description, skills, settings, responsibilities, and outcomes
- **Interactive Career Cards**: Hover effects and animations for exploration
- **Career Detail Pages**: Individual pages for each career with comprehensive information

### Modern Web Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive UI**: Smooth animations and micro-interactions
- **Smart Navigation**: Active section highlighting and smooth scrolling
- **Session Persistence**: Login state maintained across pages

## Technical Architecture

### Frontend Technology Stack
- **Next.js 14**: Modern React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: State management and lifecycle handling

## Component Structure

### Page Components
- **Home Page** (`app/page.tsx`): Hero, Careers, HowItWorks, CTA, Footer sections
- **About Page** (`app/about/page.tsx`): Dedicated about page with modular components
- **Careers Page** (`app/careers/page.tsx`): Career overview and detail views with query parameters

### Shared Components
- **Navbar** (`components/Navbar.tsx`): Navigation with active states and localStorage
- **Hero** (`components/Hero.tsx`): Hero section with 3D background
- **Careers** (`components/Careers.tsx`): Career cards with hover effects
- **HowItWorks** (`components/HowItWorks.tsx`): Step-by-step process visualization
- **CTA** (`components/CTA.tsx`): Call-to-action with skin-tone gradient buttons
- **Footer** (`components/Footer.tsx`): Footer with links and information

### About Page Components
- **About/index.tsx**: Assembles About page components
- **About/Hero.tsx**: About hero section
- **About/WhatWeDo.tsx**: Interactive section with navigation arrows
- **About/HowItWorks.tsx**: Platform process visualization
- **About/WhyItMatters.tsx**: Impact explanation
- **About/CTASection.tsx**: Call-to-action section

## Key Features

### Navigation System
- **Smart Scroll Detection**: Automatic section highlighting based on scroll position
- **Cross-Page Navigation**: Smooth navigation between pages and sections
- **Active State Management**: Visual feedback for current section
- **Session Persistence**: localStorage maintains login state across pages

### Visual Design
- **Purple Gradient Theme**: Consistent purple, violet, and blue colors
- **Skin-Tone CTA Buttons**: Yellowish-brown gradient for call-to-action
- **Glassmorphism Effects**: Backdrop-blur and transparency
- **Taller Navbar**: 80px height for better presence

## Career Categories

The platform includes 6 detailed career paths:
- **Medicine & Healthcare**: Hospitals, clinics, research labs
- **Law & Legal Services**: Law firms, court systems, corporate legal
- **Engineering & Technology**: Tech companies, manufacturing, R&D
- **Architecture & Design**: Design studios, construction, urban planning
- **Business & Entrepreneurship**: Startups, corporate offices, consulting
- **Education & Teaching**: Schools, colleges, EdTech companies

## Project Structure

```
skillbridge/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── about/page.tsx     # About page
│   ├── careers/page.tsx   # Careers page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navbar.tsx         # Navigation
│   ├── Hero.tsx           # Hero section
│   ├── Careers.tsx        # Career cards
│   ├── HowItWorks.tsx     # Process visualization
│   ├── CTA.tsx            # Call-to-action
│   ├── Footer.tsx         # Footer
│   ├── About.tsx          # About wrapper
│   └── About/             # About components
└── README.md              # This file
```

## Getting Started

### Prerequisites
- **Node.js 18+**
- **npm or yarn**
- **Modern Browser**

### Installation
```bash
# Clone the repository
git clone https://github.com/your-org/skillbridge.git

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Design System

### Color Palette
- **Primary**: Purple gradient (purple-500 to indigo-500)
- **Secondary**: Violet and blue accents
- **CTA**: Skin-tone gradient (orange-300 to yellow-200)
- **Background**: Black with gray variations

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Conclusion

SkillBridge helps students make informed career decisions through real-world experiences. Our platform provides detailed career information and interactive exploration tools.

**Ready to explore your future? Start your career discovery journey with SkillBridge today!**

---

*For more information, visit our website or contact us directly.*