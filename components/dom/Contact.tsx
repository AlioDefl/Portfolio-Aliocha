"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface ContactProps {
  data: {
    email: string;
    github: string;
    linkedin: string;
    twitter: string;
  };
}

export default function Contact({ data }: ContactProps) {
  const magneticRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    // Magnetic effect on links
    magneticRefs.current.forEach((link) => {
      if (!link) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(link, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(link, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
        });
      };

      link.addEventListener("mousemove", handleMouseMove);
      link.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        link.removeEventListener("mousemove", handleMouseMove);
        link.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);

  const links = [
    { label: "Email", href: `mailto:${data.email}`, value: data.email },
    { label: "GitHub", href: `https://${data.github}`, value: data.github },
    { label: "LinkedIn", href: `https://${data.linkedin}`, value: data.linkedin },
    { label: "Twitter", href: `https://${data.twitter}`, value: data.twitter },
  ];

  return (
    <section className="relative min-h-screen bg-dark flex items-center py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-20 w-full">
        {/* Title */}
        <div className="mb-20">
          <h2 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-light tracking-tighter leading-none mb-6">
            LET&apos;S WORK
            <br />
            TOGETHER
          </h2>
          <p className="font-mono text-sm text-light/50">
            Available for select projects — Reach out
          </p>
        </div>

        {/* Contact links */}
        <div className="grid md:grid-cols-2 gap-8">
          {links.map((link, idx) => (
            <a
              key={idx}
              ref={(el) => {
                magneticRefs.current[idx] = el;
              }}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 border border-light/10 hover:border-accent/50 transition-all duration-300 cursor-pointer"
              data-cursor="hover"
            >
              <p className="font-mono text-xs text-accent/50 mb-2 tracking-widest">
                {link.label}
              </p>
              <p className="font-display text-2xl md:text-3xl text-light group-hover:text-accent transition-colors duration-300">
                {link.value}
              </p>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-32 pt-12 border-t border-light/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-mono text-xs text-light/30">
            © 2025 ALIOCHA. ALL RIGHTS RESERVED.
          </p>
          <p className="font-mono text-xs text-light/30">
            BUILT WITH NEXT.JS, THREE.JS & GSAP
          </p>
        </div>
      </div>
    </section>
  );
}
