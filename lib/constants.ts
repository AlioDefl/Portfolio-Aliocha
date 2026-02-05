// Animation and effect constants for the portfolio

// Standardized animation durations (in seconds)
export const DURATION = {
  MICRO: 0.3,    // Micro-interactions (hover states, buttons)
  FAST: 0.5,     // UI transitions (modals, tooltips)
  MEDIUM: 0.8,   // Content reveals (fade-ins, slide-ups)
  SLOW: 1.2,     // Major animations (page transitions, hero entrance)
} as const;

export const ANIMATION = {
  // Loader
  LOADER_DELAY: 2000, // milliseconds (reduced from 3000 for better UX)
  LOADER_BINARY_UPDATE_INTERVAL: 50, // milliseconds
  LOADER_BINARY_LENGTH: 100,

  // Smooth scroll
  LENIS_LERP: 0.08,
  LENIS_DURATION: 1.5,

  // Cursor
  CURSOR_FOLLOW_DURATION: DURATION.FAST,
  CURSOR_SCALE_HOVER: 4,
  CURSOR_SCALE_DRAG: 0.5,

  // Lights
  LIGHT_FOLLOW_DURATION: 1.5,

  // Project gallery
  SKEW_BOUNDS: { min: -8, max: 8 },
  SKEW_VELOCITY_DIVISOR: 400,
  SKEW_DURATION: DURATION.FAST,

  // Magnetic effect
  MAGNETIC_STRENGTH: 0.3,
  MAGNETIC_DURATION: DURATION.FAST,
} as const;

export const PARTICLES = {
  // Desktop particle count
  COUNT_DESKTOP: 5000,
  // Mobile particle count (reduced for performance)
  COUNT_MOBILE: 2000,
  // Tablet particle count
  COUNT_TABLET: 3500,

  // Particle properties
  SIZE: 0.05,
  OPACITY: 0.6,

  // Rotation speeds
  ROTATION_SPEED_Y: 0.05,
  MOUSE_ROTATION_X: 0.3,
  MOUSE_ROTATION_Z: 0.1,

  // Position bounds
  POSITION_RANGE_XY: 50,
  POSITION_RANGE_Z: 20,
} as const;

export const SPHERE = {
  DISTORT: 0.4,
  SPEED: 2,
  GEOMETRY_DETAIL: 4,
  RADIUS: 2,
} as const;

export const COLORS = {
  DARK: "#050505",
  LIGHT: "#F0F0F0",
  ACCENT: "#00FFFF",
  ACCENT_MUTED: "#00B8B8",
  SECONDARY: "#A855F7",
  SECONDARY_MUTED: "#9333EA",
} as const;

export const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 1024,
  DESKTOP: 1280,
} as const;

// Helper to determine particle count based on screen width
export function getParticleCount(width: number): number {
  if (width < BREAKPOINTS.MOBILE) return PARTICLES.COUNT_MOBILE;
  if (width < BREAKPOINTS.TABLET) return PARTICLES.COUNT_TABLET;
  return PARTICLES.COUNT_DESKTOP;
}

// Helper to check if device is mobile
export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.innerWidth < BREAKPOINTS.TABLET
  );
}
