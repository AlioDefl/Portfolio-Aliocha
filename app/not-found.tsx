"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      })
        .from(
          textRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          linkRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-dark flex flex-col items-center justify-center px-6 text-center"
    >
      <h1
        ref={titleRef}
        className="font-display text-[20vw] md:text-[15vw] font-bold text-light leading-none tracking-tighter mb-8"
      >
        404
      </h1>
      <p
        ref={textRef}
        className="font-mono text-light/70 text-lg md:text-xl mb-12 max-w-md"
      >
        Cette page n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        ref={linkRef}
        href="/"
        className="group relative px-8 py-4 border border-light/20 font-mono text-sm text-light hover:border-accent transition-colors duration-300"
        data-cursor="hover"
      >
        <span className="relative z-10 group-hover:text-accent transition-colors duration-300">
          RETOUR À L&apos;ACCUEIL
        </span>
      </Link>
    </div>
  );
}
