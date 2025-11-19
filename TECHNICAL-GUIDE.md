# 🎯 Technical Deep Dive

## Architecture Overview

This portfolio follows the **Maximum Impact, Desktop-First** approach you requested.

### Tech Stack Breakdown

```
Next.js 14 (App Router)
├── React Three Fiber (WebGL)
│   ├── Drei (Helpers)
│   └── MeshDistortMaterial (Shaders)
├── GSAP (Animation Engine)
│   └── ScrollTrigger (Scroll interactions)
├── Lenis (Smooth Scroll)
├── Zustand (State Management)
└── Tailwind CSS (Styling)
```

## 🔥 Key Technical Implementations

### 1. Velocity Skew Effect (Your Request)

**Location:** `components/dom/ProjectGallery.tsx:36-48`

```typescript
scrollTrigger: {
  onUpdate: (self) => {
    const velocity = self.getVelocity();
    const skewAmount = gsap.utils.clamp(-8, 8, velocity / 400);

    gsap.to(cardsRef.current, {
      skewY: skewAmount,
      overwrite: "auto",
      duration: 0.5,
      ease: "power3.out",
    });
  }
}
```

**How it works:**
1. ScrollTrigger calculates scroll velocity in px/s
2. Velocity is mapped to a skew angle (-8° to 8°)
3. GSAP applies skewY transform to all project cards
4. Smooth easing creates elastic "weight" feeling

**Customization:**
- Change `velocity / 400` → higher number = less intense skew
- Change `clamp(-8, 8)` → adjust max skew angle
- Change `duration: 0.5` → faster/slower skew recovery

---

### 2. Custom Smooth Scroll (Lenis + GSAP)

**Location:** `components/layout/SmoothScroll.tsx`

```typescript
const lenis = new Lenis({
  lerp: 0.08,      // Interpolation smoothness (0.05 = heavy, 0.15 = snappy)
  duration: 1.5,   // Animation duration
  smoothWheel: true,
});

// Sync with GSAP's ticker for perfect timing
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
```

**Why this setup:**
- Lenis handles the smooth scroll physics
- GSAP ScrollTrigger syncs animations to scroll position
- `lerp: 0.08` creates that "heavy, premium" feel (like Apple/Stripe sites)

---

### 3. WebGL Particle System

**Location:** `components/canvas/HeroScene.tsx:15-56`

```typescript
const particlesCount = 5000;

// Generate random positions
const positions = useMemo(() => {
  const positions = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;     // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // z
  }
  return positions;
}, []);

// Mouse interaction
useFrame((state) => {
  pointsRef.current.rotation.x = mouse.y * 0.3;
  pointsRef.current.rotation.z = mouse.x * 0.1;
});
```

**Performance optimizations:**
- `useMemo` prevents position recalculation
- `AdditiveBlending` for glow effect without extra draw calls
- Mouse position normalized (-1 to 1) for smooth rotation

---

### 4. Morphing Skills Sphere

**Location:** `components/canvas/SkillsSphere.tsx`

```typescript
<MeshDistortMaterial
  color="#00FFFF"
  wireframe
  distort={0.4}      // Distortion intensity
  speed={2}          // Animation speed
  roughness={0}
/>
```

**MeshDistortMaterial** (from Drei):
- Uses vertex shaders to distort geometry
- Real-time Perlin noise animation
- `distort: 0.4` = moderate morphing (0 = static, 1 = extreme)

---

### 5. Custom Cursor with Exclusion Blend

**Location:** `components/layout/Cursor.tsx`

```css
.cursor {
  mix-blend-mode: exclusion;  /* Inverts colors beneath */
  pointer-events: none;       /* Doesn't block clicks */
}
```

**Magnetic Effect:**
```typescript
const handleMouseMove = (e: MouseEvent) => {
  const rect = link.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  gsap.to(link, {
    x: x * 0.3,  // 30% of distance to cursor
    y: y * 0.3,
    ease: "elastic.out(1, 0.3)",
  });
};
```

**How it works:**
1. Calculate cursor position relative to element center
2. Move element 30% toward cursor (creates "magnetic pull")
3. `elastic.out` creates bouncy, organic feel

---

### 6. Binary Loader Animation

