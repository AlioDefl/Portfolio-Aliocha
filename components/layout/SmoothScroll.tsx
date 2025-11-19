"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "@/store/useStore";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const isLoading = useStore((state) => state.isLoading);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.08, // Heavy, premium feel
      duration: 1.5,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.remove(() => { });
    };
  }, []);

  useEffect(() => {
    if (!lenisRef.current) return;

    if (isLoading) {
      lenisRef.current.stop();
      document.body.style.overflow = "hidden"; // Double safety
    } else {
      lenisRef.current.start();
      document.body.style.overflow = "";
    }
  }, [isLoading]);

  useLayoutEffect(() => {
    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh();
  }, []);

  return <>{children}</>;
}
