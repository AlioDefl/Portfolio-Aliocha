"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillsSphere from "@/components/canvas/SkillsSphere";

gsap.registerPlugin(ScrollTrigger);

interface SkillsProps {
  data: {
    technical: string[];
    design: string[];
  };
}

export default function Skills({ data }: SkillsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const technicalRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the canvas while scrolling through skills
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: canvasRef.current,
        pinSpacing: false,
      });

      // Fade in technical skills
      if (technicalRef.current?.children) {
        gsap.fromTo(
          technicalRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: technicalRef.current,
              start: "top bottom-=100",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Fade in design skills
      if (designRef.current?.children) {
        gsap.fromTo(
          designRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: designRef.current,
              start: "top bottom-=100",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills-section"
      className="relative min-h-screen bg-dark py-10"
    >
      {/* Fixed WebGL Canvas */}
      <div
        ref={canvasRef}
        className="fixed top-0 right-0 w-1/2 h-screen -z-10 opacity-30"
      >
        <SkillsSphere />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20">
        {/* Section title */}
        <div className="mb-20">
          <h2 className="font-display text-5xl md:text-7xl font-bold text-light tracking-tight mb-4">
            CAPABILITIES
          </h2>
          <p className="font-mono text-sm text-light/50">
            Tools & techniques I use to bring ideas to life
          </p>
        </div>

        {/* Technical Skills */}
        <div className="mb-24">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-light/80 mb-8 tracking-tight flex items-center gap-4">
            <span className="w-2 h-2 bg-accent rounded-full"></span>
            Technical Stack
          </h3>
          <div ref={technicalRef} className="flex flex-wrap gap-3">
            {data.technical.map((skill, idx) => (
              <div
                key={idx}
                className="group relative px-6 py-3 border border-light/10 bg-light/5 rounded-full hover:border-accent/50 hover:bg-light/10 transition-all duration-300 cursor-default overflow-hidden"
                data-cursor="hover"
              >
                <div className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <p className="relative font-mono text-sm md:text-base text-light group-hover:text-accent transition-colors duration-300 z-10">
                  {skill}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Design Skills */}
        <div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-light/80 mb-8 tracking-tight flex items-center gap-4">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            Design & Creative
          </h3>
          <div ref={designRef} className="flex flex-wrap gap-3">
            {data.design.map((skill, idx) => (
              <div
                key={idx}
                className="group relative px-6 py-3 border border-light/10 bg-light/5 rounded-full hover:border-purple-500/50 hover:bg-light/10 transition-all duration-300 cursor-default overflow-hidden"
                data-cursor="hover"
              >
                <div className="absolute inset-0 bg-purple-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <p className="relative font-mono text-sm md:text-base text-light group-hover:text-purple-400 transition-colors duration-300 z-10">
                  {skill}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
