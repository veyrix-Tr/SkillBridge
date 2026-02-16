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

## Technical Stack
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
- **Engineering & Technology**: Tech firms, manufacturing, R&D
- **Architecture & Design**: Design studios, construction, urban planning
- **Business & Entrepreneurship**: Startups, corporate offices, consulting
- **Education & Teaching**: Schools, colleges, EdTech firms

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
- **Node.js 18.17.0 or higher** (recommended: LTS version)
- **npm 9.0.0 or higher** or **yarn 1.22.0 or higher**
- **Git** for cloning the repository
- **Modern Browser** (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

### Installation

#### 1. Clone the Repository
```bash
# Clone using HTTPS
  git clone https://github.com/veyrix-Tr/SkillBridge.git

# Or clone using SSH (if you have SSH keys set up)
git clone git@github.com:veyrix-Tr/SkillBridge.git

# Navigate to the project directory
cd SkillBridge
```

#### 2. Install Dependencies
```bash
# Using npm (recommended)
npm install

# Or using yarn
yarn install

# Or using pnpm
pnpm install
```

#### 3. Environment Setup (Optional)
Create a `.env.local` file in the root directory for environment variables:
```bash
# Example environment variables
touch .env.local
```

#### 4. Run Development Server
```bash
# Start the development server
npm run dev

# Or with yarn
yarn dev

# Or with pnpm
pnpm dev
```

The application will be available at `http://localhost:3000`

#### 5. Build for Production
```bash
# Build the application
npm run build

# Start production server
npm start

# Or with yarn
yarn build
yarn start
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build application for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code linting |
| `npm run lint:fix` | Fix linting issues automatically |

### Troubleshooting

#### Common Issues

1. **Node.js Version Error**
   ```bash
   # Check your Node.js version
   node --version
   
   # If version is below 18.17.0, update Node.js or use nvm:
   nvm install --lts
   nvm use --lts
   ```

2. **Port Already in Use**
   ```bash
   # Kill process on port 3000
   lsof -ti:3000 | xargs kill -9
   
   # Or run on different port
   npm run dev -- -p 3001
   ```

3. **Dependency Installation Issues**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Delete node_modules and package-lock.json
   rm -rf node_modules package-lock.json
   
   # Reinstall dependencies
   npm install
   ```

4. **Build Errors**
   ```bash
   # Check for TypeScript errors
   npx tsc --noEmit
   
   # Check for ESLint errors
   npm run lint
   ```

#### Development Tips

- **Hot Reload**: The development server automatically reloads when you save changes
- **Fast Refresh**: React components refresh without losing state
- **Error Overlay**: Development errors appear in browser overlay
- **Network Access**: Use `-- -H 0.0.0.0` to expose dev server on network

## Design System

### Color Palette
- **Primary**: Purple gradient (purple-500 to indigo-500)
- **Secondary**: Violet and blue accents
- **CTA**: Skin-tone gradient (orange-300 to yellow-200)
- **Background**: Black with gray variations

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

We welcome contributions to SkillBridge! Here's how you can help:

### How to Contribute

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation if needed

4. **Test Your Changes**
   ```bash
   # Run tests
   npm test
   
   # Run linting
   npm run lint
   
   # Build to ensure no errors
   npm run build
   ```

5. **Submit a Pull Request**
   - Push to your fork
   - Create a pull request with a clear description
   - Wait for review and feedback

### Code Style Guidelines

- **TypeScript**: Use TypeScript for all new code
- **Components**: Use functional components with hooks
- **Styling**: Use Tailwind CSS utility classes
- **Naming**: Use descriptive names for components and variables
- **Comments**: Add comments for complex logic

### Reporting Issues

If you find a bug or have a feature request:

1. Check existing issues first
2. Create a new issue with:
   - Clear title
   - Detailed description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior

## Performance Considerations

### Optimization Features
- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Next.js Image component for optimized images
- **Static Generation**: Pre-built pages for better performance
- **Client-Side Rendering**: Dynamic imports for heavy components

### Best Practices
- Use `next/image` for all images
- Implement lazy loading for heavy components
- Optimize bundle size with dynamic imports
- Use React.memo for expensive components

## Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

### Netlify
```bash
# Build the application
npm run build

# Deploy the .next folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## FAQ

### Q: How do I add a new career category?
A: Add the career data to the `careerData` object in `app/careers/page.tsx` and update the `Careers` component.

### Q: Can I use a different CSS framework?
A: Yes, but you'll need to replace Tailwind CSS classes and update the build configuration.

### Q: How do I customize the theme colors?
A: Update the color variables in `tailwind.config.js` and modify the CSS classes in components.

### Q: Is this project mobile-responsive?
A: Yes, the project uses responsive design with Tailwind CSS breakpoints.

## Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Join GitHub Discussions for questions
- **Email**: Contact us at support@skillbridge.com

## Conclusion

SkillBridge helps students make informed career decisions through real-world experiences. Our platform provides detailed career information and interactive exploration tools.

**Ready to explore your future? Start your career discovery journey with SkillBridge today!**

---

*For more information, visit our website or contact us directly.*