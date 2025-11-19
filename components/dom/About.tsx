"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  data: {
    bio: string;
    location: string;
    availability: string;
  };
}

export default function About({ data }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate bio text on scroll
      if (bioRef.current) {
        gsap.from(bioRef.current, {
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 1,
          },
          opacity: 0.3,
          y: 50,
        });
      }

      // Animate info items
      gsap.from(".info-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-dark flex items-center py-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-20 w-full">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: Bio */}
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-light mb-12 tracking-tight">
              ABOUT
            </h2>
            <p
              ref={bioRef}
              className="font-mono text-lg md:text-xl text-light/80 leading-relaxed"
            >
              {data.bio}
            </p>
          </div>

          {/* Right: Info */}
          <div className="space-y-8">
            <div className="info-item border-l-2 border-accent/50 pl-6">
              <p className="font-mono text-xs text-light/50 mb-2 tracking-widest">
                LOCATION
              </p>
              <p className="font-display text-2xl text-light">{data.location}</p>
            </div>

            <div className="info-item border-l-2 border-accent/50 pl-6">
              <p className="font-mono text-xs text-light/50 mb-2 tracking-widest">
                AVAILABILITY
              </p>
              <p className="font-display text-2xl text-light">{data.availability}</p>
            </div>

            <div className="info-item border-l-2 border-accent/50 pl-6">
              <p className="font-mono text-xs text-light/50 mb-2 tracking-widest">
                APPROACH
              </p>
              <p className="font-display text-2xl text-light">
                Code meets creativity
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
