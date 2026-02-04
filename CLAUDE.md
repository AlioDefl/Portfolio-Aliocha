# CLAUDE.md - AI Assistant Guide for Portfolio Aliocha

This document provides essential context for AI assistants working on this codebase.

## Project Overview

**Portfolio Aliocha** is an Awwwards-level creative portfolio built with Next.js 14, featuring cutting-edge WebGL effects, smooth animations, and bilingual support (French/English). The design philosophy is "L'Ordre dans le Chaos" (Order in Chaos).

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | Next.js 14 (App Router), React 18, TypeScript 5 |
| 3D/WebGL | Three.js, React Three Fiber, Drei |
| Animation | GSAP 3.12 (ScrollTrigger), Lenis (smooth scroll) |
| State | Zustand |
| Styling | Tailwind CSS 3.4, PostCSS |

## Project Structure

```
Portfolio-Aliocha/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout (Loader, Cursor, SmoothScroll)
│   ├── page.tsx           # Main page component
│   └── globals.css        # Global styles, fonts, grain effect
│
├── components/
│   ├── canvas/            # WebGL/Three.js components
│   │   ├── HeroScene.tsx  # 5000 particles + floating geometries
│   │   └── SkillsSphere.tsx # Morphing 3D sphere
│   │
│   ├── dom/               # React DOM components
│   │   ├── Hero.tsx       # Hero section with character animation
│   │   ├── About.tsx      # About with parallax text
│   │   ├── ProjectGallery.tsx # Horizontal scroll + velocity skew
│   │   ├── ProjectModal.tsx   # Project details modal
│   │   ├── Skills.tsx     # Skills with pinned 3D canvas
│   │   ├── Contact.tsx    # Magnetic links effect
│   │   ├── Loader.tsx     # Binary loader animation
│   │   ├── LanguageSwitcher.tsx # FR/EN toggle
│   │   └── ErrorBoundary.tsx    # 3D scene error handling
│   │
│   └── layout/            # Layout utilities
│       ├── SmoothScroll.tsx # Lenis + GSAP sync
│       ├── Cursor.tsx     # Custom cursor (blend exclusion)
│       └── Lights.tsx     # Mouse-tracking spotlight
│
├── data/
│   └── content.json       # Bilingual content (FR/EN)
│
├── hooks/
│   └── useMouse.ts        # Global mouse tracking hook
│
├── store/
│   └── useStore.ts        # Zustand state management
│
├── public/
│   ├── fonts/             # Custom fonts (Clash Display, JetBrains Mono)
│   └── images/            # Project images (project-1.png, etc.)
│
└── Configuration
    ├── package.json       # Dependencies and scripts
    ├── tsconfig.json      # TypeScript (strict mode, path aliases)
    ├── next.config.js     # Webpack shader support
    ├── tailwind.config.ts # Custom theme (dark, light, accent)
    └── vercel.json        # Deployment config
```

