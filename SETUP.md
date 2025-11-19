# 🚀 Quick Start Guide

## Installation

The dependencies are already installed. If you need to reinstall:

\`\`\`bash
npm install
\`\`\`

## Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

## 🎨 Next Steps

### 1. Add Custom Fonts (Recommended)

Download and add to \`public/fonts/\`:

- **Clash Display Variable** ([Download](https://www.fontshare.com/fonts/clash-display))
  - Save as: \`ClashDisplay-Variable.woff2\`

- **JetBrains Mono Variable** ([Download](https://www.jetbrains.com/lp/mono/))
  - Save as: \`JetBrainsMono-Variable.woff2\`

> **Note:** The site works without these fonts (using system fallbacks), but custom fonts will elevate the design significantly.

### 2. Replace Placeholder Images

Current project images are SVG placeholders. Replace them with real project screenshots:

- \`public/images/project-1.svg\` → your actual project images
- \`public/images/project-2.svg\`
- \`public/images/project-3.svg\`
- \`public/images/project-4.svg\`

Recommended specs:
- Format: WebP or JPG
- Resolution: 1920x1080px
- Max file size: 500KB (compress with tools like TinyPNG)

### 3. Customize Content

Edit \`data/content.json\`:

\`\`\`json
{
  "hero": {
    "name": "YOUR NAME",
    "title": "YOUR TITLE",
    "subtitle": "Your tagline..."
  },
  "about": {
    "bio": "Your bio...",
    "location": "Your city",
    "availability": "Your status"
  },
  "projects": [...],
  "skills": {
    "technical": [...],
    "design": [...]
  },
  "contact": {
    "email": "your@email.com",
    "github": "github.com/yourusername",
    ...
  }
}
\`\`\`

## 🎯 Key Features Implemented

### ✅ Binary Loader
- Random binary text generation
- Smooth clip-path reveal animation
- Progress bar with percentage

### ✅ Hero Section
- 5000+ WebGL particles
- Floating wireframe geometries
- Mouse-reactive 3D scene
- Character-by-character title animation

### ✅ Project Gallery
- **Velocity Skew Effect** (your specific request!)
- Horizontal scroll with pin
- Parallax images
- Grayscale → color on hover

### ✅ Skills Section
- Morphing 3D sphere with MeshDistortMaterial
- Pinned WebGL canvas
- Scroll-triggered skill reveals

### ✅ Custom Cursor
- Mix-blend-mode exclusion
- Elastic magnetic effect on hover
- Dynamic scaling

### ✅ Smooth Scroll
- Lenis integration
- GSAP ScrollTrigger sync
- Heavy, premium feel (lerp: 0.08)

### ✅ Grain Overlay
- Animated film grain
- SVG noise filter
- Subtle analog texture

## 🔧 Configuration

### Adjust Smooth Scroll Feel

\`components/layout/SmoothScroll.tsx\`:
\`\`\`typescript
lerp: 0.08  // Lower = smoother & heavier (0.05-0.15)
\`\`\`

### Reduce Particles for Performance

\`components/canvas/HeroScene.tsx\`:
\`\`\`typescript
const particlesCount = 5000;  // Lower if needed (2000-10000)
\`\`\`

### Change Accent Color

\`tailwind.config.ts\`:
\`\`\`typescript
accent: '#00FFFF'  // Change to your brand color
\`\`\`

## 🏗️ Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 📦 Deploy

### Vercel (Recommended)
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Netlify
Drag the \`.next\` folder to Netlify, or connect your Git repo.

## 🐛 Troubleshooting

### Issue: Custom fonts not loading
**Solution:** Make sure font files are exactly named:
- \`ClashDisplay-Variable.woff2\`
- \`JetBrainsMono-Variable.woff2\`

### Issue: Slow performance on mobile
**Solution:** This portfolio is optimized for desktop. For mobile optimization:
1. Reduce \`particlesCount\` to 1000
2. Disable WebGL on small screens
3. Increase Lenis \`lerp\` to 0.15

### Issue: Images not showing
**Solution:** Check that images are in \`public/images/\` and paths in \`content.json\` start with \`/images/\`

## 🎨 Design Credits

Built following the "L'Ordre dans le Chaos" design philosophy, inspired by Awwwards Site of the Day winners 2024-2025.

## 💡 Tips for Maximum Impact

1. **Photography:** Use high-quality, consistent project images
2. **Case Studies:** Link each project to a detailed case study page
3. **Performance:** Run Lighthouse tests and aim for 90+ scores
4. **SEO:** Add proper meta tags and Open Graph images
5. **Analytics:** Integrate Vercel Analytics or Plausible

---

**Your portfolio is ready!** 🎉

Run \`npm run dev\` to see it in action.
