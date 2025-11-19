"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useStore } from "@/store/useStore";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorVariant = useStore((state) => state.cursorVariant);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    // Add hover class to elements with data-cursor attribute
    const hoverElements = document.querySelectorAll("[data-cursor='hover']");
    const setCursorVariant = useStore.getState().setCursorVariant;

    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", () => setCursorVariant("hover"));
      el.addEventListener("mouseleave", () => setCursorVariant("default"));
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  // Update cursor appearance based on variant
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    switch (cursorVariant) {
      case "hover":
        gsap.to(cursor, {
          scale: 4,
          borderWidth: 1,
          backgroundColor: "transparent",
          duration: 0.3,
          ease: "power2.out",
        });
        break;
      case "drag":
        gsap.to(cursor, {
          scale: 0.5,
          backgroundColor: "#00FFFF",
          duration: 0.3,
          ease: "power2.out",
        });
        break;
      default:
        gsap.to(cursor, {
          scale: 1,
          borderWidth: 0,
          backgroundColor: "#F0F0F0",
          duration: 0.3,
          ease: "power2.out",
        });
    }
  }, [cursorVariant]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-5 h-5 bg-light rounded-full pointer-events-none z-[10000] mix-blend-exclusion border-light"
      style={{ transform: "translate(-50%, -50%)" }}
    />
  );
}
