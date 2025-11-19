# Portfolio Aliocha - Creative Engineer

A high-performance, award-worthy portfolio built with cutting-edge web technologies.

## 🎨 Design Philosophy

**"L'Ordre dans le Chaos"** (Order in Chaos)

This portfolio showcases advanced WebGL effects, smooth scroll animations, and a brutalist-meets-premium aesthetic designed to win Awwwards in 2025.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **3D Engine:** React Three Fiber (R3F) + Drei
- **Animation:** GSAP + ScrollTrigger
- **Smooth Scroll:** Lenis
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **Language:** TypeScript

## ✨ Key Features

### 1. Binary Loader Animation
Custom loading screen with random binary generation and clip-path reveal animation.

### 2. Hero Section
- WebGL particle system (5000+ particles)
- Floating wireframe geometries
- Mouse-reactive camera movement
- Character-by-character title animation

### 3. Project Gallery (Horizontal Scroll)
- **Velocity Skew Effect:** Cards skew based on scroll speed
- Parallax image movement
- Grayscale to color on hover
- Smooth horizontal scrolling with GSAP ScrollTrigger

### 4. Skills Section
- Morphing 3D sphere with WebGL distortion
- Pinned canvas with scroll-triggered content
- Interactive skill cards with magnetic hover

### 5. Custom Cursor
- Mix-blend-mode exclusion effect
- Elastic magnetic attraction on hover elements
- Dynamic scaling based on context

### 6. Grain Overlay
Film grain texture for premium analog feel

## 📦 Installation

\`\`\`bash
npm install
\`\`\`

## 🎯 Setup

### 1. Add Fonts
Download and place in \`public/fonts/\`:
- [Clash Display Variable](https://www.fontshare.com/fonts/clash-display)
- [JetBrains Mono Variable](https://www.jetbrains.com/lp/mono/)

### 2. Add Project Images
Place your project images in \`public/images/\`:
- project-1.jpg
- project-2.jpg
- project-3.jpg
- project-4.jpg

### 3. Update Content
Edit \`data/content.json\` with your personal information:
- Bio
- Projects
- Skills
- Contact information

## 🏃 Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

## 🏗️ Build

\`\`\`bash
npm run build
npm start
\`\`\`

## 🎨 Customization

### Colors
Edit \`tailwind.config.ts\`:
\`\`\`typescript
colors: {
  dark: '#050505',    // Background
  light: '#F0F0F0',   // Text
  accent: '#00FFFF',  // Accent (cyan)
}
\`\`\`

### Animation Timing
Adjust Lenis smooth scroll feel in \`components/layout/SmoothScroll.tsx\`:
\`\`\`typescript
lerp: 0.08, // Lower = smoother (heavier feel)
\`\`\`

### Particle Count
Change particle density in \`components/canvas/HeroScene.tsx\`:
\`\`\`typescript
const particlesCount = 5000; // Adjust for performance
\`\`\`

## 🎯 Performance Optimization

This build is optimized for **Desktop-First, Maximum Impact**:
- No compromises on visual effects
- WebGL shaders and particles at full capacity
- Mobile receives simplified version automatically

To optimize for broader device support, reduce:
1. Particle count in HeroScene
2. Distortion intensity in SkillsSphere
3. Lenis lerp value (increase for faster scroll)

## 📝 Content Structure

\`\`\`json
{
  "hero": { "name", "title", "subtitle" },
  "about": { "bio", "location", "availability" },
  "projects": [{ "title", "category", "year", "description", "image", "tech" }],
  "skills": { "technical": [], "design": [] },
  "contact": { "email", "github", "linkedin", "twitter" }
}
\`\`\`

## 🎬 Animation Breakdown

### Loader (0-3s)
- Binary text randomization
- Progress bar fill
- Clip-path curtain reveal

### Hero Intro (3-5s)
- Name fade-in
- Title character cascade
- Subtitle slide-up
- Scroll indicator pulse

### Scroll Interactions
- Project cards: Velocity-based skew
- Skills sphere: Continuous WebGL morphing
- Bio text: Parallax scroll reveal
- Contact links: Magnetic hover attraction

## 🏆 Built For Awards

This portfolio implements techniques seen in Awwwards Site of the Day winners:
- Advanced WebGL integration
- Physics-based interactions
- Scroll-driven storytelling
- Premium typography and spacing
- Brutalist aesthetic with refined details

## 📄 License

MIT License - Feel free to use this as inspiration for your own portfolio!

---

**Built with passion, code, and a touch of chaos.**