**Location:** `components/dom/Loader.tsx`

```typescript
// Generate random binary every 50ms
const binaryInterval = setInterval(() => {
  setBinaryText(
    Array.from({ length: 100 }, () =>
      Math.random() > 0.5 ? "1" : "0"
    ).join("")
  );
}, 50);

// Clip-path reveal animation
gsap.to(loaderRef.current, {
  clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", // Closes from bottom
  duration: 1.2,
  ease: "expo.inOut",
});
```

**Clip-path values:**
- Start: `polygon(0 0, 100% 0, 100% 100%, 0 100%)` (full screen)
- End: `polygon(0 0, 100% 0, 100% 0, 0 0)` (collapsed to top)

---

### 7. Grain Overlay Effect

**Location:** `app/globals.css:29-37`

```css
.grain {
  background-image: url("data:image/svg+xml,...");
  animation: grain 8s steps(10) infinite;
}

@keyframes grain {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -10%); }
  /* ... random positions ... */
}
```

**Why `steps(10)`:**
- Creates "stuttery" film grain effect
- Mimics analog film grain movement
- `steps()` instead of smooth animation = more authentic

---

## 🎨 Animation Timeline

### Loader Sequence (0-3s)
1. Binary randomization (50ms intervals)
2. Progress bar fill (simulated)
3. Clip-path curtain close (1.2s)

### Hero Intro (3-5s)
1. Name fade-in (1.2s)
2. Title character cascade (1s, stagger: 0.02s)
3. Subtitle slide-up (1s)
4. Scroll indicator pulse (0.8s)

### Scroll Interactions
- **Projects:** Velocity skew + parallax images
- **Skills:** Pinned 3D sphere + staggered card reveals
- **About:** Parallax text fade
- **Contact:** Magnetic hover on links

---

## 🔧 Advanced Customizations

### Create Your Own Shader

1. Create shader files:
```glsl
// shaders/custom.vert
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

// shaders/custom.frag
uniform float uTime;
varying vec2 vUv;

void main() {
  vec3 color = vec3(vUv.x, vUv.y, sin(uTime));
  gl_FragColor = vec4(color, 1.0);
}
```

2. Use in R3F:
```typescript
import vertexShader from '@/shaders/custom.vert';
import fragmentShader from '@/shaders/custom.frag';

<mesh>
  <planeGeometry />
  <shaderMaterial
    vertexShader={vertexShader}
    fragmentShader={fragmentShader}
    uniforms={{ uTime: { value: 0 } }}
  />
</mesh>
```

---

### Add Page Transitions

```typescript
// app/template.tsx
"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Template({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.from(ref.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  return <div ref={ref}>{children}</div>;
}
```

---

### Optimize for Mobile

```typescript
// components/canvas/HeroScene.tsx
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const particlesCount = isMobile ? 1000 : 5000;
```

---

## 📊 Performance Metrics

### Current Setup (Desktop)
- **Particles:** 5000
- **Distortion:** Active (Skills sphere)
- **Smooth Scroll:** Lenis (lerp: 0.08)
- **Target FPS:** 60fps

### Optimized for Awwwards
- Focus on visual impact over universal compatibility
- WebGL effects at full capacity
- No compromises on animation smoothness

---

## 🚀 Deployment Checklist

- [ ] Replace placeholder images with real projects
- [ ] Add custom fonts (Clash Display + JetBrains Mono)
- [ ] Update `content.json` with your information
- [ ] Test on Chrome, Firefox, Safari
- [ ] Run Lighthouse audit (aim for 90+ Performance)
- [ ] Add Open Graph image for social sharing
- [ ] Setup analytics (Vercel/Plausible)
- [ ] Test scroll performance on different devices

---

## 🎯 Awwwards Submission Tips

1. **Screenshots:** Capture key sections (Hero, Projects, Skills)
2. **Video:** Screen recording with smooth scroll (60fps, 1920x1080)
3. **Description:** Highlight technical innovations:
   - Velocity-based skew effect
   - Custom WebGL particle system
   - Synchronized smooth scroll + GSAP
4. **Tags:** WebGL, GSAP, Smooth Scroll, Portfolio
5. **Category:** Personal Portfolio

---

**Built for impact. Optimized for awards.** 🏆
