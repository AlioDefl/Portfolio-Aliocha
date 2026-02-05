// Centralized GSAP configuration
// Import this file once in your app to register all plugins

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins once
gsap.registerPlugin(ScrollTrigger);

// Default GSAP configuration
gsap.defaults({
  ease: "power3.out",
  duration: 0.6,
});

// Common easing functions used throughout the app
export const EASINGS = {
  // Standard reveals
  reveal: "expo.out",
  // Magnetic/elastic effects
  elastic: "elastic.out(1, 0.3)",
  // Smooth transitions
  smooth: "power3.out",
  // Quick snaps
  snap: "power2.out",
  // Linear for scroll-synced animations
  linear: "none",
} as const;

// Re-export for convenience
export { gsap, ScrollTrigger };