## Development Commands

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Create production build
npm start        # Run production server
npm run lint     # Run ESLint
```

## Key Patterns & Conventions

### Component Organization
- **Canvas components** (`/components/canvas/`): WebGL/Three.js scenes wrapped in ErrorBoundary
- **DOM components** (`/components/dom/`): Interactive React components with GSAP animations
- **Layout components** (`/components/layout/`): Persistent UI elements (cursor, scroll, lights)

### State Management (Zustand)
```typescript
// store/useStore.ts - Available state:
{
  isLoading: boolean,      // Loader visibility
  loadProgress: number,    // Loading percentage (0-100)
  mouse: { x, y },        // Normalized mouse position (-1 to 1)
  currentSection: string,  // Current scroll section
  language: 'fr' | 'en',  // Current language
  cursorVariant: 'default' | 'hover' | 'drag'
}
```

### Animation Patterns
- Use `gsap.context()` for cleanup in useEffect
- ScrollTrigger for scroll-based animations
- Lenis pauses during loading (`lenis.stop()` / `lenis.start()`)
- Standard easing: `expo.out` for reveals, `elastic.out` for magnetic effects

### Styling Conventions
- **Colors**: `dark` (#050505), `light` (#F0F0F0), `accent` (#00FFFF)
- **Fonts**: `font-display` (Clash Display), `font-mono` (JetBrains Mono)
- Use Tailwind utilities; avoid inline styles except for GSAP-controlled properties
- Opacity variants: `text-light/70`, `bg-light/10`, etc.

### TypeScript
- Strict mode enabled
- Path alias: `@/*` maps to project root
- Type all component props; avoid `any`

## Key Features Implementation

### 1. Velocity Skew Effect (Signature)
**Location**: `components/dom/ProjectGallery.tsx:57-68`
- Detects scroll velocity via ScrollTrigger
- Maps to skew angle: `velocity / 400`, clamped to [-8, 8]
- Applied to project cards with 0.5s transition

### 2. WebGL Particle System
**Location**: `components/canvas/HeroScene.tsx`
- 5000 particles using THREE.Points
- Mouse-reactive rotation
- Additive blending for glow effect

### 3. Morphing Sphere
**Location**: `components/canvas/SkillsSphere.tsx`
- Uses Drei's MeshDistortMaterial
- Distortion: 0.4, Speed: 2
- Wireframe mode, cyan color

### 4. Smooth Scroll
**Location**: `components/layout/SmoothScroll.tsx`
- Lenis with `lerp: 0.08` for heavy feel
- Synced with GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`

### 5. Custom Cursor
**Location**: `components/layout/Cursor.tsx`
- Mix-blend-mode: exclusion
- States: default (scale 1), hover (scale 4, transparent), drag (scale 0.5)
- Add `data-cursor="hover"` to elements for hover state

### 6. Magnetic Links
**Location**: `components/dom/Contact.tsx`
- Calculate distance to cursor on mousemove
- Move element 30% toward cursor position
- Elastic easing for organic bounce

## Content Editing

### Bilingual Content
Edit `data/content.json`:
```json
{
  "fr": {
    "hero": { "name": "...", "title": "...", "subtitle": "..." },
    "about": { "bio": "...", "location": "...", "availability": "..." },
    "projects": [...],
    "skills": { "technical": [...], "design": [...] },
    "contact": { "email": "...", "github": "...", ... }
  },
  "en": { /* same structure */ }
}
```

### Adding Projects
Add to `projects` array in content.json:
```json
{
  "id": 6,
  "title": "Project Name",
  "category": "Category",
  "year": "2024",
  "description": "...",
  "challenges": "...",
  "learnings": "...",
  "impact": "...",
  "image": "/images/project-6.png",
  "tech": ["React", "Node.js", "..."]
}
```

## Common Tasks

### Adding a New Section
1. Create component in `/components/dom/NewSection.tsx`
2. Add content to `data/content.json` (both `fr` and `en`)
3. Import and add to `app/page.tsx`
4. Add ScrollTrigger animations if needed

### Adding a New 3D Element
1. Create component in `/components/canvas/`
2. Wrap with ErrorBoundary
3. Use `useMouse()` hook for mouse reactivity
4. Import Three.js types from `@types/three`

### Modifying Animations
- Animation timelines are in individual components
- Loader delay: 3 seconds (configured in Hero.tsx and SmoothScroll.tsx)
- ScrollTrigger markers: add `markers: true` to config for debugging

## Testing

**Current Status**: No test framework configured

Recommended setup:
- Jest or Vitest for unit tests
- React Testing Library for components
- Manual testing with Lighthouse (target 90+ score)

## Deployment

### Vercel (Primary)
- Push to main branch triggers auto-deploy
- Config in `vercel.json`

### Pre-deployment Checklist
- [ ] Replace placeholder images in `/public/images/`
- [ ] Add fonts to `/public/fonts/` (ClashDisplay, JetBrains Mono)
- [ ] Update content.json with real content
- [ ] Test on Chrome, Firefox, Safari
- [ ] Run Lighthouse audit
- [ ] Add favicon and OG images

## Important Files Quick Reference

| Task | File |
|------|------|
| Edit main content | `data/content.json` |
| Modify colors/theme | `tailwind.config.ts` |
| Add global styles | `app/globals.css` |
| Configure build | `next.config.js` |
| Modify loader | `components/dom/Loader.tsx` |
| Adjust scroll feel | `components/layout/SmoothScroll.tsx` (lerp value) |
| Change particle count | `components/canvas/HeroScene.tsx` (count variable) |

## Performance Considerations

- Particle count: 5000 (reduce for mobile)
- Images: Optimize to <500KB each
- Fonts: Use variable fonts (woff2)
- 3D scenes wrapped in ErrorBoundary for graceful degradation
- Lenis lerp value affects perceived performance (0.08 = heavy, 0.1+ = lighter)

## Things to Avoid

- Don't modify GSAP animations without testing on scroll
- Don't change Zustand store shape without updating all consumers
- Don't add large images without optimization
- Don't use `any` types in TypeScript
- Don't remove ErrorBoundary wrappers from 3D components

## Additional Documentation

- `README.md` - Project overview and features
- `SETUP.md` - Installation and customization guide
- `TECHNICAL-GUIDE.md` - Deep dive into implementations
- `PROJECT-SUMMARY.md` - Complete feature list and checklist
