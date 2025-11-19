"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import HeroScene from "@/components/canvas/HeroScene";
import { useMouse } from "@/hooks/useMouse";

interface HeroProps {
  data: {
    name: string;
    title: string;
    subtitle: string;
  };
}

export default function Hero({ data }: HeroProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  // Track mouse for WebGL
  useMouse();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation
      const tl = gsap.timeline({ delay: 3 }); // After loader

      // Animate name
      tl.from(nameRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      // Animate title with simple character animation
      if (titleRef.current) {
        const chars = titleRef.current.textContent?.split("") || [];
        titleRef.current.innerHTML = chars
          .map((char) => `<span class="inline-block" aria-hidden="true">${char === " " ? "&nbsp;" : char}</span>`)
          .join("");

        tl.from(
          titleRef.current.children,
          {
            y: 100,
            opacity: 0,
            rotationX: -90,
            stagger: 0.02,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.8"
        );
      }

      // Animate subtitle
      tl.from(
        subtitleRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5"
      );

      // Scroll indicator
      tl.from(
        ".scroll-indicator",
        {
          opacity: 0,
          y: -20,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.3"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <HeroScene />

      <div className="relative z-10 text-center px-6">
        {/* Name tag */}
        <div
          ref={nameRef}
          className="font-mono text-sm text-light/50 mb-4 tracking-widest"
        >
          {data.name}
        </div>

        {/* Main title */}
        <h1
          ref={titleRef}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-light mb-8 tracking-tighter leading-none"
          aria-label={data.title}
        >
          {data.title}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-mono text-sm md:text-base text-light/70 max-w-2xl mx-auto leading-relaxed"
        >
          {data.subtitle}
        </p>

        {/* Scroll indicator */}
        <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-[1px] h-16 bg-light/30 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-transparent to-light animate-pulse"
              style={{ animation: "scroll 2s ease-in-out infinite" }}
            />
          </div>
          <p className="font-mono text-xs text-light/50 mt-4 tracking-widest">SCROLL</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
